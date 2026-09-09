import Reveal from "./Reveal";

const GROUPS = [
  {
    group: "Pesquisa & descoberta",
    items: [
      "Entrevistas e pesquisa com usuários",
      "Mapas de jornada e blueprints de serviço",
      "Personas e proto-personas",
      "Auditoria heurística e benchmark",
    ],
  },
  {
    group: "Definição & arquitetura",
    items: [
      "Síntese de pesquisa e insights",
      "Arquitetura de informação",
      "Fluxos e priorização de escopo",
      "Design de conteúdo",
    ],
  },
  {
    group: "Ideação & prototipação",
    items: [
      "Sketching e wireframes",
      "Protótipos de alta fidelidade (Figma)",
      "Design systems e tokens",
      "Testes de usabilidade",
    ],
  },
  {
    group: "Entrega em código",
    items: [
      "HTML semântico, CSS moderno, React / TypeScript",
      "Componentização e acessibilidade (WCAG)",
      "Automação de fluxos com agentes de IA (n8n)",
      "Analytics, SEO técnico e performance",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <span className="eyebrow">Competências</span>
        <h2 className="heading-xl">
          O que eu faço em cada <span className="gradient-text">etapa</span>.
        </h2>
        <p className="lede">
          Da conversa inicial com quem vai usar o produto até o código em produção
          — as ferramentas e métodos que sustentam cada fase do trabalho.
        </p>
      </Reveal>

      <div className="skill-groups">
        {GROUPS.map((g, i) => (
          <Reveal key={g.group} delay={(i % 2) * 80}>
            <div className="skill-group">
              <h3 className="skill-group-title">{g.group}</h3>
              <ul className="skill-list">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
