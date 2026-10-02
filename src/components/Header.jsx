import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div>
        <strong>JARVIS</strong>
        <span> Web Interface</span>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/comandos">Comandos</Link>
      </nav>
    </header>
  );
}
