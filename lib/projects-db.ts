// /lib/projects-db.ts
// - Define strong types
// - Centralize project metadata (name, categories, cover, year, etc.)
// - Optionally auto-read images from /public/projects/<slug>/ at build time

import fs from "fs";
import path from "path";

// ────────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────────
export type Category =
  | "brand-system"
  | "marketing-engine"
  | "growth-framework"
  | "positioning"
  | "brand-strategy"
  | "gtm-strategy"
  | "content-strategy"
  | "brand-campaign"
  | "venture-strategy";


  export type Status =
  | "recent-work"
  | "in-progress";


export type Project = {
  slug: string; // must match folder in /public/projects/<slug>
  title: string; 
  brand: string;
  status: Status; 
  role: string;
  hiredBy?: string;
  client?: string;
  collaborator?: string;
  season?: string;
  togetherWith?: string;
  stage?: string;
  category: Category;
  // Optional ordering if you want manual sort on listing pages
  sort?: number;

  // Images
  // If you set `gallery`, it will be used as-is.
  // If you leave `gallery` undefined, we'll auto-scan the folder (hero + numbered images)
  cover?: string; // relative to /public (e.g. "/projects/<slug>/hero.jpg")
  gallery?: string[]; // relative to /public
  // Layout for gallery images
  layout?: {
    columns: string[]; // e.g. ["1fr", "1fr", "1fr"] or ["2fr", "1fr", "2fr"]
    rows: string[];    // e.g. ["auto", "200px", "auto"]
    gap: number;
    images: Array<{
      src: string;
      gridArea: string; // e.g. "1 / 2 / 3 / 4" (row-start / col-start / row-end / col-end)
      absolute?: boolean; // centers image absolutely within grid area
      wFull?: boolean; // applies w-full class (default true)
      hFull?: boolean; // applies h-full class (default true)
      padding?: string; // CSS padding value (e.g. "10px", "1rem 2rem")
    }>;
  };
  // Extra fields as needed
  description?: string[];
  tags?: string[];
};

// ────────────────────────────────────────────────────────────────────────────────
// Config
// ────────────────────────────────────────────────────────────────────────────────
const PUBLIC_DIR = path.join(process.cwd(), "public");
const PROJECTS_DIR = path.join(PUBLIC_DIR, "projects");

// Helper: safe list of image extensions we care about
const IMG_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif"]);

// Auto-scan a project's folder and return a sorted gallery list.
// Priority order: hero.* first (if present), then 01.*, 02.*, ..., then others by name.
export function scanProjectImages(slug: string): string[] {
  const dir = path.join(PROJECTS_DIR, slug);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => IMG_EXTS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  // Move hero.* to the front if present
  const heroIdx = files.findIndex((f) => /^hero\./i.test(f));
  if (heroIdx > -1) {
    const [hero] = files.splice(heroIdx, 1);
    files.unshift(hero);
  }

  return files.map((f) => `/projects/${slug}/${f}`);
}

// Ensure a cover is present; prefer hero.* if available else first image.
export function resolveCover(slug: string, explicit?: string, gallery?: string[]) {
  if (explicit) return explicit;
  const g = gallery && gallery.length ? gallery : scanProjectImages(slug);
  return g[0];
}

