import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { RETICLE } from "./About";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const GLYPHS: Record<string, ReactNode> = {
  discover: (
    <svg viewBox="0 0 24 24" {...S}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M3 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-4 3v-3H5a2 2 0 0 1-2-2Z" />
      <path d="M17 10h2a2 2 0 0 1 2 2v4l-3-2h-3" />
    </svg>
  ),
  define: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M2 12 7 5.5 12 12 7 18.5Z" />
      <path d="M12 12 17 5.5 22 12 17 18.5Z" />
    </svg>
  ),
  ideate: (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M9 17h6M10 20h4" />
      <path d="M12 3a6 6 0 0 1 3.7 10.7c-.5.4-.7.9-.7 1.5H9c0-.6-.2-1.1-.7-1.5A6 6 0 0 1 12 3Z" />
    </svg>
  ),
  prototype: (
    <svg viewBox="0 0 24 24" {...S}>
      <rect x="3" y="3" width="13" height="13" rx="2" />
      <path d="M9 21h9a2 2 0 0 0 2-2V9" />
    </svg>
  ),
  deliver: (
    <svg viewBox="0 0 24 24" {...S}>
      <polyline points="9 8 4.5 12 9 16" />
      <polyline points="15 8 19.5 12 15 16" />
    </svg>
  ),
  result: (
    <svg viewBox="0 0 24 24" {...S}>
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="15 6 21 6 21 12" />
    </svg>
  ),
};

type Phase = {
  n: string;
  name: string;
  icon: keyof typeof GLYPHS;
  line: string;
  does: string[];
  artifact: string;
};

const PHASES: Phase[] = [
  {
    n: "01",
    icon: "discover",
    name: "Descoberta",
    line: "Entendo o negócio, as restrições e o que conta como sucesso.",
    does: ["Kickoff e entrevista com stakeholders", "Metas e métricas de sucesso", "Premissas e riscos"],
    artifact: "Brief",
  },
  {
    n: "02",
    icon: "research",
    name: "Pesquisa",
    line: "Ouço quem vai usar antes de desenhar qualquer tela.",
    does: ["Entrevistas com usuários", "Benchmark e análise competitiva", "Analytics e avaliação heurística"],
    artifact: "Quadro de achados",
  },
  {
    n: "03",
    icon: "define",
    name: "Definição",
    line: "Transformo o que ouvi num problema nítido e priorizado.",
    does: ["Síntese e insights", "Persona e mapa de jornada", "Arquitetura de informação", "Priorização (impacto × esforço)"],
    artifact: "Mapa de jornada",
  },
  {
    n: "04",
    icon: "ideate",
    name: "Ideação",
    line: "Exploro caminhos rápido, no papel, antes de investir em pixel.",
    does: ["Sketching e Crazy-8s", "Fluxos e sitemap", "Wireframes de baixa fidelidade"],
    artifact: "Wireframes",
  },
  {
    n: "05",
    icon: "prototype",
    name: "Protótipo & teste",
    line: "Dou fidelidade e testo com gente de verdade — e itero.",
    does: ["UI de alta fidelidade", "Design system e tokens", "Protótipo interativo", "Teste de usabilidade"],
    artifact: "Protótipo Figma",
  },
  {
    n: "06",
    icon: "deliver",
    name: "Entrega",
    line: "Construo em código, sem perder fidelidade do design.",
    does: ["HTML semântico, React, TypeScript", "Componentização e acessibilidade (WCAG)", "Automação de fluxos com agentes de IA"],
    artifact: "Componentes + PR",
  },
  {
    n: "07",
    icon: "result",
    name: "Resultado",
    line: "Meço contra as métricas combinadas e registro o aprendizado.",
    does: ["Analytics, SEO técnico, performance", "Feedback e retrospectiva", "Antes / depois"],
    artifact: "Antes / depois",
  },
];

const INTRO = 0.24;

export default function ProcessBoard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimated(false);
      return;
    }

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

  // cursor-follow gradient glow on each card
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement)?.closest<HTMLElement>(".pcard");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    track.addEventListener("mousemove", onMove);
    return () => track.removeEventListener("mousemove", onMove);
  }, []);

  const intro = clamp(p / INTRO);
  const scrub = clamp((p - INTRO) / (1 - INTRO));
  const current = Math.min(PHASES.length, Math.floor(scrub * PHASES.length) + 1);

  const cardStyle = (i: number) => {
    if (!animated) return undefined;
    const ci = clamp((intro - i * 0.05) / 0.6);
    const inv = 1 - ci;
    return {
      transform: `translateX(${(inv * -46).toFixed(2)}vw) skewX(${(inv * -9).toFixed(2)}deg) scaleY(${(1 - inv * 0.08).toFixed(3)})`,
      filter: `blur(${(inv * 7).toFixed(2)}px)`,
      opacity: ci,
    } as CSSProperties;
  };

  return (
    <section id="processo" className="pboard" ref={sectionRef}>
      <div className="pboard-sticky">
        <div className="pboard-head">
          <span className="eyebrow">A jornada de UX / UI</span>
          <h2 className="heading-xl">
            Antes de aparecer, ela passa por <span className="gradient-text">sete etapas</span>.
          </h2>
        </div>

        <div className="pboard-track" ref={trackRef}>
          {PHASES.map((ph, i) => (
            <article
              className="pcard"
              key={ph.n}
              style={{ ...cardStyle(i), ["--i" as string]: i }}
            >
              <span className="pcard-marker" aria-hidden="true">
                <span className="mk-def">{GLYPHS[ph.icon]}</span>
                <span className="mk-hov">{RETICLE}</span>
              </span>
              <span className="pcard-n">{ph.n}</span>
              <div className="pcard-namerow">
                <span className="pcard-blip" aria-hidden="true" />
                <h3 className="pcard-name">{ph.name}</h3>
              </div>
              <p className="pcard-line">{ph.line}</p>
              <ul className="pcard-does">
                {ph.does.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="pcard-artifact">
                <span>{ph.artifact}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="pboard-progress" aria-hidden="true">
          <span className="pboard-count">
            {String(current).padStart(2, "0")} / {String(PHASES.length).padStart(2, "0")}
          </span>
          <span className="pboard-rail">
            <span className="pboard-fill" style={{ transform: `scaleX(${Math.max(0.04, p)})` }} />
          </span>
        </div>
      </div>
    </section>
  );
}
