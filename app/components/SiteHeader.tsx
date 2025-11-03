"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProjectPage = pathname?.startsWith("/projects/") ?? false;
  const isAboutPage = pathname === "/about";

  return (
    <header className={isHomePage || isProjectPage || isAboutPage ? "fixed top-0 left-0 right-0 z-50" : ""}>
      <div className="mx-auto w-[95%] px-3 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2_5xl md:text-3xl lg:text-5xl 2xl:text-7xl italic font-iowan"
        >
          Fanny Zintl
        </Link>
        <nav className="text-xs 2xl:text-xl font-medium md:text-sm">
          <div className="bg-[#F3F3F3] rounded-full px-4 2xl:px-8 py-2 2xl:py-3 flex items-center gap-3">
            <Link href="/about" className="hover:text-neutral-400 px-0.5 2xl:px-1 py-1 2xl:py-1.5 rounded-full">About</Link>
            <Link href="/about#section-services" className="hover:text-neutral-400 px-0.5 2xl:px-1 py-1 2xl:py-1.5 rounded-full">Services</Link>
            <Link href="/about#section-contact" className="hover:text-neutral-400 px-0.5 2xl:px-1 py-1 2xl:py-1.5 rounded-full">Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

