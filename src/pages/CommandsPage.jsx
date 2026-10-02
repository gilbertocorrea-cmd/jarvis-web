import { useState } from 'react';
import BackButton from '../components/BackButton';
import CommandCard from '../components/CommandCard';
import commands from '../data/commands.json';

export default function CommandsPage() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function toggleFavorite(id) {
    setFavoriteIds((currentIds) => {
      const alreadyFavorite = currentIds.includes(id);

      if (alreadyFavorite) {
        return currentIds.filter((itemId) => itemId !== id);
      }

      return [...currentIds, id];
    });
  }

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CATÁLOGO</span>
          <h1>Comandos do JARVIS</h1>
          <p>Favoritos selecionados: {favoriteIds.length}</p>
        </div>
        <BackButton />
      </div>
      <div className="commands-grid">
        {commands.map((command) => (
          <CommandCard
            key={command.id}
            name={command.name}
            category={command.category}
            description={command.description}
            favorite={favoriteIds.includes(command.id)}
            onToggleFavorite={() => toggleFavorite(command.id)}
          />
        ))}
      </div>
    </section>
  );
}
