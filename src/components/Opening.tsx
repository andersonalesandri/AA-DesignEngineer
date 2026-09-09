import { useEffect, useRef, useState } from "react";

const EMAIL = "anderson_alessandri@hotmail.com";

const CAPS = [
  "Todo projeto começa numa mesa vazia.",
  "Pesquisa — ouço quem vai usar antes de desenhar.",
  "Definição — o problema fica nítido.",
  "Ideação — as opções ganham forma.",
  "Só então a interface aparece.",
];

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

export default function Opening() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let duration = 0;

    const readMeta = () => {
      duration = Number.isFinite(video?.duration ?? NaN) ? video!.duration : 0;
      video?.pause();
      tick();
    };

    const tick = () => {
      raf = 0;
      const rect = stage.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const prog = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
      setP(prog);

      if (video && duration) {
        const vp = clamp((prog - 0.13) / 0.75);
        const t = vp * (duration - 0.05);
        if (Math.abs(video.currentTime - t) > 0.03) {
          try {
            video.currentTime = t;
          } catch {
            /* not seekable yet */
          }
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    if (video) {
      video.addEventListener("loadedmetadata", readMeta);
      if (video.readyState >= 1) readMeta();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();

    return () => {
      video?.removeEventListener("loadedmetadata", readMeta);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const heroOut = clamp(p / 0.15);
  const filmIn = clamp((p - 0.1) / 0.13);
  const filmOut = clamp((p - 0.9) / 0.1);
  const filmOpacity = filmIn * (1 - filmOut) * 0.62;
  const capIdx = clamp(
    Math.floor(((p - 0.15) / 0.78) * CAPS.length),
    0,
    CAPS.length - 1
  );
  const capsOpacity = clamp((p - 0.15) / 0.07) * (1 - filmOut);

  return (
    <section id="home" className="opening" ref={stageRef}>
      <div className="opening-stage">
        <div className="opening-paper" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="none" poster="/media/hero-texture.jpg">
            <source src="/media/hero-texture.webm" type="video/webm" />
            <source src="/media/hero-texture.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="opening-film" aria-hidden="true" style={{ opacity: filmOpacity }}>
          <video
            ref={videoRef}
            src="/media/scrub-process.mp4"
            poster="/media/scrub-process.jpg"
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
          />
        </div>

        <div
          className="opening-hero"
          style={{
            opacity: 1 - heroOut,
            transform: `translateY(${heroOut * -34}px)`,
            pointerEvents: heroOut > 0.5 ? "none" : "auto",
          }}
        >
          <span className="eyebrow">Designer de Interface · Rio de Janeiro</span>
          <h1 className="hero-name">Anderson Alessandri</h1>
          <p className="hero-statement">
            Desenho interfaces <span className="em">e o processo</span> que leva
            até elas.
          </p>
          <p className="lede hero-lede">
            Há 12 anos na ponte entre design de produto e engenharia front-end.
            Trabalho a jornada inteira — da pesquisa à entrega — e mostro cada
            decisão pelo caminho.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Ver o processo
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn-link">
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="opening-caps" style={{ opacity: capsOpacity }}>
          {CAPS.map((c, i) => (
            <p key={c} className={`opening-cap ${i === capIdx ? "is-on" : ""}`}>
              {c}
            </p>
          ))}
        </div>

        <div className="opening-cue" style={{ opacity: 1 - clamp(p / 0.05) }} aria-hidden="true">
          role
        </div>
      </div>
    </section>
  );
}
