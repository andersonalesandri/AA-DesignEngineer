import Reveal from "./Reveal";

type Ref = { label: string; url?: string };

interface LabItem {
  status: string;
  since: string;
  title: string;
  desc: string;
  quote?: { text: string; author: string; source?: string };
  principle?: { kw: string; text: string; from: string };
  refs: Ref[];
  tags: string[];
}

const LAB_ITEMS: LabItem[] = [
  {
    status: "Em andamento",
    since: "desde 2022",
    title: "Aprofundamento em UX/UI Design & Arquitetura de Informação",
    desc:
      "Estudo sistemático de pesquisa com usuários, heurísticas de usabilidade e arquitetura de informação: como as pessoas constroem modelos mentais, como nomear, agrupar e hierarquizar conteúdo para que encontrem o que procuram, e como sustentar cada decisão com teste de usabilidade em vez de opinião. Base no NN/g, nos clássicos do campo e na formação com Leandro Rezende (UX Unicórnio) e Kácio Felipe (Academy Skills).",
    quote: {
      text: "O bom design é, na verdade, muito mais difícil de perceber do que o design ruim — quando funciona, ele some da nossa frente.",
      author: "Don Norman",
      source: "O Design do Dia a Dia",
    },
    refs: [
      { label: "Leandro Rezende — UX Unicórnio" },
      { label: "Kácio Felipe — Academy Skills" },
      { label: "Nielsen Norman Group", url: "https://www.nngroup.com/" },
      {
        label: "As 10 Heurísticas de Usabilidade de Jakob Nielsen",
        url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
      },
      { label: "“O Design do Dia a Dia” — Don Norman" },
      { label: "“Information Architecture” — Rosenfeld, Morville & Arango (o livro do urso polar)" },
    ],
    tags: ["Pesquisa", "Heurísticas", "Arquitetura de Informação", "Teste de usabilidade"],
  },
  {
    status: "Em andamento",
    since: "desde 2021",
    title: "Front-End & Arquitetura de Componentes Web",
    desc:
      "Composição de componentes, design tokens, tipagem e acessibilidade na prática — construir bibliotecas que o time inteiro usa sem quebrar, com CSS moderno (grid, container queries, cascade layers), React e TypeScript. Fundamentos consolidados na Rocketseat, de Diego Fernandes e Mayk Brito.",
    quote: {
      text: "O poder da Web está na sua universalidade — o acesso por todos, independentemente de deficiência, é um aspecto essencial.",
      author: "Tim Berners-Lee",
      source: "criador da Web · W3C",
    },
    refs: [
      { label: "Rocketseat — Diego Fernandes & Mayk Brito", url: "https://www.rocketseat.com.br/" },
      { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
      { label: "web.dev — Google", url: "https://web.dev/" },
      { label: "“Refactoring UI” — Adam Wathan & Steve Schoger" },
    ],
    principle: {
      kw: "Aprender construindo",
      text: " — projeto real desde o primeiro dia.",
      from: "Rocketseat · Diego Fernandes",
    },
    tags: ["Design tokens", "Componentização", "CSS moderno", "Acessibilidade (WCAG)"],
  },
  {
    status: "Ativo",
    since: "desde 2024",
    title: "Cloud & Automação com Agentes de IA",
    desc:
      "Orquestração de agentes de IA em produção: engenharia de contexto e de prompt, definição de ferramentas e limites, avaliação de saídas e integração com fluxos reais via n8n, webhooks e filas — com deploy, observabilidade e custo sob controle. Formação com Alan Nicolas, na Academia Lendária.",
    quote: {
      text: "A linguagem de programação mais quente hoje é o inglês.",
      author: "Andrej Karpathy",
      source: "pesquisador de IA · ex-OpenAI e Tesla",
    },
    refs: [
      { label: "Alan Nicolas — Academia Lendária", url: "https://www.academialendaria.ai/" },
      {
        label: "Anthropic — Building effective agents",
        url: "https://www.anthropic.com/research/building-effective-agents",
      },
      { label: "Documentação do n8n", url: "https://docs.n8n.io/" },
    ],
    principle: {
      kw: "IA First",
      text: " — começar pelo processo com IA, não pela ferramenta.",
      from: "Alan Nicolas · Academia Lendária",
    },
    tags: ["Context engineering", "Orquestração de agentes", "n8n", "Observabilidade"],
  },
];

export default function Laboratory() {
  return (
    <section id="lab" className="section">
      <Reveal>
        <span className="eyebrow">Em estudo</span>
        <h2 className="heading-xl">
          O que estudo <span className="gradient-text">enquanto entrego</span>.
        </h2>
        <p className="lede">
          Três frentes que mantenho ativas em paralelo aos projetos — cada uma
          ancorada em fontes que confio, do NN/g aos clássicos do campo.
        </p>
      </Reveal>

      <div className="lab-grid">
        {LAB_ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <article className="lab-item">
              <div className="lab-meta">
                <span className="lab-status">{item.status}</span>
                <span className="lab-since">{item.since}</span>
              </div>

              <div className="lab-body">
                <h3 className="lab-title">{item.title}</h3>
                <p className="lab-desc">{item.desc}</p>

                {item.quote && (
                  <blockquote className="lab-quote">
                    “{item.quote.text}”
                    <cite>
                      — {item.quote.author}
                      {item.quote.source ? `, ${item.quote.source}` : ""}
                    </cite>
                  </blockquote>
                )}

                {item.principle && (
                  <div className="lab-principle">
                    <span className="lab-principle-label">Princípio que carrego</span>
                    <p>
                      <b>{item.principle.kw}</b>
                      {item.principle.text}
                    </p>
                    <cite>{item.principle.from}</cite>
                  </div>
                )}

                <div className="lab-refs">
                  <span className="lab-refs-label">Referências</span>
                  <ul>
                    {item.refs.map((r) => (
                      <li key={r.label}>
                        {r.url ? (
                          <a href={r.url} target="_blank" rel="noreferrer">
                            {r.label} ↗
                          </a>
                        ) : (
                          r.label
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lab-tags">
                  {item.tags.map((t) => (
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
