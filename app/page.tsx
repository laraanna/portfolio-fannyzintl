import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects-db";

export default function Home() {
  const projects = getAllProjects();
  const recentWork = projects.filter((p) => p.status === "recent-work");
  const inProgress = projects.filter((p) => p.status === "in-progress");

  return (
    <main className="mx-auto w-[95%] px-3 py-6">
    <h1 className="text-4xl font-bold mb-6">I build and grow brands.</h1>
    <h2 className="text-3xl font-semibold mb-6">Recent work</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {recentWork.map((p) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug.replace(/^project-/, "")}`}
          className="group block"
        >
          {p.cover && (
            <Image
              src={p.cover}
              alt={p.title}
              width={1600}
              height={900}
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="rounded-2xl"
              priority={false}
            />
          )}
          <div className="mt-2 text-sm text-neutral-500">
            {p.category}
          </div>
          <h3 className="text-lg font-medium group-hover:underline">
            {p.title}
          </h3>
        </Link>
      ))}
    </div>

    {inProgress.length > 0 && (
      <>
        <h2 className="text-2xl font-semibold mb-6">In progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgress.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group block"
            >
              {p.cover && (
                <Image
                  src={p.cover}
                  alt={p.title}
                  width={1600}
                  height={900}
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="rounded-2xl"
                  priority={false}
                />
              )}
              <div className="mt-2 text-sm text-neutral-500">
                {p.category}
              </div>
              <h3 className="text-lg font-medium group-hover:underline">
                {p.title}
              </h3>
            </Link>
          ))}
        </div>
      </>
    )}
  </main>
  );
}
