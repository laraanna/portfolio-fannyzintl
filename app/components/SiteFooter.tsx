"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith("/projects/") ?? false;

  const amsterdamTime = useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Amsterdam",
    }).format(new Date());
  }, []);

  return (
    <footer className="border-t border-neutral-200 mt-16">
      <div className="mx-auto max-w-6xl p-6 flex items-center justify-between text-sm text-neutral-600">
        <div>
          {isProjectPage
            ? "Thanks for stopping by."
            : `It's ${amsterdamTime} where I live in Amsterdam.`}
        </div>
        <div>© 2025 FANNY ZINTL</div>
      </div>
    </footer>
  );
}


