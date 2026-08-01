import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const TOOLS = [
  { name: "Claude Code", level: "Avançado", color: "#da7756" },
  { name: "Photoshop / Illustrator", level: "Avançado", color: "#9b6bff" },
  { name: "WordPress / Elementor", level: "Avançado", color: "#35d68e" },
  { name: "n8n", level: "Proficiente", color: "#f5a623" },
];

const FLOW = [
  { title: "Design & Prototipação", desc: "Wireframes e UI de alta fidelidade" },
  {
    title: "Engenharia com Claude Code",
    desc: "PRD, Claude.md, Design System e Progressive Disclosure",
  },
  { title: "Automação com IA", desc: "Agentes orquestrados em nuvem" },
  {
    title: "Deploy & Analytics",
    desc: "Performance, SEO técnico, Google Ads, GTM/GA4 e Meta Ads",
  },
];

const STACK = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Vite",
  "API Integration",
  "Webhooks",
  "n8n",
  "GTM",
  "GA4",
  "Meta Ads",
];

export default function CommandCenter() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((s) => (s + 1) % FLOW.length);
    }, 1500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="workflow" className="section">
      <Reveal>
        <span className="eyebrow">// WORKFLOW.TOOLKIT</span>
        <h2 className="heading-xl">
          Do Design ao Deploy,
          <br />
          <span className="gradient-text-cool">sem perda de fidelidade.</span>
        </h2>
        <p className="lede">
          O processo que uso para levar uma interface do rascunho visual até o produto
          em produção — combinando ferramentas de design, engenharia front-end e
          automação.
        </p>
      </Reveal>

      <div className="workflow-layout">
        <Reveal delay={0}>
          <div className="card">
            <div className="panel-title">Ferramentas Ativas</div>
            {TOOLS.map((t) => (
              <div key={t.name} className="tool-row">
                <span className="tool-name">{t.name}</span>
                <span
                  className="tool-level"
                  style={{ color: t.color, background: `${t.color}1a`, border: `1px solid ${t.color}40` }}
                >
                  {t.level}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="card">
            <div className="panel-title">Fluxo de Trabalho</div>
            <div className="flow-steps">
              {FLOW.map((step, i) => (
                <div
                  key={step.title}
                  className={`flow-step ${i === activeStep ? "is-active" : ""}`}
                >
                  <div className="flow-index">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="flow-text-title">{step.title}</div>
                    <div className="flow-text-desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="card">
            <div className="panel-title">Stack &amp; Integrações</div>
            <div className="stack-tags">
              {STACK.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
