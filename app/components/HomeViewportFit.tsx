"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 0.72;
const DESKTOP_MQ = "(min-width: 768px)";

type Layout = {
  scale: number;
  height: number;
};

export default function HomeViewportFit({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>({ scale: 1, height: 0 });

  const updateScale = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const isDesktop = window.matchMedia(DESKTOP_MQ).matches;
    if (!isDesktop) {
      setLayout({ scale: 1, height: 0 });
      return;
    }

    content.style.transform = "none";
    content.style.width = "100%";

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const headerH = header?.getBoundingClientRect().height ?? 0;
    const footerH = footer?.getBoundingClientRect().height ?? 0;
    const availableH = window.innerHeight - headerH - footerH;
    const availableW = container.clientWidth;

    const naturalH = content.scrollHeight;
    const naturalW = content.scrollWidth;

    if (naturalH <= 0 || availableH <= 0) return;

    const scaleH = availableH / naturalH;
    const scaleW = availableW / naturalW;
    const nextScale = Math.min(1, scaleH, scaleW);
    const clampedScale = Math.max(MIN_SCALE, nextScale);

    setLayout({
      scale: clampedScale,
      height: naturalH * clampedScale,
    });
  }, []);

  useEffect(() => {
    updateScale();

    const ro = new ResizeObserver(updateScale);
    if (contentRef.current) ro.observe(contentRef.current);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [updateScale]);

  const { scale, height } = layout;
  const isScaled = scale < 1;

  return (
    <div
      ref={containerRef}
      className="w-full flex-1 min-h-0 flex flex-col justify-center overflow-y-auto md:overflow-visible"
    >
      <div
        className="mx-auto w-full"
        style={isScaled ? { height } : undefined}
      >
        <div
          ref={contentRef}
          className="w-full"
          style={
            isScaled
              ? {
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  width: `${100 / scale}%`,
                  marginInline: "auto",
                }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
