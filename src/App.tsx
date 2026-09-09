import Nav from "./components/Nav";
import Opening from "./components/Opening";
import InterfaceReveal from "./components/InterfaceReveal";
import ProcessBoard from "./components/ProcessBoard";
import Projects from "./components/Projects";
import About from "./components/About";
import Laboratory from "./components/Laboratory";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Opening />
        <InterfaceReveal />
        <div className="section-divider section-divider--dotted" />
        <ProcessBoard />
        <div className="tone-dark tone-tint">
          <Projects />
        </div>
        <div className="tone-dark tone-tint">
          <About />
        </div>
        <div className="tone-dark">
          <Laboratory />
        </div>
        <div className="tone-dark tone-deep">
          <Contact />
        </div>
      </main>

      <div className="tone-dark tone-deep">
        <footer className="footer">
          <div className="footer-name">
            Anderson Alessandri — Designer de Interface &amp; Design Engineer
          </div>
          <div className="footer-sub">Rio de Janeiro · 2026</div>
        </footer>
      </div>
    </div>
  );
}
