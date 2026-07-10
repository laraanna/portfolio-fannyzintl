# Portfolio — design & responsive notes

Quick reference for breakpoints, sizing, and related conventions in this project.

---

## Breakpoints (Tailwind)

Defined in `app/globals.css` → `@theme inline`.

| Prefix   | Width   | Notes |
|----------|---------|-------|
| *(base)* | 0px+    | Mobile / default styles |
| `sm:`    | 640px   | Default Tailwind — barely used in this project |
| `md:`    | 768px   | **Main layout switch** (mobile → desktop). Gallery CSS also flips here. |
| `lg:`    | 1024px  | Default Tailwind — used on some pages |
| `xl:`    | 1280px  | Default Tailwind — used on about + home hero |
| `wide:`  | 1440px  | **Custom** — laptop / medium desktop (`90rem`) |
| `2xl:`   | 1920px  | **Custom** — large artboard target (`120rem`) |

### Typical usage pattern

```
base  →  md  →  wide  →  2xl
mobile    layout   1440px   1920px
```

Example:

```tsx
className="text-5xl wide:text-6xl 2xl:text-7xl"
```

### Where breakpoints are configured

```css
/* app/globals.css */
@theme inline {
  --breakpoint-wide: 90rem;   /* 1440px */
  --breakpoint-2xl: 120rem;   /* 1920px */
}
```

To add or change a breakpoint, edit `@theme inline` in `globals.css`.

---

## Sizing systems (3 layers)

This project mixes three approaches:

### 1. Breakpoint-based (most common)

Fixed sizes at screen widths:

```tsx
className="text-sm 2xl:text-xl"
className="text-4_5xl lg:text-6xl xl:text-7_5xl 2xl:text-8xl"
```

### 2. Fluid utilities (`clamp()`)

Scale smoothly between min/max — no hard breakpoint jump. Defined in `app/globals.css`.

| Class | CSS | Min → Max | Used for |
|-------|-----|-----------|----------|
| `text-fluid-hero` | `clamp(2.25rem, 1.5rem + 3.5vw, 7rem)` | 36px → 112px | Home headline (when applied) |
| `text-fluid-brand` | `clamp(1.25rem, 0.85rem + 1.4vw, 3.375rem)` | 20px → 54px | Project brand names (when applied) |
| `text-fluid-label` | `clamp(0.75rem, 0.65rem + 0.35vw, 1.25rem)` | 12px → 20px | Section labels (when applied) |
| `text-fluid-category` | `clamp(0.75rem, 0.7rem + 0.2vw, 1.125rem)` | 12px → 18px | Project categories (when applied) |
| `gap-fluid-home` | `clamp(1.5rem, 1rem + 2vh, 3rem)` | 24px → 48px | Home grid gap |
| `mt-fluid-home` | `clamp(1.5rem, 1rem + 2vh, 3rem)` | 24px → 48px | Home quote section margin |
| `max-w-fluid-quote` | `clamp(9rem, 53%, 18rem)` | 144px → 288px | Desktop quote text width |
| `max-w-fluid-quote-mobile` | `clamp(11rem, 80%, 22rem)` | 176px → 352px | Mobile quote text width |

Example:

```tsx
className="text-fluid-hero font-iowan"
className="max-w-fluid-quote"
```

---

## Text sizes — full reference

All sizes assume `1rem = 16px`.

### Tailwind defaults (built-in)

| Class | Font size | Line height | Common use in this project |
|-------|-----------|-------------|---------------------------|
| `text-xs` | 12px (0.75rem) | 16px (1rem) | Quote attribution (mobile), nav, footer |
| `text-sm` | 14px (0.875rem) | 20px (1.25rem) | Body copy, labels, project meta |
| `text-base` | 16px (1rem) | 24px (1.5rem) | About pull quote, project descriptions (`md:`) |
| `text-lg` | 18px (1.125rem) | 28px (1.75rem) | Body at `xl:` / `2xl:`, quote names at `2xl:` |
| `text-xl` | 20px (1.25rem) | 28px (1.75rem) | Section labels at `2xl:`, quote text at `2xl:` |
| `text-2xl` | 24px (1.5rem) | 32px (2rem) | Home project brands (base), project titles |
| `text-3xl` | 30px (1.875rem) | 36px (2.25rem) | Header at `md:` |
| `text-4xl` | 36px (2.25rem) | 40px (2.5rem) | About section headings (base) |
| `text-5xl` | 48px (3rem) | 1 | Desktop quote mark, header at `lg:` |
| `text-6xl` | 60px (3.75rem) | 1 | Home hero at `lg:`, mobile quote mark |
| `text-7xl` | 72px (4.5rem) | 1 | Header + quote mark at `2xl:`, about headings |
| `text-8xl` | 96px (6rem) | 1 | Home hero at `2xl:` |

### Custom sizes (defined in `app/globals.css`)

| Class | Font size | Line height | Defined in |
|-------|-----------|-------------|------------|
| `text-xxs` | 10px (0.625rem) | 12px (0.75rem) | `@theme inline` |
| `text-1_5xl` | 22px (1.375rem) | 32px (2rem) | `@utility` |
| `text-2_5xl` | 28px (1.75rem) | 36px (2.25rem) | `@utility` |
| `text-4_5xl` | 44px (2.75rem) | 56px (3.5rem) | `@utility` |
| `text-5_5xl` | 54px (3rem) | 62px (3.8rem) | `@utility` |
| `text-7_5xl` | 72px (4.5rem) | 80px (5rem) | `@utility` |
| `text-8_5xl` | 112px (7rem) | 112px (7rem) | `@utility` |

