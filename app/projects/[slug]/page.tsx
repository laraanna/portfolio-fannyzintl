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
    <main className="mx-auto w-[95%] px-16
     pt-11 pb-6">
     
      <div className="mb-10 md:max-w-[50%]">
        <h1 className="text-2xl md:text-2xl lg:text-2_5xl xl:text-3xl" style={{ wordBreak: 'break-word' }}>
          {project.title.split(' - ').map((part, index) => (
            <span 
              key={index} 
              className={index > 0 ? "sm:not-italic italic" : ""}
              style={{ fontFamily: 'var(--font-iowan), serif' }}
            >
              {index > 0 && <><br className="sm:hidden" /> </>}
              {part}
            </span>
          ))}
        </h1>
      </div>



      {project.description && project.description.length > 0 && (
        <div className="prose prose-neutral max-w-none mb-10 md:max-w-[50%]">
          {project.description.map((paragraph, idx) => (
            <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
          ))}
        </div>
      )}

<div className="mt-2 mb-10 text-sm space-y-1 font-inter-light">
           {project.role && <div>Role ············· {project.role}</div>}
           {project.hiredBy && <div>Hired by ············· {project.hiredBy}</div>}
           {project.client && <div>Client ············· {project.client}</div>}
           {project.collaborator && <div>Collaborator ············· {project.collaborator}</div>}
           {project.togetherWith && <div>Together with ············· {project.togetherWith}</div>}
           {project.season && <div>Season ············· {project.season}</div>}
           {project.stage && <div>Stage ············· {project.stage}</div>}
         </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {project.layout ? (
            <div 
              className="project-gallery grid gap-4"
              style={{
                gridTemplateColumns: project.layout.columns.join(' '),
                gridTemplateRows: project.layout.rows.join(' '),
                gap: `${project.layout.gap}px`
              } as React.CSSProperties}
            >
              {project.layout.images.map((image, idx) => {
                const lower = image.src.toLowerCase();
                const isVimeo = lower.includes("vimeo.com");
                const isFileVideo =
                  lower.endsWith(".mp4") ||
                  lower.endsWith(".webm") ||
                  lower.endsWith(".mov") ||
                  lower.endsWith(".m4v");

                return (
                  <div 
                    key={image.src + idx}
                    className={`project-gallery-item w-full ${image.absolute ? 'relative' : ''}`}
                    style={{
                      gridArea: image.gridArea,
                      padding: image.padding || '30px'
                    } as React.CSSProperties}
                  >
                    {isVimeo ? (
                      <div className="w-full h-full" style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                        <iframe
                          src={image.src.includes("player.vimeo.com") ? image.src : image.src.replace("vimeo.com/", "player.vimeo.com/video/")}
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={`${project.title} — Video ${idx + 1}`}
                          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                        />
                      </div>
                    ) : isFileVideo ? (
                      <video
                        className={`${image.wFull !== false ? 'w-full' : ''} ${image.hFull !== false ? 'h-full' : ''} object-cover`}
                        src={image.src}
                        controls
                        playsInline
                      />
                    ) : (
                      <Image
                        src={image.src}
                        alt={`${project.title} — Image ${idx + 1}`}
                        width={1600}
                        height={900}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`${image.wFull !== false ? 'w-full' : ''} ${image.hFull !== false ? 'h-full' : ''} object-cover`}
                        style={image.absolute ? { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } : {}}
                        priority={idx === 0}
                        loading={idx === 0 ? "eager" : undefined}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            project.gallery.map((src, idx) => {
              const lower = src.toLowerCase();
              const isVimeo = lower.includes("vimeo.com");
              const isFileVideo =
                lower.endsWith(".mp4") ||
                lower.endsWith(".webm") ||
                lower.endsWith(".mov") ||
                lower.endsWith(".m4v");

              return (
                <div key={src + idx}>
                  {isVimeo ? (
                    <div className="w-full" style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                      <iframe
                        src={src.includes("player.vimeo.com") ? src : src.replace("vimeo.com/", "player.vimeo.com/video/")}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`${project.title} — Video ${idx + 1}`}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                      />
                    </div>
                  ) : isFileVideo ? (
                    <video
                      className="w-full h-auto"
                      src={src}
                      controls
                      playsInline
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={`${project.title} — Image ${idx + 1}`}
                      width={1600}
                      height={900}
                      sizes="100vw"
                      className="w-full h-auto"
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : undefined}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </main>
  );
}


