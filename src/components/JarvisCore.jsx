export default function JarvisCore({ status }) {
  return (
    <div className={`core-display state-${status.toLowerCase()}`}>
      <div className="core-orbit" aria-hidden="true">
        <div className="core-ring core-ring-outer" />
        <div className="core-ring core-ring-middle" />
        <div className="core-ring core-ring-inner" />
        <div className="core-heart">J</div>
        <span className="core-axis axis-horizontal" />
        <span className="core-axis axis-vertical" />
      </div>
      <p className="core-status" role="status"><span />{status}</p>
    </div>
  );
}
