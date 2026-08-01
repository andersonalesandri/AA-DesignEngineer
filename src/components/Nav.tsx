import { useEffect, useState } from "react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "identity", label: "Identidade" },
  { id: "workflow", label: "Workflow" },
  { id: "projects", label: "Projetos" },
  { id: "skills", label: "Skills" },
  { id: "lab", label: "Lab" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = [...LINKS.map((l) => l.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="nav-wrap">
      <nav className="nav">
        <a href="#home" className="nav-logo">
          <span className="nav-dot" />
          AA – Design Engineer
        </a>
        <span className="nav-sep" />

        <div className="nav-links">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${active === link.id ? "active" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="nav-link nav-cta">
            Contato
          </a>
        </div>

        <button
          type="button"
          className="nav-menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
        >
          <span className="nav-menu-label">MENU</span>
          <span className={`nav-burger ${menuOpen ? "is-open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      <div className={`nav-dropdown ${menuOpen ? "is-open" : ""}`}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`nav-dropdown-link ${active === link.id ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav-dropdown-link nav-dropdown-cta"
          onClick={() => setMenuOpen(false)}
        >
          Contato
        </a>
      </div>
    </div>
  );
}
