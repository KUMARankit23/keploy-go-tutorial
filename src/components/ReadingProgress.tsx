"use client";

import { useEffect, useState } from "react";

/** Thin orange line under the header showing how far down the page the reader is. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent">
      <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${pct}%` }} />
    </div>
  );
}
