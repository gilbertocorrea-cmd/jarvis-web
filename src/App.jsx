import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import JarvisConsole from './components/JarvisConsole';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
 
export default function App() {
  return (
    <div className="app-shell">
      <Header />
 
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/comandos" element={<JarvisConsole showCommands />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
 
      <Footer />
    </div>
  );
}
