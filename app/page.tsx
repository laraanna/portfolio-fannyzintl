import Link from "next/link";
import { getAllProjects } from "@/lib/projects-db";

export default function Home() {
  const projects = getAllProjects();
  const recentWork = projects.filter((p) => p.status === "recent-work");
  const inProgress = projects.filter((p) => p.status === "in-progress");

  return (
    <main className="mx-auto w-[95%] px-3 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">I build and grow brands.</h1>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6">Recent work</h2>

          <div className="grid grid-cols-1 gap-6 mb-12">
            {recentWork.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug.replace(/^project-/, "")}`}
                className="group block"
              >
                <div className="mt-2 text-sm">
                  <span className="font-medium">{p.brand}</span>
                  <span className="font-medium"> {p.category}</span> 
                </div>
           
              </Link>
            ))}
          </div>

          {inProgress.length > 0 && (
            <>
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6">In progress</h2>
              <div className="grid grid-cols-1 gap-6">
                {inProgress.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group block"
                  >
                     <div className="mt-2 text-sm">
                  <span className="font-medium">{p.brand}</span>
                  <span className="font-medium"> {p.category}</span> 
                </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
