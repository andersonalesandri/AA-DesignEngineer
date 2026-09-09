import { useEffect, useRef, useState, type CSSProperties } from "react";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

type Phase = {
  n: string;
  name: string;
  line: string;
  does: string[];
  artifact: string;
};

const PHASES: Phase[] = [
  {
    n: "01",
    name: "Descoberta",
    line: "Entendo o negócio, as restrições e o que conta como sucesso.",
    does: ["Kickoff e entrevista com stakeholders", "Metas e métricas de sucesso", "Premissas e riscos"],
    artifact: "Brief",
  },
  {
    n: "02",
    name: "Pesquisa",
    line: "Ouço quem vai usar antes de desenhar qualquer tela.",
    does: ["Entrevistas com usuários", "Benchmark e análise competitiva", "Analytics e avaliação heurística"],
    artifact: "Quadro de achados",
  },
  {
    n: "03",
    name: "Definição",
    line: "Transformo o que ouvi num problema nítido e priorizado.",
    does: ["Síntese e insights", "Persona e mapa de jornada", "Arquitetura de informação", "Priorização (impacto × esforço)"],
    artifact: "Mapa de jornada",
  },
  {
    n: "04",
    name: "Ideação",
    line: "Exploro caminhos rápido, no papel, antes de investir em pixel.",
    does: ["Sketching e Crazy-8s", "Fluxos e sitemap", "Wireframes de baixa fidelidade"],
    artifact: "Wireframes",
  },
  {
    n: "05",
    name: "Protótipo & teste",
    line: "Dou fidelidade e testo com gente de verdade — e itero.",
    does: ["UI de alta fidelidade", "Design system e tokens", "Protótipo interativo", "Teste de usabilidade"],
    artifact: "Protótipo Figma",
  },
  {
    n: "06",
    name: "Entrega",
    line: "Construo em código, sem perder fidelidade do design.",
    does: ["HTML semântico, React, TypeScript", "Componentização e acessibilidade (WCAG)", "Automação de fluxos com agentes de IA"],
    artifact: "Componentes + PR",
  },
  {
    n: "07",
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
          <span className="eyebrow">O processo</span>
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
              <span className="pcard-node" aria-hidden="true" />
              <div className="pcard-n">{ph.n}</div>
              <h3 className="pcard-name">{ph.name}</h3>
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
