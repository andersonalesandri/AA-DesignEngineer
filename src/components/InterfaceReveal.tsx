import { useEffect, useRef, useState } from "react";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

const LINES = [
  "Começa como um rascunho.",
  "Ganha grid, cor e conteúdo.",
  "Só então: telas de verdade, no bolso de alguém.",
];

/* rough sketch of a phone screen — draws itself in */
function PhoneWire({ draw }: { draw: number }) {
  return (
    <svg className="iph-wire" viewBox="0 0 160 320" fill="none" aria-hidden="true">
      <g
        filter="url(#irough)"
        stroke="var(--ink-mute)"
        strokeWidth="2"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      >
        <line x1="20" y1="20" x2="60" y2="20" />
        <rect x="20" y="40" width="120" height="26" rx="5" />
        <rect x="20" y="82" width="120" height="34" rx="5" />
        <rect x="20" y="126" width="120" height="34" rx="5" />
        <rect x="20" y="170" width="120" height="34" rx="5" />
        <rect x="20" y="232" width="120" height="30" rx="6" />
        <line x1="20" y1="290" x2="140" y2="290" />
      </g>
    </svg>
  );
}

function Screen({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="scr">
        <div className="scr-status">
          <span>9:41</span>
          <span className="scr-dots" />
        </div>
        <div className="scr-h">Buscar</div>
        <div className="scr-field">Especialidade, nome…</div>
        {["Ana Prado", "Marcos Lima", "Júlia Sato"].map((n) => (
          <div className="scr-row" key={n}>
            <span className="scr-av" />
            <span>
              <b>{n}</b>
              <i>disponível hoje</i>
            </span>
          </div>
        ))}
        <div className="scr-tabs">
          <span className="on" />
          <span />
          <span />
        </div>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="scr">
        <div className="scr-status">
          <span>9:41</span>
          <span className="scr-dots" />
        </div>
        <div className="scr-h">Escolher horário</div>
        <div className="scr-day">Quinta, 12 set</div>
        <div className="scr-grid">
          {["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"].map((t, k) => (
            <span key={t} className={k === 3 ? "sel" : ""}>
              {t}
            </span>
          ))}
        </div>
        <div className="scr-cta">Confirmar 09:30</div>
        <div className="scr-tabs">
          <span />
          <span className="on" />
          <span />
        </div>
      </div>
    );
  }
  return (
    <div className="scr">
      <div className="scr-status">
        <span>9:41</span>
        <span className="scr-dots" />
      </div>
      <div className="scr-check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 12 10 18 20 6" />
        </svg>
      </div>
      <div className="scr-h center">Confirmado</div>
      <div className="scr-sum">
        <div>
          <i>Profissional</i>
          <b>Ana Prado</b>
        </div>
        <div>
          <i>Quando</i>
          <b>Qui, 12 set · 09:30</b>
        </div>
      </div>
      <div className="scr-cta ghost">Adicionar ao calendário</div>
      <div className="scr-tabs">
        <span />
        <span />
        <span className="on" />
      </div>
    </div>
  );
}

export default function InterfaceReveal() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = stage.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      setP(scrollable > 0 ? clamp(-rect.top / scrollable) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const onMove = (e: MouseEvent) => {
      const r = row.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      row.style.setProperty("--rot", `${(dx * 5).toFixed(2)}deg`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const draw = clamp(p * 2.6);
  const lineIdx = p < 0.42 ? 0 : p < 0.76 ? 1 : 2;

  // staggered parallax: each phone enters from further down, at its own rate
  const phoneStyle = (i: number) => {
    const ci = clamp((p - 0.22 - i * 0.1) / 0.32);
    const inv = 1 - ci;
    const depth = [56, 96, 40][i] ?? 56;
    return {
      "--scr-op": ci,
      "--scr-blur": `${(inv * 5).toFixed(2)}px`,
      transform: `translateY(${(inv * depth).toFixed(1)}px) rotate(calc(var(--rot, 0deg) * ${1 + i * 0.2}))`,
    } as React.CSSProperties;
  };
  const wireOpacity = clamp(1.15 - p * 2.1);
  const bgShift = { transform: `translateY(${(p * -40).toFixed(1)}px) scale(1.06)` } as React.CSSProperties;

  return (
    <section
      id="interface"
      className="ireveal"
      ref={stageRef}
      style={{ ["--p" as string]: p }}
    >
      <div className="ireveal-stage">
        <div className="ireveal-bg" aria-hidden="true" style={bgShift}>
          <video autoPlay muted loop playsInline preload="none" poster="/media/hero-texture.jpg">
            <source src="/media/hero-texture.webm" type="video/webm" />
            <source src="/media/hero-texture.mp4" type="video/mp4" />
          </video>
        </div>

        <span className="eyebrow ireveal-eyebrow">A interface aparece</span>

        <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
          <filter id="irough">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" />
          </filter>
        </svg>

        <div className="ireveal-phones" ref={rowRef}>
          {[0, 1, 2].map((i) => (
            <div className="iph" key={i} style={phoneStyle(i)}>
              <span className="iph-notch" aria-hidden="true" />
              <div className="iph-wirewrap" style={{ opacity: wireOpacity }}>
                <PhoneWire draw={draw} />
              </div>
              <div className="iph-scrwrap">
                <Screen i={i} />
              </div>
            </div>
          ))}
        </div>

        <div className="ireveal-caption">
          {LINES.map((l, i) => (
            <p key={l} className={i === lineIdx ? "is-on" : ""}>
              {l}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
