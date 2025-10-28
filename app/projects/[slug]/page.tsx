import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects-db";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug.replace(/^project-/, "") }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const resolvedSlug = projects.find((p) => p.slug.replace(/^project-/, "") === slug)?.slug;
  const project = resolvedSlug ? getProjectBySlug(resolvedSlug) : null;
  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <div className="text-sm text-neutral-500 mb-2">{project.category}</div>
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <div className="mt-2 text-sm text-neutral-600 space-x-3">
          {project.role && <span>{project.role}</span>}
          {project.hiredBy && <span>· Hired by {project.hiredBy}</span>}
          {project.client && <span>· Client {project.client}</span>}
          {project.collaborator && <span>· With {project.collaborator}</span>}
          {project.togetherWith && <span>· Together with {project.togetherWith}</span>}
          {project.season && <span>· {project.season}</span>}
          {project.stage && <span>· {project.stage}</span>}
        </div>
      </div>

      {project.cover && (
        <div className="mb-10">
          <Image
            src={project.cover}
            alt={project.title}
            width={1600}
            height={900}
            sizes="100vw"
            className="rounded-2xl w-full h-auto"
            priority={false}
          />
        </div>
      )}

      {project.description && project.description.length > 0 && (
        <div className="prose prose-neutral max-w-none mb-10">
          {project.description.map((paragraph, idx) => (
            <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {project.gallery.map((src, idx) => (
            <div key={src + idx}>
              <Image
                src={src}
                alt={`${project.title} — ${idx === 0 ? "Hero" : `Image ${idx + 1}`}`}
                width={1600}
                height={900}
                sizes="100vw"
                className="rounded-2xl w-full h-auto"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


