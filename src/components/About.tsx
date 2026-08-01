import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    icon: "◆",
    color: "#4f7bff",
    title: "Pixel-Perfect Fidelity",
    desc: "Acompanho o ciclo completo do produto visual, garantindo alinhamento técnico exato entre o layout e o código final exposto ao usuário.",
  },
  {
    icon: "⬡",
    color: "#9b6bff",
    title: "Design Systems First",
    desc: "Arquitetura de tokens de design, bibliotecas de componentes reutilizáveis e prototipação de alta fidelidade para a web.",
  },
  {
    icon: "▲",
    color: "#f5a623",
    title: "Automação com IA",
    desc: "Orquestração de agentes de IA em nuvem para acelerar entregas, com engenharia de prompt e contexto aplicada ao código.",
  },
  {
    icon: "●",
    color: "#35d68e",
    title: "Performance & Acessibilidade",
    desc: "Código limpo, responsivo e semântico, com foco em WCAG, SEO técnico e carregamento otimizado.",
  },
];

const TIMELINE = [
  {
    year: "2018 — Presente",
    role: "Design Engineer & Estrategista Digital",
    org: "Freelancer / Consultor",
    color: "#4f7bff",
    bullets: [
      "Arquitetura de interfaces web: landing pages e aplicações focadas em alta conversão, responsividade e performance.",
      "Design Systems em nuvem: tokens de design e bibliotecas de componentes orquestrados via infraestrutura cloud e agentes de IA.",
      "Automação de engenharia e marketing: integração de plataformas de captura e CRM via n8n e webhooks, com rastreamento GTM/GA4.",
      "Performance & SEO técnico para maximizar resultados orgânicos e pagos.",
    ],
  },
  {
    year: "2010 — 2018",
    role: "Web Designer & Especialista em Interface Digital",
    org: "Atuação em Design Visual e Front-End",
    color: "#9b6bff",
    bullets: [
      "Identidades visuais, peças gráficas complexas e vetorização com a suíte Adobe (Photoshop, Illustrator).",
      "Front-end e animação interativa com HTML, CSS, JavaScript, ActionScript (Flash) e ASPX.",
      "Garantia de fidelidade visual pixel-perfect entre layouts e o código final.",
    ],
  },
];

export default function About() {
  return (
    <section id="identity" className="section">
      <Reveal>
        <span className="eyebrow">// IDENTITY.PROFILE</span>
        <h2 className="heading-xl">
          A Engenharia
          <br />
          <span className="gradient-text">por trás do Design.</span>
        </h2>
        <p className="lede">
          Não fico só na entrega visual. Desenho a arquitetura de como a interface se
          comporta — como os componentes se relacionam, onde vive a lógica de automação
          e como o sistema evolui com o produto.
        </p>
      </Reveal>

      <div className="about-layout">
        <div className="grid-2-col-gap">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="card">
                <div
                  className="principle-icon"
                  style={{ color: p.color, background: `${p.color}1a`, border: `1px solid ${p.color}40` }}
                >
                  {p.icon}
                </div>
                <div className="principle-title">{p.title}</div>
                <div className="principle-desc">{p.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="timeline-label">Trajetória Profissional</div>
          <div className="timeline">
            {TIMELINE.map((item) => (
              <div key={item.year} className="timeline-item">
                <span className="timeline-dot" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                <div className="timeline-year" style={{ color: item.color }}>
                  {item.year}
                </div>
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-org">{item.org}</div>
                <div className="timeline-desc">
                  {item.bullets.map((b) => (
                    <div key={b} style={{ marginBottom: 8 }}>
                      <span style={{ color: "#ef5da8" }}>·</span> {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
