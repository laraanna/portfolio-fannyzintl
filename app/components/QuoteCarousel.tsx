"use client";

import { useState } from "react";

type Quote = {
  text: string;
  name: string;
  company: string;
};

const quotes: Quote[] = [
  {
    text: "\"Fanny is a gift to work with as a founder. She inherently understands brand and can deliver what AI can't.\"",
    name: "THOMAS MALOLEPSZY",
    company: "FOUNDER - SHADES by Eric Kuster",
  },
  {
    text: "\"Sharp and analytical. Fanny delivers a rare strategic clarity and turns that into clear direction that teams can work from.\"",
    name: "IVAN G",
    company: "OWNER - PINARELLO, Q36.5"
  },
  {
    text: "\"Fanny has a rare ability to connect brand, marketing and performance in a way that translates directly into revenue.\"",
    name: "JAN JELLE DE BOER",
    company: "SVP - S4 CAPITAL",
  }
];

export default function QuoteCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, quotes.length - 1)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      goTo(activeIndex + (delta > 0 ? 1 : -1));
    }
    setTouchStartX(null);
  };

  return (
    <div className="flex flex-col md:flex-row  gap-4 md:gap-12 w-full">
      <h2 className="text-sm 2xl:text-xl mb-1 md:mb-0 font-iowan italic shrink-0">
        Selected words:
      </h2>

      <div className="w-full md:flex-1 min-w-0">
        <div
          className="md:hidden w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {quotes.map((quote, index) => (
              <blockquote
                key={index}
                className="w-full shrink-0 font-iowan italic text-sm"
              >
                <div className="text-[rgba(209,209,209,1)] text-6xl font-iowan leading-none">&ldquo;</div>
                <div className="not-italic font-iowan text-l max-w-[80%] pb-6 -mt-5">{quote.text}</div>
                <div className="not-italic font-inter text-xs font-medium">{quote.name}</div>
                <div className="not-italic font-inter text-xs font-light">{quote.company}</div>
              </blockquote>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {quotes.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to quote ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => goTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  activeIndex === index ? "bg-neutral-900" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-row gap-12 lg:gap-10 w-full ">
          {quotes.map((quote, index) => (
            <blockquote
              key={index}
              className="font-iowan italic text-left text-sm lg:text-base 2xl:text-xl h-full flex flex-col items-start"
            >
              <div className="text-[rgba(209,209,209,1)] m-b-0.5 font-iowan text-5xl leading-[0.2]">&ldquo;</div>
              <div className="not-italic font-iowan text-xs max-w-[70%] pb-3">{quote.text}</div>
              <div className="not-italic font-inter text-xxs font-medium">{quote.name}</div>
              <div className="not-italic font-inter text-xxs font-light">{quote.company}</div>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}
