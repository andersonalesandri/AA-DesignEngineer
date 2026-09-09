import { useEffect, useRef, useState } from "react";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

const STEPS = [
  { label: "Rascunho", level: 0 },
  { label: "Wireframe", level: 1 },
  { label: "Protótipo", level: 2 },
] as const;

const IC = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const Ico: Record<string, JSX.Element> = {
  bell: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  ),
  pix: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M12 3.5 20.5 12 12 20.5 3.5 12z" />
      <path d="M8.5 8.5 12 12l3.5-3.5M8.5 15.5 12 12l3.5 3.5" />
    </svg>
  ),
  barcode: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M4 5v14M8 5v14M12 5v14M16 5v14M20 5v14" />
    </svg>
  ),
  transfer: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </svg>
  ),
  receipt: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M3 4h2l2.5 12h10L20 7H6" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  ),
  incoming: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M17 7 7 17M7 9v8h8" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" {...IC}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5z" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" {...IC}>
      <path d="M4 11 12 4l8 7M6 10v10h12V10" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" {...IC}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" {...IC}>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  ),
};

const ACTIONS: { label: string; icon: keyof typeof Ico }[] = [
  { label: "Pix", icon: "pix" },
  { label: "Pagar", icon: "barcode" },
  { label: "Transferir", icon: "transfer" },
  { label: "Extrato", icon: "receipt" },
];
const TX: { name: string; val: string; kind: string; icon: keyof typeof Ico }[] = [
  { name: "Mercado", val: "− 76,40", kind: "neg", icon: "cart" },
  { name: "Pix recebido", val: "+ 150,00", kind: "pos", icon: "incoming" },
  { name: "Streaming", val: "− 21,90", kind: "neg", icon: "play" },
];

/* the same screen — a bank app home — at three fidelities */
function Screen({ level, draw }: { level: number; draw: number }) {
  if (level === 0) {
    const shapes = (
      <>
        {/* the phone itself — sketched */}
        <rect x="5" y="5" width="150" height="336" rx="30" />
        <rect x="58" y="15" width="44" height="9" rx="4" />
        {/* content */}
        <path d="M22 46h24" />
        <rect x="22" y="60" width="62" height="12" rx="3" />
        <circle cx="132" cy="66" r="9" />
        <path d="M22 88h58" />
        <rect x="22" y="102" width="100" height="20" rx="4" />
        <circle cx="32" cy="150" r="9" />
        <circle cx="64" cy="150" r="9" />
        <circle cx="96" cy="150" r="9" />
        <circle cx="128" cy="150" r="9" />
        <rect x="22" y="178" width="116" height="34" rx="6" />
        <path d="M22 228h66" />
        <path d="M22 252h116" />
        <path d="M22 280h116" />
        <path d="M22 308h116" />
      </>
    );
    return (
      <svg className="fi-sketch" viewBox="0 0 160 346" fill="none" aria-hidden="true">
        <g
          stroke="var(--ink-soft)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        >
          <g filter="url(#irough)" opacity="0.9">{shapes}</g>
          <g filter="url(#irough2)" opacity="0.5" transform="translate(1.4 -1)">
            {shapes}
          </g>
        </g>
      </svg>
    );
  }

  if (level === 1) {
    return (
      <div className="fi-wire">
        <div className="fi-wire-status">
          <span />
          <span className="w" />
        </div>
        <div className="fi-wire-top">
          <span className="bar sm" />
          <span className="circ" />
        </div>
        <span className="bar xs" />
        <span className="bar lg" />
        <div className="fi-wire-actions">
          <span className="circ" />
          <span className="circ" />
          <span className="circ" />
          <span className="circ" />
        </div>
        <div className="fi-wire-card" />
        <span className="bar sm" />
        <div className="fi-wire-tx">
          {TX.map((t) => (
            <div key={t.name}>
              <span className="dot" />
              <span className="bar md" />
              <span className="bar xs r" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="scr scr-bank">
      <div className="scr-status">
        <span>9:41</span>
        <span className="scr-dots" />
      </div>

      <div className="bk-top">
        <span className="bk-av" />
        <div>
          <i>Bom dia,</i>
          <b>João José</b>
        </div>
        <span className="bk-ic">{Ico.bell}</span>
      </div>

      <div className="bk-balance">
        <div className="bk-balance-row">
          <i>Saldo em conta</i>
          <span className="bk-ic sm">{Ico.eye}</span>
        </div>
        <b>R$ 2.847,10</b>
      </div>

      <div className="bk-actions">
        {ACTIONS.map((a, k) => (
          <span key={a.label}>
            <em className={k === 0 ? "on" : ""}>{Ico[a.icon]}</em>
            {a.label}
          </span>
        ))}
      </div>

      <div className="bk-card">
        <span className="bk-card-ic">{Ico.card}</span>
        <div>
          <i>Cartão de crédito</i>
          <b>Fatura R$ 842,10</b>
        </div>
        <span className="bk-card-chev">›</span>
      </div>

      <div className="bk-tx-label">Últimas movimentações</div>
      <div className="bk-tx">
        {TX.map((t) => (
          <div key={t.name}>
            <span className="bk-dot">{Ico[t.icon]}</span>
            <span className="bk-name">{t.name}</span>
            <b className={t.kind}>{t.val}</b>
          </div>
        ))}
      </div>

      <div className="bk-tabs">
        <span className="on">{Ico.home}</span>
        <span>{Ico.card}</span>
        <span>{Ico.pix}</span>
        <span>{Ico.grid}</span>
      </div>
    </div>
  );
}

export default function InterfaceReveal() {
  const stageRef = useRef<HTMLDivElement>(null);
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

  const draw = clamp(p * 2.8);
  const bgShift = { transform: `translateY(${(p * -36).toFixed(1)}px) scale(1.06)` } as React.CSSProperties;

  const phoneStyle = (i: number) => {
    const ci = clamp((p - 0.18 - i * 0.1) / 0.34);
    const inv = 1 - ci;
    const depth = [52, 88, 40][i] ?? 52;
    return {
      opacity: ci,
      transform: `translateY(${(inv * depth).toFixed(1)}px)`,
    } as React.CSSProperties;
  };

  return (
    <section id="interface" className="ireveal" ref={stageRef}>
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
            <feTurbulence type="turbulence" baseFrequency="0.017" numOctaves="3" seed="5" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="6.5" />
          </filter>
          <filter id="irough2">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" seed="19" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
          </filter>
        </svg>

        <div className="ireveal-phones">
          {STEPS.map((step, i) => (
            <div className="ireveal-step" key={step.label} style={phoneStyle(i)}>
              <span className="iph-label">{step.label}</span>
              <div className={`iph iph--f${step.level}`}>
                {step.level === 2 && <span className="iph-notch" aria-hidden="true" />}
                {step.level === 1 && <span className="iph-wnotch" aria-hidden="true" />}
                <div className="iph-scrwrap">
                  <Screen level={step.level} draw={draw} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="ireveal-caption-1">A mesma tela — do rascunho ao protótipo.</p>
      </div>
    </section>
  );
}
