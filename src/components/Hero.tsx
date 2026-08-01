import { useTypewriter } from "../hooks/useTypewriter";
import Reveal from "./Reveal";
import OrbitSystem from "./OrbitSystem";
import ScrollHint from "./ScrollHint";

const WHATSAPP_URL = "https://wa.me/5521997836113";

const TAGLINES = [
  "Engenharia de Interfaces. Automação com Propósito.",
  "Design Systems que Escalam.",
  "Pixel-Perfect. Sempre.",
];

export default function Hero() {
  const typed = useTypewriter(TAGLINES);

  return (
    <section id="home" className="section hero">
      <OrbitSystem />
      <Reveal>
        <span className="pill">
          <span className="pill-dot" />
          DISPONÍVEL PARA PROJETOS · 15+ ANOS DE EXPERIÊNCIA
        </span>

        <h1 className="hero-name" style={{ marginTop: 28 }}>
          Anderson Alessandri
        </h1>

        <p className="hero-role">
          Design Engineer · AI-Driven UI Architect · Front-End Specialist
        </p>

        <h2 className="hero-tagline gradient-text">
          {typed}
          <span className="cursor-blink" />
        </h2>

        <p className="lede">
          Especialista em interface e engenharia front-end com mais de 15 anos de atuação,
          na ponte entre Design (UI/UX), Engenharia de Software e Infraestrutura Cloud —
          arquitetando Design Systems, componentização flexível e automação de fluxos com
          agentes de IA, sempre com aderência estética pixel-perfect, acessibilidade e
          performance.
        </p>

        <div className="hero-stats">
          <div>
            <div className="stat-label">Experiência</div>
            <div className="stat-value">15+ Anos</div>
          </div>
          <div>
            <div className="stat-label">Foco</div>
            <div className="stat-value">AI-Driven UI Architect</div>
          </div>
          <div>
            <div className="stat-label">Stack</div>
            <div className="stat-value">Front-End + IA</div>
          </div>
          <div>
            <div className="stat-label">Base</div>
            <div className="stat-value">Rio de Janeiro, RJ</div>
          </div>
        </div>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            Ver Projetos →
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            Falar no WhatsApp
          </a>
        </div>
      </Reveal>
      <ScrollHint />
    </section>
  );
}
