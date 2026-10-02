export default function CommandInput({ command, onChange, onExecute, onMicrophone, busy, listening }) {
  return (
    <div className="console-controls">
      <label className="command-field">
        <span>SEU COMANDO</span>
        <input
          value={command}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.nativeEvent.isComposing && !busy) onExecute();
          }}
          placeholder="Digite ou use o microfone..."
          maxLength={2000}
          disabled={busy}
        />
      </label>
      <div className="command-buttons">
        <button className="primary-button" onClick={() => onExecute()} disabled={busy}>Executar</button>
        <button className="secondary-button mic-button" onClick={onMicrophone} disabled={busy && !listening} aria-pressed={listening}>
          {listening ? 'Parar MIC' : 'MIC'}
        </button>
      </div>
    </div>
  );
}
