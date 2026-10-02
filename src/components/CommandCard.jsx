export default function CommandCard({
  name,
  category,
  description,
  favorite,
  onToggleFavorite,
}) {
  return (
    <article className="command-card">
      <span className="command-category">{category}</span>
      <h3>{name}</h3>
      <p>{description}</p>
      <button className="card-button" aria-pressed={favorite} onClick={onToggleFavorite}>
        {favorite ? 'Remover dos favoritos' : 'Favoritar'}
      </button>
    </article>
  );
}
