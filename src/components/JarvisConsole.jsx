import { useState } from 'react';

export default function JarvisConsole() {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState(
    'Sistema online. Digite oi, hora, data ou ajuda.'
  );

  function executeCommand() {
    const text = command.trim().toLowerCase();

    if (!text) {
      setResponse('Digite um comando antes de executar.');
      return;
    }

    if (text === 'oi' || text === 'olá' || text === 'ola') {
      setResponse('Olá. JARVIS online e aguardando instruções.');
    } else if (text.includes('hora')) {
      const time = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setResponse(`Agora são ${time}.`);
    } else if (text.includes('data') || text.includes('dia')) {
      const date = new Date().toLocaleDateString('pt-BR');
      setResponse(`Hoje é ${date}.`);
    } else if (text.includes('ajuda')) {
      setResponse('Comandos disponíveis: oi, hora, data e ajuda.');
    } else {
      setResponse('Comando não reconhecido. Digite ajuda.');
    }

    setCommand('');
  }

  return (
    <section className="console-panel">
      <div className="jarvis-core" aria-hidden="true">
        <div className="jarvis-core-inner" />
      </div>
      <p className="console-response" aria-live="polite">{response}</p>
      <div className="console-controls">
        <input
          aria-label="Comando para o JARVIS"
          type="text"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          placeholder="Digite um comando..."
        />
        <button className="primary-button" onClick={executeCommand}>
          Executar
        </button>
      </div>
    </section>
  );
}
