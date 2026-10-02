export default function CommandCard({
  name,
  category,
  description,
  favorite,
  onToggleFavorite,
  onExecute,
  busy,
}) {
  return (
    <article className="command-card">
      <span className="command-category">{category}</span>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="card-actions">
        <button className="primary-button" onClick={onExecute} disabled={busy}>Executar</button>
      <button className="card-button" aria-pressed={favorite} onClick={onToggleFavorite}>
        {favorite ? 'Remover dos favoritos' : 'Favoritar'}
      </button>
      </div>
    </article>
  );
}
