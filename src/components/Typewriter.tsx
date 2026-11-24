"use client";

import { useEffect, useState } from "react";

// Types each phrase, pauses, deletes it, and moves on. Shows the first phrase
// statically for screen readers, no-JS visitors and reduced-motion users.
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState(phrases[0]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (phrases.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
    let i = 0;
    let len = phrases[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (deleting) {
        len--;
        if (len === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
        }
      } else {
        len++;
      }
      setText(phrases[i].slice(0, len));
      let delay = deleting ? 40 : 80;
      if (!deleting && len === phrases[i].length) {
        deleting = true;
        delay = 2200;
      }
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 2500);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden>
        {text}
        {animate && <span className="caret ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-0.5 bg-current" />}
      </span>
    </>
  );
}
