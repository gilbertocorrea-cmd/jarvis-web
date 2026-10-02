import { Link } from 'react-router-dom';
import JarvisConsole from '../components/JarvisConsole';

export default function HomePage() {
  return (
    <section className="page">
      <div className="hero">
        <div className="hero-text">
          <span className="eyebrow">ASSISTENTE WEB</span>
          <h1>JARVIS Interface</h1>
          <p>
            Uma SPA inspirada no JARVIS para demonstrar componentes,
            estado, eventos, rotas, props e renderização dinâmica.
          </p>
          <Link className="primary-button link-button" to="/comandos">
            Ver comandos
          </Link>
        </div>
        <JarvisConsole />
      </div>
    </section>
  );
}
