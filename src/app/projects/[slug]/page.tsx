import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { getProject, getFeaturedProjects } from "@/lib/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — Dezen Contrast Studio`,
      description: project.description,
      images: project.images[0] ? [{ url: project.images[0], width: 1200, height: 800 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.images[0] ? [project.images[0]] : [],
    },
  };
}

import { getAllProjects } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 2);

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="pt-20">
          <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end">
            <div className="absolute inset-0 z-0">
              <Image
                src={project.images[0]}
                alt={`${project.title} - ${project.category} project in ${project.location}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            </div>

            <Container className="relative z-10 pb-16 md:pb-24">
              <div className="max-w-4xl">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors mb-6"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  All Projects
                </Link>

                <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest bg-accent/20 text-accent rounded-full mb-6">
                  {project.category}
                </span>

                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-background mb-4">
                  {project.title}
                </h1>

                <div className="flex flex-wrap gap-6 md:gap-8 text-background/70">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-background/50 mb-1">Location</p>
                    <p className="font-medium">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-background/50 mb-1">Year</p>
                    <p className="font-medium">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-background/50 mb-1">Area</p>
                    <p className="font-medium">{project.area}</p>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section className="py-20 md:py-28">
            <Container>
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-16">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                      Project Overview
                    </h2>
                    <div className="prose prose-foreground max-w-none">
                      <p className="text-lg text-foreground/70 leading-relaxed mb-6">{project.longDescription}</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                      Project Gallery
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.images.slice(1).map((image, index) => (
                        <div key={index} className="relative aspect-[4/5] rounded-xl overflow-hidden">
                          <Image
                            src={image}
                            alt={`${project.title} - Gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="bg-card border border-border rounded-2xl p-8 sticky top-28">
                    <h3 className="font-display text-xl font-medium text-foreground mb-6">
                      Materials & Finishes
                    </h3>
                    <ul className="space-y-3" role="list">
                      {project.materials.map((material) => (
                        <li key={material} className="flex items-center gap-3 text-foreground/70">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" aria-hidden="true" />
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-8 sticky top-28">
                    <h3 className="font-display text-xl font-medium text-foreground mb-6">
                      Services Provided
                    </h3>
                    <ul className="space-y-3" role="list">
                      {project.services.map((service) => (
                        <li key={service} className="flex items-center gap-3 text-foreground/70">
                          <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="block sticky top-28"
                  >
                    <Button variant="secondary" className="w-full" size="lg">
                      Inquire About Similar Project
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>

          {relatedProjects.length > 0 && (
            <section className="py-20 md:py-28 bg-foreground/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" aria-hidden="true" />
              <Container>
                <div className="text-center mb-16">
                  <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
                    Related Work
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground">
                    More {project.category} Projects
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {relatedProjects.map((relatedProject, index) => (
                    <Link
                      key={relatedProject.slug}
                      href={`/projects/${relatedProject.slug}`}
                      className="group relative aspect-[4/5] rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <Image
                        src={relatedProject.images[0]}
                        alt={`${relatedProject.title} - ${relatedProject.category} project`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-xs uppercase tracking-widest text-background/70 mb-1">{relatedProject.category}</p>
                        <h3 className="font-display text-xl font-medium text-background">{relatedProject.title}</h3>
                        <p className="text-sm text-background/70 mt-1">{relatedProject.location}, {relatedProject.year}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Link href="/projects" className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors px-6 py-3 border border-border rounded-full hover:border-accent/50">
                    View All Projects
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </Container>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}