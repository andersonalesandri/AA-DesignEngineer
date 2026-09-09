import { useEffect, useState } from "react";

const LINKS = [
  { id: "processo", label: "Processo" },
  { id: "projects", label: "Projetos" },
  { id: "identity", label: "Quem faz" },
  { id: "lab", label: "Lab" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);

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

  // invert the nav over dark bands — the bar is fixed, sections scroll under it
  useEffect(() => {
    const darks = Array.from(
      document.querySelectorAll<HTMLElement>(".tone-dark")
    );
    let raf = 0;
    const check = () => {
      raf = 0;
      const probe = 30; // a little below the top edge, where the bar sits
      const over = darks.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      setOnDark(over);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`nav-wrap ${onDark ? "on-dark" : ""}`}>
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
