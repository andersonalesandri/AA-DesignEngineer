import { useEffect, useRef, useState } from "react";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

const LINES = [
  "Começa como um rascunho.",
  "Ganha grid, cor e conteúdo.",
  "Só então: uma interface de verdade.",
];

export default function InterfaceReveal() {
  const stageRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);
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
    const site = siteRef.current;
    if (!site) return;
    const onMove = (e: MouseEvent) => {
      const r = site.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      site.style.setProperty("--tilt-x", `${(-dy * 3).toFixed(2)}deg`);
      site.style.setProperty("--tilt-y", `${(dx * 4).toFixed(2)}deg`);
    };
    const reset = () => {
      site.style.setProperty("--tilt-x", "0deg");
      site.style.setProperty("--tilt-y", "0deg");
    };
    window.addEventListener("mousemove", onMove);
    site.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      site.removeEventListener("mouseleave", reset);
    };
  }, []);

  const draw = clamp(p * 2.6);
  const lineIdx = p < 0.42 ? 0 : p < 0.76 ? 1 : 2;

  return (
    <section
      id="interface"
      className="ireveal"
      ref={stageRef}
      style={{ ["--p" as string]: p, ["--draw" as string]: draw }}
    >
      <div className="ireveal-stage">
        <div className="ireveal-bg" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="none" poster="/media/hero-texture.jpg">
            <source src="/media/hero-texture.webm" type="video/webm" />
            <source src="/media/hero-texture.mp4" type="video/mp4" />
          </video>
        </div>

        <span className="eyebrow ireveal-eyebrow">A interface aparece</span>

        <div className="ireveal-frame">
          {/* full-page wireframe that draws itself in, then fades */}
          <svg className="ireveal-wire" viewBox="0 0 640 440" fill="none" aria-hidden="true">
            <filter id="rough">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n" />
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
              {/* browser frame */}
              <rect x="12" y="10" width="616" height="420" rx="12" />
              <line x1="12" y1="44" x2="628" y2="44" />
              <circle cx="30" cy="27" r="3.5" />
              <circle cx="44" cy="27" r="3.5" />
              <circle cx="58" cy="27" r="3.5" />
              <rect x="86" y="20" width="240" height="14" rx="7" />
              {/* nav */}
              <rect x="34" y="64" width="70" height="14" rx="3" />
              <rect x="474" y="66" width="34" height="10" rx="3" />
              <rect x="520" y="66" width="34" height="10" rx="3" />
              <rect x="566" y="66" width="34" height="10" rx="3" />
              {/* hero */}
              <rect x="34" y="112" width="300" height="30" rx="4" />
              <rect x="34" y="152" width="230" height="30" rx="4" />
              <rect x="34" y="200" width="270" height="12" rx="3" />
              <rect x="34" y="228" width="110" height="34" rx="6" />
              <rect x="372" y="108" width="234" height="158" rx="10" />
              {/* three columns */}
              <rect x="34" y="300" width="180" height="96" rx="6" />
              <rect x="230" y="300" width="180" height="96" rx="6" />
              <rect x="426" y="300" width="180" height="96" rx="6" />
              {/* footer */}
              <line x1="34" y1="414" x2="606" y2="414" />
            </g>
          </svg>

          {/* the real, built page that sharpens in */}
          <div
            className="ireveal-site"
            ref={siteRef}
            style={{ pointerEvents: p > 0.8 ? "auto" : "none" }}
          >
            <div className="site-bar">
              <i />
              <i />
              <i />
              <span className="site-url">estudo-de-caso.web</span>
            </div>
            <div className="site-body">
              <div className="site-nav">
                <b>Ateliê</b>
                <nav>
                  <a>Trabalho</a>
                  <a>Sobre</a>
                  <a>Contato</a>
                </nav>
              </div>
              <div className="site-hero">
                <div className="site-hero-copy">
                  <span className="site-eyebrow">Estudo de caso</span>
                  <h4>
                    Do rascunho <em>ao produto</em>.
                  </h4>
                  <p>Uma página desenhada e construída pela mesma mão.</p>
                  <span className="site-btn">Começar →</span>
                </div>
                <div className="site-hero-media" />
              </div>
              <div className="site-features">
                <div>
                  <b>Pesquisa</b>
                  <span>o que a pessoa precisa</span>
                </div>
                <div>
                  <b>Design</b>
                  <span>sistema e protótipo</span>
                </div>
                <div>
                  <b>Código</b>
                  <span>entrega em produção</span>
                </div>
              </div>
              <div className="site-footer">
                <span>© Ateliê</span>
                <span>feito à mão</span>
              </div>
            </div>
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
