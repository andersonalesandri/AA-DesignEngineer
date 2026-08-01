import { useEffect, useState } from "react";

interface Options {
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useTypewriter(phrases: string[], options: Options = {}) {
  const { typingSpeed = 55, deletingSpeed = 28, pause = 1800 } = options;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(prefersReducedMotion() ? phrases[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const current = phrases[index % phrases.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      timeout = window.setTimeout(
        () => setText(next),
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pause]);

  return text;
}
