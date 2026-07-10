import Link from "next/link";
import QuoteCarousel from "@/app/components/QuoteCarousel";
import { getAllProjects, Project } from "@/lib/projects-db";

function ProjectLink({ project }: { project: Project }) {
  const keepHyphenated: Record<string, string> = {
    "scale-up-model": "Scale-Up Model",
  };
  const formattedCategory =
  keepHyphenated[project.category] ??
  project.category
    .split("-")
    .map((part) => (part.toLowerCase() === "gtm" ? "GTM" : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
  
  return (
    <Link
      key={project.slug}
      href={`/projects/${project.slug.replace(/^project-/, "")}`}
      className="group block"
    >
      <div className="mt-2 lg:mt-1 xl:mt-2 text-sm">
        <span className="text-2xl lg:text-base xl:text-xl 2xl:text-5_5xl font-iowan">{project.brand}</span>
        <span className="text-sm lg:text-xxs xl:text-xxs 2xl:text-lg font-inter"> {formattedCategory}</span>
      </div>
    </Link>
  );
}

export default function Home() {
  const projects = getAllProjects();
  const recentWork = projects.filter((p) => p.workStatus === "recent-work");
  const inProgress = projects.filter((p) => p.workStatus === "in-progress");

  return (
    <main className="mx-auto w-[95%] px-3 py-6 pt-[100px] md:pt-0 pb-[80px] md:pb-0 min-h-screen flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
        <div className="flex items-center justify-center">
          <h1 className="text-4_5xl lg:text-5xl xl:text-7xl 2xl:text-8xl my-14 md:my-0 font-iowan">I build and <br /> grow brands.</h1>
        </div>
        <div className="px-6 md:px-0 md:pl-12">
           <h2 className="text-sm  2xl:text-xl mb-1 font-iowan italic">Recent work:</h2>

          <div className="grid grid-cols-1 gap-0 mb-12 lg:mb-4 xl:mb-12">
            {recentWork.map((p) => (
              <ProjectLink key={p.slug} project={p} />
            ))}
          </div>

          {inProgress.length > 0 && (
            <>
               <h2 className="text-sm  2xl:text-xl mb-1 font-iowan italic">In progress:</h2>
              <div className="grid grid-cols-1 gap-0 md:gap-3">
                {inProgress.map((p) => (
                  <ProjectLink key={p.slug} project={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center w-[80%] mt-12 lg:mt-4 xl:mt-12">
        <div className="w-[80vw] pt-8  border-t-[0.4px] border-t-[rgba(113, 113, 113, 0.2)]">
          <QuoteCarousel />
        </div>
      </div>
    </main>
  );
}
