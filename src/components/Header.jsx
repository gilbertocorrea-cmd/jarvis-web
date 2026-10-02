import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div>
        <strong>JARVIS</strong>
        <span> Interface Web</span>
      </div>
      <nav className="nav-links">
        <Link to="/">Início</Link>
        <Link to="/comandos">Comandos</Link>
        <Link to="/about">Sobre</Link>
      </nav>
    </header>
  );
}
