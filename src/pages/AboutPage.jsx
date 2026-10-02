import BackButton from '../components/BackButton';

export default function AboutPage() {
  return (
    <section className="page about-page">
      <div className="page-heading"><div><span className="eyebrow">SOBRE O PROJETO</span><h1>Meu JARVIS Web</h1></div><BackButton /></div>
      <div className="about-panel">
        <h2>Meu objetivo</h2>
        <p>Neste projeto acadêmico de ADS na FATEC, uso React para construir um assistente que recebe texto e voz, responde na tela e fala a resposta.</p>
        <h2>Como organizo o código</h2>
        <p>Guardo os dados com useState e passo informações aos componentes por props. Uso map e key para mostrar comandos, cards e histórico. Os botões executam funções com onClick.</p>
        <h2>As tecnologias que uso</h2>
        <p>React, Vite, React Router, JavaScript, CSS e Flexbox. Para voz, uso as APIs do navegador. Para perguntas gerais, consulto o OpenRouter através de uma função na Vercel.</p>
        <h2>O que preciso considerar</h2>
        <p>O reconhecimento de voz depende do navegador, da permissão do microfone e pode precisar de internet. Guardo até 50 registros neste navegador. A IA pode errar; confiro informações importantes.</p>
      </div>
    </section>
  );
}
