"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInScrollProps {
  children: React.ReactNode;
  delay?: number;
}

export default function FadeInScroll({ children, delay = 0 }: FadeInScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in-animate ${isVisible ? "visible" : ""}`}>
      {children}
    </div>
  );
}

