// Preencha cada objeto abaixo com um projeto real: troque title, subtitle, description,
// stats e tags. Duplique o bloco para adicionar mais cards.
import Reveal from "./Reveal";

const PROJECTS = [
  {
    icon: "◆",
    color: "#C5973E",
    title: "Christian Vieira — Corretor Imobiliário",
    subtitle: "Site Institucional de Alta Conversão · Rio de Janeiro",
    description:
      "Christian precisava centralizar vários lançamentos imobiliários em um único site que gerasse autoridade e convertesse visitantes em leads qualificados via WhatsApp. Desenvolvi um hero em vídeo com slideshow por lançamento, depoimentos estilizados como conversas de WhatsApp para reforçar prova social, e um design system próprio em tons dourado e navy.",
    stats: [
      { value: "5", label: "Lançamentos" },
      { value: "4", label: "Etapas do Método" },
      { value: "100%", label: "Responsivo" },
    ],
    tags: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
    link: "https://corretordeimovelrj.com.br/",
    status: "No Ar",
    statusColor: "#35d68e",
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
    link: null,
    status: "Editar",
    statusColor: "#f5a623",
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
    link: null,
    status: "Editar",
    statusColor: "#f5a623",
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
    link: null,
    status: "Editar",
    statusColor: "#f5a623",
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
              className={`card project-card ${project.link ? "" : "card-placeholder"}`}
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
                  style={{
                    color: project.statusColor,
                    borderColor: `${project.statusColor}66`,
                    background: `${project.statusColor}1a`,
                  }}
                >
                  {project.status}
                </span>
              </div>

              <div className="project-title">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-title-link">
                    {project.title} ↗
                  </a>
                ) : (
                  project.title
                )}
              </div>
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
