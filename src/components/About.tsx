import { useEffect, useRef, useState, type ReactNode } from "react";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const INTRO = 0.22;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Panel =
  | {
      kind: "principle";
      glyph: ReactNode;
      title: string;
      desc: string;
    }
  | {
      kind: "year";
      year: string;
      role: string;
      org: string;
      bullets: string[];
    };

const PANELS: Panel[] = [
  {
    kind: "principle",
    glyph: (
      <svg viewBox="0 0 24 24" {...S}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    title: "Fidelidade pixel-perfect",
    desc:
      "Acompanho o produto do layout ao código exposto ao usuário, garantindo que o que foi desenhado é o que chega na tela.",
  },
  {
    kind: "principle",
    glyph: (
      <svg viewBox="0 0 24 24" {...S}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M6.7 7.4 10 10.5M17.3 7.4 14 10.5M6.7 16.6 10 13.5M17.3 16.6 14 13.5" />
      </svg>
    ),
    title: "Design system primeiro",
    desc:
      "Tokens, componentes reutilizáveis e prototipação de alta fidelidade — bibliotecas que o time inteiro usa sem quebrar.",
  },
  {
    kind: "principle",
    glyph: (
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="3.4" />
      </svg>
    ),
    title: "Automação com IA",
    desc:
      "Agentes de IA orquestrados em nuvem para acelerar entregas, com engenharia de contexto e de prompt aplicada ao código.",
  },
  {
    kind: "principle",
    glyph: (
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
      </svg>
    ),
    title: "Performance & acessibilidade",
    desc:
      "Código limpo, semântico e responsivo, com foco em WCAG, SEO técnico e carregamento otimizado.",
  },
  {
    kind: "year",
    year: "2018 — Presente",
    role: "Design Engineer & Estrategista Digital",
    org: "Freelancer / Consultor",
    bullets: [
      "Arquitetura de interfaces web: landing pages e aplicações de alta conversão, responsivas e rápidas.",
      "Design systems em nuvem: tokens e bibliotecas de componentes orquestrados via infra cloud e agentes de IA.",
      "Automação de engenharia e marketing: captura e CRM via n8n e webhooks, com rastreamento GTM/GA4.",
    ],
  },
  {
    kind: "year",
    year: "2010 — 2018",
    role: "Web Designer & Especialista em Interface",
    org: "Design visual e front-end",
    bullets: [
      "Identidades visuais, peças gráficas complexas e vetorização com a suíte Adobe.",
      "Front-end e animação interativa com HTML, CSS, JavaScript, ActionScript e ASPX.",
      "Fidelidade pixel-perfect entre o layout e o código final.",
    ],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const prog = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
      setP(prog);
      const scrub = clamp((prog - INTRO) / (1 - INTRO));
      const distance = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-(scrub * distance).toFixed(1)}px, 0, 0)`;
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

  const scrub = clamp((p - INTRO) / (1 - INTRO));
  const current = Math.min(PANELS.length, Math.floor(scrub * PANELS.length) + 1);

  return (
    <section id="identity" className="arail" ref={sectionRef}>
      <div className="arail-sticky">
        <div className="arail-head">
          <span className="eyebrow">Quem faz</span>
          <h2 className="heading-xl">
            A Engenharia <span className="gradient-text">por trás do Design</span>.
          </h2>
          <p className="lede">
            Não fico só na entrega visual. Desenho a arquitetura de como a
            interface se comporta — e como o sistema evolui com o produto.
          </p>
        </div>

        <div className="arail-track" ref={trackRef}>
          {PANELS.map((panel, i) =>
            panel.kind === "principle" ? (
              <article className="apanel" key={i}>
                <span className="apanel-glyph" aria-hidden="true">
                  {panel.glyph}
                </span>
                <h3 className="apanel-title">{panel.title}</h3>
                <p className="apanel-desc">{panel.desc}</p>
              </article>
            ) : (
              <article className="apanel apanel-year" key={i}>
                <div className="apanel-year-tag">{panel.year}</div>
                <h3 className="apanel-title">{panel.role}</h3>
                <div className="apanel-org">{panel.org}</div>
                <ul className="apanel-bullets">
                  {panel.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            )
          )}
        </div>

        <div className="arail-progress" aria-hidden="true">
          <span className="pboard-count">
            {String(current).padStart(2, "0")} / {String(PANELS.length).padStart(2, "0")}
          </span>
          <span className="pboard-rail">
            <span className="pboard-fill" style={{ transform: `scaleX(${Math.max(0.04, p)})` }} />
          </span>
        </div>
      </div>
    </section>
  );
}
