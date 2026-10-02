export default function HistoryList({ history }) {
  return (
    <section className="history-panel" aria-labelledby="history-title">
      <div className="section-heading"><h2 id="history-title">Histórico</h2><span>{history.length} registros</span></div>
      {history.length === 0 && <p className="empty-history">Aguardando seu primeiro comando.</p>}
      <div className="history-list">
        {history.map((item) => (
          <article className="history-item" key={item.id}>
            <p><strong>EU</strong> {item.command}</p>
            <p><strong>JARVIS</strong> {item.response}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
