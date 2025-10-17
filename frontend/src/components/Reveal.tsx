"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;        // translation Y initiale
  delayMs?: number;  // délai d'apparition
};

export default function Reveal({ children, className = "", y = 16, delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShow(true), delayMs);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className={
        `${className} transition-all duration-700 will-change-transform ` +
        (show ? "opacity-100 translate-y-0" : `opacity-0 translate-y-[${y}px]`)
      }
    >
      {children}
    </div>
  );
}
