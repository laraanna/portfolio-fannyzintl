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
          className="text-2xl md:text-3xl lg:text-4xl italic font-iowan"
        >
          Fanny Zintl
        </Link>
        <nav className="text-xs font-medium md:text-sm lg:text-base">
          <div className="bg-[#F3F3F3] rounded-full px-3 py-1 flex items-center gap-3">
            <Link href="/about" className="hover:underline px-1 py-0.5 rounded-full">About</Link>
            <Link href="/about#section-services" className="hover:underline px-1 py-0.5 rounded-full">Services</Link>
            <Link href="/about#section-contact" className="hover:underline px-1 py-0.5 rounded-full">Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

