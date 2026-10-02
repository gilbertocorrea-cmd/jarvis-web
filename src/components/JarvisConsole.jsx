import { useEffect, useRef, useState } from 'react';
import { commands } from '../data/commands';
import JarvisCore from './JarvisCore';
import CommandInput from './CommandInput';
import HistoryList from './HistoryList';

export default function JarvisConsole() {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('Sistema online. Como posso ajudar?');
  const [status, setStatus] = useState('ONLINE');
  const [notice, setNotice] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('jarvis-history') || '[]');
      return Array.isArray(saved) ? saved.filter((item) => item && typeof item.id === 'string' && typeof item.command === 'string' && typeof item.response === 'string').slice(0, 50) : [];
    } catch {
      return [];
    }
  });
  // Guardo os recursos externos para interrompê-los quando saio da página.
  const recognitionRef = useRef(null);
  const requestRef = useRef(null);
  const speechRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem('jarvis-history', JSON.stringify(history));
    } catch {
      // Se o armazenamento estiver bloqueado, mantenho o histórico apenas no estado.
    }
  }, [history]);

  useEffect(() => () => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.abort();
    }
    requestRef.current?.abort();
    if (speechRef.current) {
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
    }
    window.speechSynthesis?.cancel();
  }, []);

  function falar(texto) {
    if (speechRef.current) {
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
    }
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setNotice('Resposta falada não disponível neste navegador.');
      setStatus('ONLINE');
      return;
    }
    window.speechSynthesis.cancel();
    const fala = new window.SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.rate = 0.95;
    fala.onend = () => setStatus('ONLINE');
    fala.onerror = () => {
      setNotice('Não consegui falar a resposta. Ela continua disponível na tela.');
      setStatus('ONLINE');
    };
    speechRef.current = fala;
    setStatus('RESPONDENDO');
    window.speechSynthesis.speak(fala);
  }

  async function executarComando(rawCommand = command) {
    if (busyRef.current) return;
    const texto = rawCommand.trim();
    if (!texto) {
      setResponse('Digite um comando antes de executar.');
      return;
    }
    if (texto.length > 2000) {
      setResponse('Use até 2000 caracteres por comando.');
      return;
    }
    busyRef.current = true;
    if (speechRef.current) {
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
    }
    window.speechSynthesis?.cancel();
    setCommand(texto);
    setNotice('');
    setStatus('PROCESSANDO');
    // Normalizo acentos e pontuação para comparar frases completas.
    const normalizado = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[?!.,]/g, '').replace(/\s+/g, ' ').trim();
    const local = commands.find((item) => item.keywords.includes(normalizado));
    let resposta;
    try {
      if (local?.id === 3) {
        resposta = `Agora são ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`;
      } else if (local?.id === 4) {
        resposta = `Hoje é ${new Date().toLocaleDateString('pt-BR')}.`;
      } else if (local?.id === 5) {
        resposta = 'Histórico limpo.';
        setHistory([]);
      } else if (local) {
        resposta = local.response;
      } else {
        const controller = new AbortController();
        requestRef.current = controller;
        const timer = setTimeout(() => controller.abort(), 25000);
        try {
          const result = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: texto }),
            signal: controller.signal,
          });
          if (!result.headers.get('content-type')?.includes('application/json')) {
            throw new Error('A consulta à IA está indisponível neste ambiente. Os comandos locais continuam funcionando.');
          }
          const data = await result.json();
          if (!result.ok) throw new Error(data.error || 'Não consegui consultar a IA. Tente novamente.');
          if (typeof data.response !== 'string' || !data.response.trim()) throw new Error('A IA não retornou uma resposta. Tente novamente.');
          resposta = data.response;
        } finally {
          clearTimeout(timer);
          requestRef.current = null;
        }
      }
      setResponse(resposta);
      if (local?.id !== 5) {
        setHistory((items) => [{ id: crypto.randomUUID(), command: texto, response: resposta }, ...items].slice(0, 50));
      }
      falar(resposta);
    } catch (error) {
      setResponse(error.name === 'AbortError' ? 'A consulta demorou demais. Tente novamente.' : error.message);
      setStatus('ONLINE');
    } finally {
      busyRef.current = false;
    }
  }

  function ouvir() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setNotice('Reconhecimento de voz não disponível neste navegador.');
      return;
    }
    if (busyRef.current) return;
    if (speechRef.current) {
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
    }
    window.speechSynthesis?.cancel();
    const recognition = new Recognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognitionRef.current = recognition;
    busyRef.current = true;
    setNotice('');
    setStatus('OUVINDO');
    let recebeuResultado = false;
    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript.trim();
      if (!texto) {
        recognition.stop();
        return;
      }
      recebeuResultado = true;
      setCommand(texto);
      busyRef.current = false;
      recognition.stop();
      executarComando(texto);
    };
    recognition.onerror = (event) => {
      setNotice(event.error === 'not-allowed' || event.error === 'service-not-allowed'
        ? 'Permita o acesso ao microfone para usar a voz.'
        : event.error === 'no-speech' ? 'Não ouvi nenhuma fala. Tente novamente.' : 'Não consegui reconhecer a fala. Tente novamente ou digite.');
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      if (!recebeuResultado) {
        busyRef.current = false;
        setStatus('ONLINE');
      }
    };
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      busyRef.current = false;
      setStatus('ONLINE');
      setNotice('Não consegui iniciar o microfone. Tente novamente.');
    }
  }

  const busy = status === 'PROCESSANDO' || status === 'OUVINDO';
  return (
    <div className="assistant-workspace">
      <section className="console-panel" aria-label="Console JARVIS">
        <div className="section-heading"><span className="eyebrow">INTERFACE NEURAL</span><span className="system-label">JARVIS / 01</span></div>
        <JarvisCore status={status} />
        <p className="console-response" aria-live="polite">{response}</p>
        <CommandInput command={command} onChange={setCommand} onExecute={executarComando} onMicrophone={ouvir} busy={busy} listening={status === 'OUVINDO'} />
        {notice && <p className="console-notice" role="status">{notice}</p>}
        <div className="quick-commands" aria-label="Comandos locais">
          {commands.map((item) => <button key={item.id} disabled={busy} onClick={() => executarComando(item.example)}>{item.example}</button>)}
        </div>
      </section>
      <HistoryList history={history} />
    </div>
  );
}
