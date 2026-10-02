import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import CommandsPage from './pages/CommandsPage';
import HomePage from './pages/HomePage';
 
export default function App() {
  return (
    <div className="app-shell">
      <Header />
 
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/comandos" element={<CommandsPage />} />
        </Routes>
      </main>
 
      <Footer />
    </div>
  );
}
