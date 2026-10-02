export default function JarvisCore({ status }) {
  // Desenho o rosto com linhas e pontos; o CSS reage ao estado recebido por props.
  const nodes = [[100,20],[68,30],[132,30],[48,61],[152,61],[43,95],[157,95],[60,121],[140,121],[78,151],[122,151],[100,168],[100,75],[100,111],[72,87],[128,87]];
  return (
    <div className={`core-display state-${status.toLowerCase()}`}>
      <div className="hologram-stage" aria-hidden="true">
        <div className="hud-side hud-left">
          <span>NEURAL LINK</span><i /><i /><i />
          <svg viewBox="0 0 80 30"><path d="M0 20H12L18 8 24 25 32 12 40 18H52L60 3 67 22H80" /></svg>
          <span>SYS / 01</span>
        </div>
        <div className="core-orbit">
          <div className="core-ring core-ring-outer" />
          <div className="core-ring core-ring-middle" />
          <div className="core-ring core-ring-inner" />
          <span className="core-axis axis-horizontal" />
          <span className="core-axis axis-vertical" />
          <svg className="hologram-face" viewBox="0 0 200 215">
            <g className="face-mesh">
              <path className="face-silhouette" d="M100 20 68 30 48 61 43 95 51 124 78 151 100 168 122 151 149 124 157 95 152 61 132 30Z" />
              <path d="M68 30 100 45 132 30M48 61 76 58 100 45 124 58 152 61M43 95 65 73 76 58 100 75 124 58 135 73 157 95M51 124 60 103 65 73M149 124 140 103 135 73M60 103 78 118 100 111 122 118 140 103M78 118 78 151M122 118 122 151M51 124 78 118 100 140 122 118 149 124M78 151 100 140 122 151M100 20V75M100 140V168" />
              <path d="M100 75 89 106 100 111 111 106 100 75M68 94 78 100 89 106M132 94 122 100 111 106M82 127 100 123 118 127 100 133Z" />
              <path className="face-neck" d="M78 151 77 177 42 190 25 211M122 151 123 177 158 190 175 211M77 177 100 192 123 177M42 190 100 207 158 190M100 168V207" />
              <path className="face-eyes" d="M61 82 75 80 87 87 73 90ZM139 82 125 80 113 87 127 90Z" />
              {nodes.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />)}
            </g>
            <g className="face-contours"><path d="M57 45Q100 60 143 45M49 57Q100 72 151 57M46 111Q100 132 154 111M59 134Q100 155 141 134" /></g>
          </svg>
          <div className="scanner-line" />
          <div className="core-particles"><i /><i /><i /><i /><i /><i /></div>
        </div>
        <div className="hud-side hud-right">
          <span>VOICE LINK</span>
          <div className="voice-bars">{[0,1,2,3,4,5,6].map((bar) => <i key={bar} style={{ animationDelay: `${bar * .1}s` }} />)}</div>
          <span>PT / BR</span><i /><i />
        </div>
      </div>
      <p className="core-status" role="status"><span />{status}</p>
    </div>
  );
}
