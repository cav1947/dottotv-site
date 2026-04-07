"use client";

import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = "" }: Props) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 200px 0px",
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`transition-transform duration-500 ${
        inView ? "translate-y-0" : "translate-y-3"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
