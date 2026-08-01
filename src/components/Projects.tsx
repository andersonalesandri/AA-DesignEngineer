// Adicione novos objetos a este array para criar mais cards de projeto.
import Reveal from "./Reveal";

const PROJECTS = [
  {
    icon: "◆",
    color: "#da7756",
    title: "IA na Prática",
    subtitle: "Imersão ao Vivo de Automação com IA",
    description:
      "Landing page de uma imersão presencial ao vivo de 2 dias para empreendedores, profissionais de marketing e iniciantes em IA sem experiência técnica. Ensina automação de conteúdo e criação de projetos reais usando Claude e Claude Code, do primeiro prompt ao repositório versionado no GitHub.",
    stats: [
      { value: "2", label: "Dias de Imersão" },
      { value: "8", label: "Blocos Práticos" },
      { value: "14h", label: "Carga Horária" },
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Claude Code"],
    link: "https://ianapratica-three.vercel.app/",
    status: "No Ar (Projeto em Andamento)",
    statusColor: "#35d68e",
  },
  {
    icon: "⬡",
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
          Projetos reais que arquitetei e coloquei no ar — do desafio à solução entregue.
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
