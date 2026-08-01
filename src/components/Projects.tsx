// Preencha cada objeto abaixo com um projeto real: troque title, subtitle, description,
// stats e tags. Duplique o bloco para adicionar mais cards.
import Reveal from "./Reveal";

const PROJECTS = [
  {
    icon: "◆",
    color: "#4f7bff",
    title: "Nome do Projeto",
    subtitle: "ex: Landing Page de Alta Conversão",
    description:
      "Descreva aqui o desafio do cliente, a solução de design/front-end que você entregou e o resultado alcançado (conversão, performance, etc.).",
    stats: [
      { value: "—", label: "Métrica 1" },
      { value: "—", label: "Métrica 2" },
      { value: "—", label: "Métrica 3" },
    ],
    tags: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    icon: "⬡",
    color: "#9b6bff",
    title: "Nome do Projeto",
    subtitle: "ex: Design System em Nuvem",
    description:
      "Descreva a arquitetura de tokens e componentes, quantos componentes foram criados e como o sistema escalou entre produtos ou times.",
    stats: [
      { value: "—", label: "Componentes" },
      { value: "—", label: "Tokens" },
      { value: "—", label: "Produtos" },
    ],
    tags: ["Figma", "Design Tokens", "Componentização"],
  },
  {
    icon: "▲",
    color: "#f5a623",
    title: "Nome do Projeto",
    subtitle: "ex: Automação de Marketing com IA",
    description:
      "Descreva o fluxo automatizado (captura, CRM, agentes de IA), quais ferramentas integrou e o ganho operacional obtido.",
    stats: [
      { value: "—", label: "Fluxos" },
      { value: "—", label: "Integrações" },
      { value: "—", label: "Horas/mês" },
    ],
    tags: ["n8n", "Webhooks", "Agentes de IA"],
  },
  {
    icon: "●",
    color: "#35d68e",
    title: "Nome do Projeto",
    subtitle: "ex: Aplicação Web Responsiva",
    description:
      "Descreva a aplicação, o público-alvo, os requisitos de acessibilidade/performance e os resultados de negócio.",
    stats: [
      { value: "—", label: "Performance" },
      { value: "—", label: "Acessibilidade" },
      { value: "—", label: "Usuários" },
    ],
    tags: ["React", "WCAG", "Performance"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <span className="eyebrow">// PROJECTS.PORTFOLIO</span>
        <h2 className="heading-xl">
          Projetos &amp;
          <br />
          <span className="gradient-text">Estudos de Caso.</span>
        </h2>
        <p className="lede projects-intro">
          Espaço reservado para os seus cases. Cada card abaixo é um template —
          substitua pelo nome do projeto, o desafio, a solução e os resultados.
        </p>
      </Reveal>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <Reveal key={i} delay={(i % 2) * 90} className="project-card-reveal">
            <div
              className="card card-placeholder project-card"
              style={
                {
                  "--accent": project.color,
                  "--accent-glow": `${project.color}40`,
                } as React.CSSProperties
              }
            >
              <div className="project-card-head">
                <div
                  className="project-icon"
                  style={{ color: project.color, borderColor: `${project.color}40` }}
                >
                  {project.icon}
                </div>
                <span
                  className="project-status"
                  style={{ color: "#f5a623", borderColor: "#f5a62366", background: "#f5a6231a" }}
                >
                  Editar
                </span>
              </div>

              <div className="project-title">{project.title}</div>
              <div className="project-subtitle">{project.subtitle}</div>
              <p className="project-desc">{project.description}</p>

              <div className="project-stats">
                {project.stats.map((s) => (
                  <div key={s.label} className="project-stat">
                    <div className="project-stat-value" style={{ color: project.color }}>
                      {s.value}
                    </div>
                    <div className="project-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="project-tags">
                {project.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
