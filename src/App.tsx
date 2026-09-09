import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ScrollScene from "./components/ScrollScene";
import About from "./components/About";
import CommandCenter from "./components/CommandCenter";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Laboratory from "./components/Laboratory";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <ScrollScene
          id="processo"
          src="/media/scrub-process.mp4"
          poster="/media/scrub-process.jpg"
          eyebrow="O processo, quadro a quadro"
          track={2.2}
          captions={[
            "Todo projeto começa numa mesa vazia.",
            "Pesquisa — ouço quem vai usar antes de desenhar.",
            "Definição — o problema fica nítido.",
            "Só então a interface aparece.",
          ]}
        />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <CommandCenter />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Laboratory />
        <div className="section-divider" />
        <Contact />
      </main>

      <footer className="footer">
        <div className="footer-name">
          Anderson Alessandri — Designer de Interface &amp; Design Engineer
        </div>
        <div className="footer-sub">Rio de Janeiro · 2026</div>
      </footer>
    </div>
  );
}
