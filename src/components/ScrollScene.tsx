import { useEffect, useRef, useState } from "react";

interface ScrollSceneProps {
  id?: string;
  src: string;
  poster: string;
  eyebrow?: string;
  captions: string[];
  /** height of the scroll track, in viewport heights */
  track?: number;
}

export default function ScrollScene({
  id,
  src,
  poster,
  eyebrow,
  captions,
  track = 2.6,
}: ScrollSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let duration = 0;

    const readMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      video.pause();
      update();
    };

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;

      if (duration) {
        const t = progress * (duration - 0.05);
        if (Math.abs(video.currentTime - t) > 0.03) {
          try {
            video.currentTime = t;
          } catch {
            /* seeking not ready yet */
          }
        }
      }
      setIdx(
        Math.min(captions.length - 1, Math.floor(progress * captions.length))
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    video.addEventListener("loadedmetadata", readMeta);
    if (video.readyState >= 1) readMeta();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      video.removeEventListener("loadedmetadata", readMeta);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [captions]);

  return (
    <section
      id={id}
      className="scroll-scene"
      ref={wrapRef}
      style={{ height: `${track * 100}vh` }}
    >
      <div className="scroll-scene-sticky">
        <video
          ref={videoRef}
          className="scroll-scene-video"
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />
        <div className="scroll-scene-overlay">
          {eyebrow && <span className="scroll-scene-eyebrow">{eyebrow}</span>}
          <div className="scroll-scene-caps">
            {captions.map((c, i) => (
              <p
                key={c}
                className={`scroll-scene-cap ${i === idx ? "is-on" : ""}`}
              >
                {c}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
