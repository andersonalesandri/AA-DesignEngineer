import Nav from "./components/Nav";
import Opening from "./components/Opening";
import InterfaceReveal from "./components/InterfaceReveal";
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
        <Opening />
        <InterfaceReveal />
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
