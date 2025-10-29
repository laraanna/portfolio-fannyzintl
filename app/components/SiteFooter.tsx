"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith("/projects/") ?? false;

  const [amsterdamTime, setAmsterdamTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setAmsterdamTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Amsterdam",
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 30000); // 30s
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-neutral-200 mt-16">
      <div className="mx-auto w-[95%] p-6 flex items-center justify-between text-sm text-neutral-600">
        <div suppressHydrationWarning>
          {isProjectPage
            ? "Thanks for stopping by."
            : amsterdamTime
            ? `It's ${amsterdamTime} where I live in Amsterdam.`
            : ""}
        </div>
        <div>© 2025 FANNY ZINTL</div>
      </div>
    </footer>
  );
}


