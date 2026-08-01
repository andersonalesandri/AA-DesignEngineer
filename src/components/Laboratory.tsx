import Reveal from "./Reveal";
import { useInView } from "../hooks/useInView";

const LAB_ITEMS = [
  {
    icon: "🎨",
    status: "EM ANDAMENTO",
    statusColor: "#35d68e",
    title: "Aprofundamento em UX/UI Design & Arquitetura de Informação",
    progressColor: "#4f7bff",
    progress: 70,
    tags: ["UX/UI", "Arquitetura de Informação"],
  },
  {
    icon: "🧩",
    status: "EM ANDAMENTO",
    statusColor: "#35d68e",
    title: "Desenvolvimento Front-End & Arquitetura de Componentes Web",
    progressColor: "#9b6bff",
    progress: 75,
    tags: ["Front-End", "Componentes Web"],
  },
  {
    icon: "🤖",
    status: "ATIVO",
    statusColor: "#f5a623",
    title: "Treinamentos e Certificações em Cloud & Automação com Agentes de IA",
    progressColor: "#f5a623",
    progress: 60,
    tags: ["Cloud", "Agentes de IA", "Automação"],
  },
];

function LabCard({ item }: { item: (typeof LAB_ITEMS)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="card">
      <div className="lab-head">
        <span className="lab-status" style={{ color: item.statusColor }}>
          {item.status}
        </span>
      </div>
      <div className="lab-icon">{item.icon}</div>
      <div className="lab-title">{item.title}</div>
      <div className="lab-progress-track">
        <div
          className="lab-progress-fill"
          style={{ width: inView ? `${item.progress}%` : "0%", background: item.progressColor }}
        />
      </div>
      <div className="lab-tags">
        {item.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Laboratory() {
  return (
    <section id="lab" className="section">
      <Reveal>
        <span className="eyebrow">// LAB.APRENDIZADO_CONTÍNUO</span>
        <h2 className="heading-xl">
          Sempre explorando.
          <br />
          <span className="gradient-text">Nunca parando de evoluir.</span>
        </h2>
        <p className="lede">
          Formação e aperfeiçoamento contínuo — as frentes de estudo que mantenho
          ativas em paralelo aos projetos.
        </p>
      </Reveal>

      <div className="lab-grid">
        {LAB_ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 90}>
            <LabCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
