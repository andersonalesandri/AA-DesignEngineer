import { useEffect, useRef, useState } from "react";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

const LINES = [
  "Do traço à tela.",
  "Ganha grid, cor e conteúdo.",
  "Só então: uma interface de verdade.",
];

export default function InterfaceReveal() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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

  // cursor parallax, only once the component is "live"
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      card.style.setProperty("--tilt-x", `${(-dy * 4).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(dx * 5).toFixed(2)}deg`);
    };
    const reset = () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };
    window.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  const draw = clamp(p * 2.8); // stroke "draws in" over first third
  const lineIdx = p < 0.42 ? 0 : p < 0.76 ? 1 : 2;

  return (
    <section
      id="interface"
      className="ireveal"
      ref={stageRef}
      style={{ ["--p" as string]: p, ["--draw" as string]: draw }}
    >
      <div className="ireveal-stage">
        <span className="eyebrow ireveal-eyebrow">A interface aparece</span>

        <div className="ireveal-frame">
          {/* hand-drawn wireframe that fades out */}
          <svg
            className="ireveal-wire"
            viewBox="0 0 420 300"
            fill="none"
            aria-hidden="true"
          >
            <filter id="rough">
              <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="4" />
            </filter>
            <g
              filter="url(#rough)"
              stroke="var(--ink-mute)"
              strokeWidth="1.6"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - draw}
            >
              <rect x="18" y="16" width="384" height="268" rx="10" />
              <rect x="40" y="42" width="70" height="14" rx="3" />
              <rect x="40" y="74" width="250" height="26" rx="3" />
              <line x1="40" y1="122" x2="380" y2="122" />
              <rect x="40" y="146" width="96" height="60" rx="6" />
              <rect x="162" y="146" width="96" height="60" rx="6" />
              <rect x="284" y="146" width="96" height="60" rx="6" />
              <rect x="40" y="230" width="130" height="34" rx="6" />
            </g>
          </svg>

          {/* the real, live component that sharpens in */}
          <div
            className="ireveal-card"
            ref={cardRef}
            style={{ pointerEvents: p > 0.8 ? "auto" : "none" }}
          >
            <span className="ireveal-card-eyebrow">Componente</span>
            <div className="ireveal-card-title">Card de caso</div>
            <div className="ireveal-card-stats">
              <div>
                <b>6</b>
                <span>etapas</span>
              </div>
              <div>
                <b>12</b>
                <span>anos</span>
              </div>
              <div>
                <b>100%</b>
                <span>no ar</span>
              </div>
            </div>
            <button type="button" className="ireveal-card-btn">
              Ver caso →
            </button>
          </div>
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