> **Naming tip:** Underscore sizes (`text-2_5xl`) are custom in-between steps. Standard Tailwind uses no underscore (`text-2xl`).

### Arbitrary / one-off sizes

| Class | Value | Where used |
|-------|-------|------------|
| `text-[0.68rem]` | ~10.9px | About page services list (mobile) |
| `text-sm/4.5` | 14px size, 1.125 line-height | About + project body paragraphs |
| `text-base/5.5` | 16px size, 1.375 line-height | Project descriptions at `md:` |
| `text-lg/6` | 18px size, 1.5 line-height | About body at `xl:` |
| `text-l` | *(not a standard class — likely typo for `text-lg`)* | `QuoteCarousel.tsx` mobile quote |

### Line-height shorthand

Tailwind's `text-sm/4.5` means font-size from `text-sm` + line-height of `4.5` (= `1.125`).

---

## Text sizes by component

Quick map of **what's used where** (current codebase).

### `app/page.tsx` — Home

| Element | Classes |
|---------|---------|
| Hero h1 | `text-4_5xl lg:text-6xl xl:text-7_5xl 2xl:text-8xl` |
| "Recent work" / "In progress" labels | `text-sm 2xl:text-xl` |
| Project brand | `text-2xl lg:text-2_5xl 2xl:text-5_5xl` |
| Project category | `text-sm 2xl:text-lg` |

### `app/components/SiteHeader.tsx`

| Element | Classes |
|---------|---------|
| Logo | `text-2_5xl md:text-3xl lg:text-5xl 2xl:text-7xl` |
| Nav links | `text-xs md:text-sm 2xl:text-xl` |

### `app/components/SiteFooter.tsx`

| Element | Classes |
|---------|---------|
| Footer text | `text-xs 2xl:text-lg` |

### `app/components/QuoteCarousel.tsx`

| Element | Mobile | Desktop (`md+`) |
|---------|--------|-------------------|
| "Selected words" label | `text-sm` | `text-sm 2xl:text-xl` |
| Quote mark `"` | `text-6xl` | `text-5xl 2xl:text-7xl` |
| Quote text | `text-l` *(see note above)* | `text-xs 2xl:text-xl` |
| Name | `text-xs font-medium` | `text-xxs 2xl:text-lg font-medium` |
| Company | `text-xs font-light` | `text-xxs 2xl:text-lg font-light` |

### `app/about/page.tsx`

| Element | Classes |
|---------|---------|
| Section headings | `text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl` |
| Body paragraphs | `text-sm/4.5 xl:text-lg/6 2xl:text-1_5xl` |
| Pull quote | `text-base lg:text-2_5xl` |
| Services list items | `text-[0.68rem] md:text-sm xl:text-xl 2xl:text-2xl` |
| Contact | `text-sm/4.5 xl:text-lg 2xl:text-1_5xl` |

### `app/projects/[slug]/page.tsx`

| Element | Classes |
|---------|---------|
| Project title | `text-2xl md:text-2xl lg:text-2_5xl xl:text-3xl 2xl:text-5xl` |
| Description | `text-sm/4.5 md:text-base/5.5 2xl:text-lg` |
| Meta (role, client…) | `text-sm 2xl:text-lg` |
| Image captions | `text-sm` |

---

## Recommended sizing ladder

When adding new text, follow the project's established steps:

```
Body copy:     text-sm  →  xl:text-lg  →  2xl:text-1_5xl
Labels:        text-sm  →  2xl:text-xl
Display/hero:  text-4_5xl  →  lg:text-6xl  →  xl:text-7_5xl  →  2xl:text-8xl
               (or use text-fluid-hero for smooth scaling)
Large screens: always add a 2xl: step for 1920px artboard
Mid desktop:   use wide: at 1440px where you need a step before 2xl
```

---

### 3. Viewport fit (home page only)

`app/components/HomeViewportFit.tsx` — on `md+`, measures content vs available viewport (minus header/footer) and scales down so the home page fits one screen. Mobile uses scroll instead.

---

## Font utilities

| Class | Font |
|-------|------|
| `font-iowan` | Iowan Old Style (serif) — headlines, quotes |
| `font-inter` | Inter — body UI |
| `font-inter-medium` | Inter 500 |
| `font-inter-light` | Inter 300, tighter letter-spacing |

---

## Layout conventions

- **Page width:** `w-[95%]` with `mx-auto` on most pages
- **Mobile header offset:** `pt-[100px]` on home (fixed header)
- **Mobile footer offset:** `pb-[80px]` on home
- **Desktop header/footer:** fixed on home, about, project pages
- **Project gallery:** custom CSS grid in `globals.css`; mobile stacks at `max-width: 767px`

---

## Project images

- Images live in `public/projects/<folder>/`
- Slug in `lib/projects-db.ts` does **not** have to match folder name if `layout.images` or `gallery` paths are set explicitly
- Auto-scan only works when folder name matches slug (e.g. `public/projects/my-slug/`)
- Gallery renders if `layout.images` **or** `gallery` has items (`app/projects/[slug]/page.tsx`)
- For grid layouts, set `hFull: false` on images unless you need them to fill a fixed-height cell

---

## Useful files

| File | What |
|------|------|
| `app/globals.css` | Breakpoints, fluid utilities, custom text sizes, gallery CSS |
| `app/components/HomeViewportFit.tsx` | Home page viewport scaler |
| `app/components/QuoteCarousel.tsx` | Testimonials carousel |
| `lib/projects-db.ts` | All project content + image layouts |

---

*Last updated: July 2026*
