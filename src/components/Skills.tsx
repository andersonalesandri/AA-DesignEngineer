import { useState } from "react";
import Reveal from "./Reveal";
import { useInView } from "../hooks/useInView";

const OVERVIEW = [
  { name: "Design Engineering & UI", pct: 96, color: "#4f7bff" },
  { name: "Desenvolvimento Front-End", pct: 92, color: "#9b6bff" },
  { name: "Automação & Cloud", pct: 87, color: "#35d68e" },
  { name: "Design Suite & Analytics", pct: 90, color: "#33c9d6" },
];

const DETAIL = [
  {
    group: "Design Engineering & UI",
    color: "#4f7bff",
    items: [
      { name: "Design Systems", pct: 96 },
      { name: "Design Tokens (JSON/CSS)", pct: 94 },
      { name: "Prototipação Alta Fidelidade", pct: 93 },
      { name: "Acessibilidade (WCAG)", pct: 88 },
    ],
  },
  {
    group: "Desenvolvimento Front-End",
    color: "#9b6bff",
    items: [
      { name: "HTML5 Semântico", pct: 95 },
      { name: "CSS3 (Grid / Flexbox / Animations)", pct: 93 },
      { name: "JavaScript", pct: 85 },
      { name: "WordPress / Elementor", pct: 90 },
    ],
  },
  {
    group: "Automação & Cloud",
    color: "#35d68e",
    items: [
      { name: "IA First (Metodologia)", pct: 93 },
      { name: "Orquestração de Agentes de IA", pct: 87 },
      { name: "n8n", pct: 89 },
      { name: "Webhooks & Integrações", pct: 85 },
      { name: "Prompt / Context Engineering", pct: 88 },
    ],
  },
  {
    group: "Design Suite & Analytics",
    color: "#33c9d6",
    items: [
      { name: "Figma", pct: 95 },
      { name: "Photoshop / Illustrator", pct: 90 },
      { name: "SEO Técnico / GTM / GA4", pct: 86 },
      { name: "Meta Ads / Performance Web", pct: 80 },
    ],
  },
];

function MatrixOverview() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="card matrix-card">
      {OVERVIEW.map((row) => (
        <div key={row.name} className="matrix-row">
          <div className="matrix-name">{row.name}</div>
          <div className="matrix-track">
            <div
              className="matrix-fill"
              style={{ width: inView ? `${row.pct}%` : "0%", background: row.color }}
            />
          </div>
          <div className="matrix-pct" style={{ color: row.color }}>
            {row.pct}%
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillGroupCard({ group }: { group: (typeof DETAIL)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="card">
      <div className="skills-detail-title">
        <span className="skills-detail-dot" style={{ background: group.color }} />
        {group.group}
      </div>
      {group.items.map((item) => (
        <div key={item.name} className="skill-item">
          <div className="skill-item-top">
            <span>{item.name}</span>
            <span style={{ color: group.color, fontWeight: 700 }}>{item.pct}%</span>
          </div>
          <div className="skill-bar">
            <div
              className="skill-bar-fill"
              style={{ width: inView ? `${item.pct}%` : "0%", background: group.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="skills" className="section">
      <Reveal>
        <span className="eyebrow">// SKILLS.CAPABILITY_MATRIX</span>
        <h2 className="heading-xl">
          Design.
          <br />
          <span className="gradient-text-cool">Engenharia. Automação.</span>
        </h2>
        <p className="lede">
          Mais de 15 anos transitando entre design visual, front-end e infraestrutura
          de automação — a combinação que sustenta cada entrega.
        </p>
      </Reveal>

      <Reveal>
        <MatrixOverview />
      </Reveal>

      <div className="skills-toggle-row">
        <button
          type="button"
          className="skills-toggle-btn"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Ocultar detalhamento" : "Ver detalhamento completo"}
          <span className={`skills-toggle-chevron ${expanded ? "is-open" : ""}`}>▾</span>
        </button>
      </div>

      <div className={`skills-expand-wrap ${expanded ? "is-expanded" : ""}`}>
        <div className="skills-expand-inner">
          <div className="skills-detail-grid">
            {DETAIL.map((group, i) => (
              <Reveal key={group.group} delay={(i % 2) * 90}>
                <SkillGroupCard group={group} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
