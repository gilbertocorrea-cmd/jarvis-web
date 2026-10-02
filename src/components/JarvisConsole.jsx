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
  const [listening, setListening] = useState(false);
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
  const shouldListenRef = useRef(false);
  const recognitionRunningRef = useRef(false);
  const speakingRef = useRef(false);
  const restartTimerRef = useRef(null);
  const restartCountRef = useRef(0);
  const voicesRef = useRef([]);

  useEffect(() => {
    try {
      localStorage.setItem('jarvis-history', JSON.stringify(history));
    } catch {
      // Se o armazenamento estiver bloqueado, mantenho o histórico apenas no estado.
    }
  }, [history]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    function carregarVozes() {
      voicesRef.current = synth?.getVoices() || [];
    }
    carregarVozes();
    synth?.addEventListener('voiceschanged', carregarVozes);
    return () => {
      shouldListenRef.current = false;
      clearTimeout(restartTimerRef.current);
      synth?.removeEventListener('voiceschanged', carregarVozes);
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      }
      requestRef.current?.abort();
      if (speechRef.current) {
        speechRef.current.onstart = null;
        speechRef.current.onend = null;
        speechRef.current.onerror = null;
      }
      synth?.cancel();
    };
  }, []);

  function getJarvisVoice() {
    const voices = window.speechSynthesis.getVoices();
    const available = voices.length ? voices : voicesRef.current;
    // O navegador não informa gênero. Procuro nomes conhecidos, sem confundir Female com Male.
    const masculine = /\b(male|masculino|daniel|george|david|alex|antonio|antônio|ricardo|duarte|paulo|guy)\b/i;
    for (const lang of ['pt-br', 'pt-pt', 'en-gb', 'en-us']) {
      const voice = available.find((item) => item.lang.toLowerCase().replace('_', '-') === lang && masculine.test(item.name));
      if (voice) return voice;
    }
    return available.find((item) => item.lang.toLowerCase().startsWith('pt') && /google|microsoft/i.test(item.name))
      || available.find((item) => item.lang.toLowerCase().startsWith('pt'))
      || available[0];
  }

  function retomarEscuta() {
    clearTimeout(restartTimerRef.current);
    if (!shouldListenRef.current || speakingRef.current || busyRef.current) return;
    if (recognitionRunningRef.current) {
      setStatus('OUVINDO');
      return;
    }
    try {
      recognitionRunningRef.current = true;
      recognitionRef.current.start();
      setStatus('OUVINDO');
    } catch {
      recognitionRunningRef.current = false;
      shouldListenRef.current = false;
      setListening(false);
      setStatus('ONLINE');
      setNotice('Não consegui iniciar o microfone. Clique em MIC OFF para tentar novamente.');
    }
  }

  function falar(texto) {
    if (speechRef.current) {
      speechRef.current.onstart = null;
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
    }
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setNotice('Resposta falada não disponível neste navegador.');
      setStatus('ONLINE');
      return;
    }
    // Pauso antes de falar e ignoro resultados atrasados para não responder à minha própria voz.
    speakingRef.current = true;
    clearTimeout(restartTimerRef.current);
    if (recognitionRunningRef.current) recognitionRef.current.abort();
    window.speechSynthesis.cancel();
    const fala = new window.SpeechSynthesisUtterance(texto);
    const voice = getJarvisVoice();
    if (voice) fala.voice = voice;
    fala.lang = voice?.lang || 'pt-BR';
    fala.rate = 0.9;
    fala.pitch = 0.75;
    fala.onstart = () => {
      setStatus('RESPONDENDO');
      if (recognitionRunningRef.current) recognitionRef.current.abort();
    };
    function terminarFala() {
      speakingRef.current = false;
      setStatus('ONLINE');
      retomarEscuta();
    }
    fala.onend = terminarFala;
    fala.onerror = () => {
      setNotice('Não consegui falar a resposta. Ela continua disponível na tela.');
      terminarFala();
    };
    speechRef.current = fala;
    setStatus('RESPONDENDO');
    try {
      window.speechSynthesis.speak(fala);
    } catch {
      fala.onerror();
    }
  }

  async function executarComando(rawCommand = command) {
    if (busyRef.current || speakingRef.current) return;
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
      retomarEscuta();
    }
  }

  function ouvir() {
    if (shouldListenRef.current) {
      shouldListenRef.current = false;
      setListening(false);
      clearTimeout(restartTimerRef.current);
      if (recognitionRunningRef.current) recognitionRef.current.abort();
      if (!speakingRef.current && !busyRef.current) setStatus('ONLINE');
      return;
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setNotice('Reconhecimento de voz não disponível neste navegador.');
      return;
    }
    // Reutilizo a mesma instância: o modo contínuo só termina quando desligo o MIC.
    if (!recognitionRef.current) {
      const recognition = new Recognition();
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;
      recognition.continuous = true;
      recognitionRef.current = recognition;
      recognition.onresult = (event) => {
        if (!shouldListenRef.current || speakingRef.current || busyRef.current) return;
        const index = event.results.length - 1;
        const result = event.results[index];
        if (index < event.resultIndex || !result.isFinal) return;
        const texto = result[0].transcript.trim();
        if (!texto) return;
        restartCountRef.current = 0;
        setCommand(texto);
        executarComando(texto);
      };
      recognition.onerror = (event) => {
        if (event.error === 'aborted') return;
        if (event.error === 'no-speech') {
          setNotice('Não ouvi nenhuma fala. Continuo aguardando seu comando.');
          return;
        }
        // Não reinicio automaticamente após erro de permissão, rede ou dispositivo.
        shouldListenRef.current = false;
        setListening(false);
        clearTimeout(restartTimerRef.current);
        setNotice(event.error === 'not-allowed' || event.error === 'service-not-allowed'
          ? 'Permita o acesso ao microfone para usar a voz.'
          : 'O microfone foi desligado após uma falha. Tente novamente ou digite.');
        if (!busyRef.current && !speakingRef.current) setStatus('ONLINE');
      };
      recognition.onend = () => {
        recognitionRunningRef.current = false;
        if (!shouldListenRef.current || speakingRef.current || busyRef.current) return;
        // Limito encerramentos seguidos sem uma frase para evitar um ciclo de falhas.
        restartCountRef.current += 1;
        if (restartCountRef.current > 3) {
          shouldListenRef.current = false;
          setListening(false);
          setStatus('ONLINE');
          setNotice('O navegador encerrou o microfone várias vezes. Clique em MIC OFF para reconectar.');
          return;
        }
        setStatus('ONLINE');
        restartTimerRef.current = setTimeout(retomarEscuta, 500);
      };
    }
    shouldListenRef.current = true;
    restartCountRef.current = 0;
    setListening(true);
    setNotice('');
    retomarEscuta();
  }

  const busy = status === 'PROCESSANDO' || status === 'RESPONDENDO';
  return (
    <div className="assistant-workspace">
      <section className="console-panel" aria-label="Console JARVIS">
        <div className="section-heading"><span className="eyebrow">INTERFACE NEURAL</span><span className="system-label">JARVIS / 01</span></div>
        <JarvisCore status={status} />
        <p className="console-response" aria-live="polite">{response}</p>
        <CommandInput command={command} onChange={setCommand} onExecute={executarComando} onMicrophone={ouvir} busy={busy} listening={listening} status={status} />
        {notice && <p className="console-notice" role="status">{notice}</p>}
        <div className="quick-commands" aria-label="Comandos locais">
          {commands.map((item) => <button key={item.id} disabled={busy} onClick={() => executarComando(item.example)}>{item.example}</button>)}
        </div>
      </section>
      <HistoryList history={history} />
    </div>
  );
}
