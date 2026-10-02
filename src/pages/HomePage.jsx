import { Link } from 'react-router-dom';
import JarvisConsole from '../components/JarvisConsole';

export default function HomePage() {
  return (
    <section className="page">
      <div className="hero">
        <div className="hero-text">
          <span className="eyebrow">ASSISTENTE PESSOAL</span>
          <h1>À sua disposição.</h1>
          <p>
            Sua voz. Seu comando. Pergunte, explore ideias e acompanhe cada resposta do JARVIS.
          </p>
          <Link className="primary-button link-button" to="/comandos">
            Ver comandos
          </Link>
        </div>
      </div>
      <JarvisConsole />
    </section>
  );
}