// ────────────────────────────────────────────────────────────────────────────────
// Data: define your projects here
// Note: `slug` must match your folder under /public/projects/<slug>
// You chose to keep the brand dot inside the slug (e.g. q36.5). That's OK.
// ────────────────────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    slug: "q36.5-brand",
    title: "Q36.5 — Brand Systems",
    brand: "Q36.5",
    status: "recent-work",
    category: "brand-system",
    role: "Head of Brand & Strategy",
    collaborator: "Marc Vermeeren",
    client: "Q36.5",
    description: [
      "As Head of Strategy I led Q36.5's strategic transformation by spearheading a full rebrand under the ethos of Innovation for Human Performance. We redefined the brand from the inside out: product design, e-commerce, packaging, typography and visual identity were all rebuilt around the idea of Q36.5 as a research laboratory, not just a cycling apparel company.",
      "The narrative was rooted in the brand's DNA: Quaerere (research) and 36.5 (the optimal human body temperature). From this foundation we created a brand story where every product amplifies human potential: seeing gear as performance technology, not just clothing.",
      "The result was an aligned brand, product and marketing strategy that fueled global visibility and delivered 200% year-on-year growth."
    ],
    gallery: [
      "/projects/q36.5-brand/q36.5-brand-1.jpg",
      "https://vimeo.com/1121475738g",
      "/projects/q36.5-brand/q36.5-brand-3.jpg",
      "/projects/q36.5-brand/q36.5-brand-4.jpg",
      "/projects/q36.5-brand/q36.5-brand-5.jpg",
      "/projects/q36.5-brand/q36.5-brand-6.jpg",
      "/projects/q36.5-brand/q36.5-brand-7.jpg",
      "https://vimeo.com/1126161422",
      "/projects/q36.5-brand/q36.5-brand-9.jpg",
      "/projects/q36.5-brand/q36.5-brand-10.jpg",
      "/projects/q36.5-brand/q36.5-brand-11.jpg",
      "/projects/q36.5-brand/q36.5-brand-12.jpg",
      "/projects/q36.5-brand/q36.5-brand-13.jpg",
      "/projects/q36.5-brand/q36.5-brand-14.jpg",
      "https://vimeo.com/1129332458",
      "/projects/q36.5-brand/q36.5-brand-16.jpg",
    ],
    layout: {
      columns: ["1fr", "1fr"],
      rows: ["auto"],
      gap: 0,
      images: [
        { src: "/projects/q36.5-brand/q36.5-brand-1.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "https://vimeo.com/1121475738g", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-3.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-4.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-5.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-6.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-7.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "https://vimeo.com/1126161422", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-9.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-10.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-11.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-12.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-13.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-14.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "https://vimeo.com/1129332458", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/q36.5-brand/q36.5-brand-16.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
      ],
    },
  },
  {
    slug: "bmw",
    title: "BMW - Marketing Engine",
    brand: "BMW",
    status: "recent-work",
    category: "marketing-engine",
    role: "Strategy Director",
    hiredBy: ".Monks",
    client: "BMW",
    description: [
      "In 2020 BMW Group awarded .Monks the lead for its pan-European marketing across BMW and MINI.",
      "I was part of the strategy taskforce that designed the operating model behind the account: a high-performance marketing engine combining creativity, data, media and consulting. It powered campaigns like BMW i4 Edge Electrified, MINIWOOD virtual production, and the award-winning Lil Miquela Make it Real campaign, showing that scale and creativity can live side by side."
    ],
    cover: "/projects/bmw/bmw-2.jpg",
    gallery: [
      "https://vimeo.com/1128840100",
      "/projects/bmw/bmw-2.jpg",
      "/projects/bmw/bmw-3.jpg",
      "/projects/bmw/bmw-4.jpg",
      "/projects/bmw/bmw-5.jpg",
      "/projects/bmw/bmw-6.jpg",
      "/projects/bmw/bmw-7.mp4",
      "/projects/bmw/bmw-8.mp4",
      "/projects/bmw/bmw-9.mp4",
      "https://vimeo.com/1128970837",
    ],
    layout: {
      columns: ["1fr", "1fr"],
      rows: ["auto"],
      gap: 0,
      images: [
        { src: "https://vimeo.com/1128840100", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/bmw/bmw-2.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/bmw/bmw-3.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/bmw/bmw-4.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/bmw/bmw-5.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/bmw/bmw-6.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/bmw/bmw-7.mp4", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/bmw/bmw-8.mp4", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/bmw/bmw-9.mp4", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "https://vimeo.com/1128970837", gridArea: "1 / 1 / auto / span 2", wFull: true },
      ],
    },
  },
  {
    slug: "q36.5-growth",
    title: "Q36.5 - Growth Operating Model",
    brand: "Q36.5",
    status: "recent-work",
    category: "growth-framework",
    role: "Head of Brand & Strategy",
    collaborator: "Don van Diest",
    client: "Q36.5",
    description: [
      "To fuel Q36.5's global growth, I designed a streamlined and data-driven operating system that connects insights across every consumer touchpoint. The Scale-Up Model evaluates and optimizes marketing efforts in real time, turning data into actions that directly impact growth.",
      "At its core is a continuous test-and-learn framework: from creative hooks and formats to media investment, every decision is measured, refined and scaled. By finding the sweet spot between brand positioning and visual language, the system ensures each campaign stays true to Q36.5's identity while driving measurable performance.",
      "Results: <br />Revenue grew +187% YOY after deployment in 2022<br />Tripled total revenue in 2 years with half the marketing budget<br />Built an autonomous growth framework that sustains continuous scaling<br />Established an automated creative testing system to identify winning formulas"
    ],
  },
  {
    slug: "district-vision",
    title: "District Vision - Brand Narrative & Positioning",
    brand: "District Vision",
    status: "recent-work",
    category: "positioning",
    role: "Brand Strategy",
    hiredBy: "Max Vallot",
    client: "District Vision",
    description: [
      "During my time at District Vision I helped develop Meditation in Motion, a long-term strategic brand foundation that reframed athleticism through a holistic lens, putting mindfulness at the foundation of physical performance.",
      "Meditation in Motion argues that true high performance isn't just a physical ideal, it begins in the mind. That mental clarity and balance are the foundation on which every stride, every pace, every pedal stroke is built.",
      "By embedding Meditation in Motion deeply into brand strategy, we ensured it wasn't a tagline or campaign. It became the lens through which all creative decisions passed.",
      "It remains the brand's guiding ethos today, shaping every campaign and product story. The recent creative work here is a direct continuation of that foundation, proof of a strategy built to endure and evolve."
    ],
    layout: {
      columns: ["1fr", "1fr", "1fr", "1fr"],
      rows: ["1fr", "1fr", "1fr", "1fr", "auto", "1fr"],
      gap: 0,
      images: [
        { src: "/projects/district-vision/district-vision-1.jpg", gridArea: "1 / 3 / auto / span 2", wFull: true },
        { src: "/projects/district-vision/district-vision-2.jpg", gridArea: "1 / 1 / span 2 / span 2",absolute: true, wFull: true, hFull: false },
        { src: "/projects/district-vision/district-vision-3.jpg", gridArea: "2 / 3 / auto / span 2", wFull: true },
        { src: "/projects/district-vision/district-vision-4.jpg", gridArea: "3 / 1 / 3 / 1", wFull: true, hFull: false },
        { src: "/projects/district-vision/district-vision-5.jpg", gridArea: "3 / 2 / auto / span 2", wFull: true, hFull: false, padding: "60px 0px 5px 50px" },
        { src: "/projects/district-vision/district-vision-6.jpg", gridArea: "4 / 1 / auto / span 2" },
        { src: "/projects/district-vision/district-vision-7.png", gridArea: "5 / 2 / auto / span 3", wFull: true, hFull: false, padding: "0px 200px 0px 30px" },
        { src: "/projects/district-vision/district-vision-8.jpg", gridArea: "6 / 2 / auto / span 2" },
      ],
    },
  },
  {
    slug: "q36.5-pro-team",
    title: "Q36.5 Pro Cycling Team - Brand Strategy & Activation",
    brand: "Q36.5",
    status: "recent-work",
    category: "brand-strategy",
    role: "Head of Brand & Strategy",
    season: "2023 & 2024",
    client: "Q36.5 Pro Cycling Team",
    description: [
      "In 2023, I led the full brand and strategy for Q36.5's entry into pro cycling under the umbrella of #RacingTheFuture. Over two seasons I shaped every aspect: from kit design to identity to year-round communication, hero campaigns, and integrating the team as a living embodiment of the brand vision. ",
      "Under my direction, brand and performance merged. We aligned Q36.5's technical DNA with a compelling narrative that the team isn't just sponsored, it is the brand in action."
    ],
  },
  {
    slug: "beyond-meat",
    title: "Beyond Meat - GTM Strategy",
    brand: "Beyond Meat",
    status: "recent-work",
    category: "gtm-strategy",
    role: "Strategy Lead",
    hiredBy: ".Monks",
    client: "Beyond Meat",
    description: [
      "As digital agency of record for Beyond Meat in the US and Europe, we expanded on the brand's core idea of Going Beyond. While the business had initially focused on B2B growth, in mid 2020 we defined a distinct B2C approach that could scale globally while resonating locally.",
      "I led the social first content strategy that built a coherent and impactful global presence, tailored to cultural nuances in key markets. This work brought plant based food from shelves to dinner plates in Germany, the UK and the Netherlands, establishing Beyond Meat not just as a product but as a thought leader in the plant-based movement."
    ],
    cover: "/projects/beyond-meat/beyond-meat-2.jpg",

    layout: {
      columns: ["1fr", "1fr", "1fr", "1fr"],
      rows: ["1fr", "1fr", "1fr", "1fr", "auto", "1fr"],
      gap: 0,
      images: [
        { src: "/projects/beyond-meat/beyond-meat-1.mp4", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/beyond-meat/beyond-meat-2.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/beyond-meat/beyond-meat-3.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/beyond-meat/beyond-meat-4.mp4", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/beyond-meat/beyond-meat-5.mp4", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/beyond-meat/beyond-meat-6.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "/projects/beyond-meat/beyond-meat-7.jpg", gridArea: "1 / 1 / auto / span 2", wFull: true },
      ],
    },
  },
  {
    slug: "netflix",
    title: "Netflix The Witcher - Content Strategy",
    brand: "Netflix",
    status: "recent-work",
    category: "content-strategy",
    role: "Strategy Lead",
    hiredBy: ".Monks",
    client: "Netflix",
    description: [
      "Netflix wanted to expand its breakout series The Witcher beyond hardcore fantasy fans to reach casual viewers. Leading strategy, I identified that the show's non-linear timeline was was losing this audience rather than hooking them. So instead of simplifying the content, I positioned an interactive map as a post-viewing tool that let viewers reconstruct the story chronologically and explore the mythology on their own terms.",
      "The Witcher: Map of the Continent brought together a world of information in a single space, and helped fans understand complex timelines and events, revealing connections they might have otherwise missed.",
      "By giving newcomers a tool to confidently navigate the mythology on their own terms, we turned confusion into curiosity and made the show's world accessible to a broader fanbase, winning multiple awards along the way."
    ],
  },
  {
    slug: "booking.com",
    title: "Booking.com - Brand Campaign",
    brand: "Booking.com",
    status: "recent-work",
    category: "brand-campaign",
    role: "Strategy Lead",
    hiredBy: ".Monks",
    client: "Booking.com",
    description: [
      "Booking.com asked us to create their first global employer brand campaign, built around the idea of 'Expand Horizons'.",
      "As strategic lead, I shaped the campaign framework, building a modular system that could flex across audiences while staying anchored in one story. Working with employees across three continents, we surfaced insider humor and cultural nuances that revealed Booking's trademark diversity and sense of community: from a programmer’s debugging rubber duck to customer service anecdotes, every detail made the brand feel human, relatable, and globally connected.",
      "The result was a campaign that turned employee experience into the strongest proof point of the employer brand, inspiring recruits by showing that working at Booking.com is itself a horizon-expanding experience."
    ],
    cover: "/projects/booking.com/booking.com-3.jpg",
    gallery: [
      "https://vimeo.com/656141775",
      "https://vimeo.com/656143017",
      "/projects/booking.com/booking.com-3.jpg",
    ]
  },
  {
    slug: "n26",
    title: "N26 - Content Strategy",
    brand: "N26",
    status: "recent-work",
    category: "content strategy",
    role: "Strategy Lead",
    hiredBy: ".Monks",
    client: "N26",
    description: [
      "In a crowded fintech market, N26 needed to stand out by making finance feel approachable and relevant. Many of their audiences struggled with jargon and saw money as a barrier rather than a tool.",
      "I built a YouTube-first content strategy that reframed finances as a tool to achieve goals, then used audience insights, trending searches and behavioral data to shape talking tracks that cut through jargon and addressed real frustrations.",
      "Through a smart production model with weekly shoots in a branded studio, N26 reached an average of 280k views per video and positioned itself as a leading voice in the finance conversation on YouTube."
    ],
    cover: "/projects/beyond-meat/beyond-meat-2.jpg",
    gallery: [
      "https://www.youtube.com/watch?v=TSJyetG4SBU",
      "https://www.youtube.com/watch?v=AXYlnyCUETU",
      "https://www.youtube.com/watch?v=b_7M1byjEbE",
    ],
    layout: {
      columns: ["1fr", "1fr", "1fr", "1fr"],
      rows: ["1fr", "1fr", "1fr", "1fr", "auto", "1fr"],
      gap: 0,
      images: [
        { src: "https://www.youtube.com/watch?v=TSJyetG4SBU", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "https://www.youtube.com/watch?v=AXYlnyCUETU", gridArea: "1 / 1 / auto / span 2", wFull: true },
        { src: "https://www.youtube.com/watch?v=b_7M1byjEbE", gridArea: "1 / 1 / auto / span 2", wFull: true },
      ],
    },
  },
  {
    slug: "naviya",
    title: "Naviya - Venture Strategy",
    brand: "Naviya",
    status: "in-progress",
    category: "venture-strategy",
    role: "Founding Team",
    togetherWith: "Marc Vermeeren",
    stage: "Pre Seed",
    description: [
      "Naviya is an AI powered intelligence platform that turns company data and market signals into a daily feed of insights. It is the first BI tool built for everyone, giving each team the right information in clear, human language in under five minutes a day.",
      "I lead the product vision and insight architecture, defining how AI and strategy frameworks work together to deliver insights that are relevant, actionable and easy to understand. My focus is on transforming today’s data overload into clarity, creating a product that helps people stay informed without searching, scrolling through dashboards or sitting in meetings."
    ],
  },
 
 
];

// ────────────────────────────────────────────────────────────────────────────────
// Access helpers
// ────────────────────────────────────────────────────────────────────────────────
export function getAllProjects() {
  return projects
    .map((p) => {
      const gallery = p.gallery ?? scanProjectImages(p.slug);
      const cover = resolveCover(p.slug, p.cover, gallery);
      return { ...p, cover, gallery };
    })
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

export function getProjectBySlug(slug: string) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  const gallery = p.gallery ?? scanProjectImages(p.slug);
  const cover = resolveCover(p.slug, p.cover, gallery);
  return { ...p, cover, gallery };
}

