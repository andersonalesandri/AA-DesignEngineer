// Cada projeto é contado como uma jornada: contexto → pesquisa → definição →
// ideação → construção → resultado. Adicione novos objetos ao array PROJECTS.
import Reveal from "./Reveal";

type Step = { phase: string; note: string };

interface Project {
  title: string;
  subtitle: string;
  year: string;
  role: string;
  status: string;
  link?: string;
  image?: string;
  tags: string[];
  process: Step[];
}

const PROJECTS: Project[] = [
  {
    title: "IA na Prática",
    subtitle: "Landing page da imersão ao vivo · sou o instrutor",
    year: "2026",
    role: "Pesquisa, UX writing, UI e build",
    status: "No ar · em evolução",
    link: "https://ianapratica-three.vercel.app/",
    tags: ["Arquitetura de Informação", "UX Writing", "Design System", "Claude Code"],
    process: [
      {
        phase: "Contexto",
        note: "Imersão de 2 dias para pessoas de marketing sem base técnica montarem seu time de agentes de IA. A página precisa vender o método e servir de prova dele.",
      },
      {
        phase: "Pesquisa",
        note: "Análise de 6 landing pages de cursos concorrentes e leitura das objeções reais que apareceram em conversas de venda anteriores.",
      },
      {
        phase: "Definição",
        note: "Mapa de conteúdo em 8 blocos, do 'por que agora' até a inscrição, priorizado pela ordem em que a dúvida surge na cabeça de quem lê.",
      },
      {
        phase: "Ideação",
        note: "Wireframe de baixa fidelidade focado em leitura rápida no celular, onde está a maior parte do tráfego.",
      },
      {
        phase: "Construção",
        note: "A própria página é a demonstração: montada no Claude Code por 12 agentes especializados (texto, design, estrutura, imagem) sob um agente gerente, do primeiro prompt ao deploy.",
      },
      {
        phase: "Resultado",
        note: "No ar e em ajuste contínuo a cada turma; base de conteúdo reaproveitada para anúncios e e-mail.",
      },
    ],
  },
  {
    title: "Christian Vieira — Corretor Imobiliário",
    subtitle: "Site institucional de alta conversão · Rio de Janeiro",
    year: "2025",
    role: "Discovery, UX, UI e build",
    status: "No ar",
    link: "https://corretordeimovelrj.com.br/",
    tags: ["Discovery", "Fluxo de Conversão", "Design System", "Front-end"],
    process: [
      {
        phase: "Contexto",
        note: "Vários lançamentos imobiliários espalhados em links soltos. Christian precisava de um só endereço que gerasse autoridade e levasse o visitante ao WhatsApp.",
      },
      {
        phase: "Pesquisa",
        note: "Entrevista com o corretor sobre o funil real de atendimento e quais dúvidas travam o lead; leitura das conversas de WhatsApp que mais converteram.",
      },
      {
        phase: "Definição",
        note: "Método de atendimento organizado em 4 etapas claras e um lançamento como unidade de navegação — cada um com sua própria vitrine.",
      },
      {
        phase: "Ideação",
        note: "Hero em vídeo com slideshow por lançamento; depoimentos desenhados como conversa de WhatsApp para reforçar prova social no formato que o público já conhece.",
      },
      {
        phase: "Construção",
        note: "Design system próprio em dourado e navy, aplicado de forma consistente; 100% responsivo, com CTA de WhatsApp sempre ao alcance.",
      },
      {
        phase: "Resultado",
        note: "No ar em corretordeimovelrj.com.br com 5 lançamentos centralizados e um caminho único até o contato.",
      },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <span className="eyebrow">Projetos</span>
        <h2 className="heading-xl">
          A jornada, <span className="gradient-text">não só a tela final</span>.
        </h2>
        <p className="lede projects-intro">
          Cada projeto contado do começo: o problema, o que a pesquisa mostrou, as
          decisões de design e o que ficou no ar.
        </p>
      </Reveal>

      <div className="cases">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} className="case-reveal">
            <article className="case">
              <div className="case-index">{String(i + 1).padStart(2, "0")}</div>

              <div>
                <div className="case-head">
                  <h3 className="case-title">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="case-title-link"
                      >
                        {project.title} ↗
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <span className="case-status">{project.status}</span>
                </div>

                <div className="case-meta">
                  {project.year} · {project.role}
                </div>

                <div className="case-media">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <span className="case-media-label">Prévia em breve</span>
                  )}
                </div>

                <ol className="case-process">
                  {project.process.map((step) => (
                    <li key={step.phase} className="case-step">
                      <div className="case-step-phase">{step.phase}</div>
                      <p className="case-step-note">{step.note}</p>
                    </li>
                  ))}
                </ol>

                <div className="case-tags">
                  {project.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
