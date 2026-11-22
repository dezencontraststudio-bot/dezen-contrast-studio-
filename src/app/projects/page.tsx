import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Container } from "@/components/ui/Container";
import { getAllProjects, getAllCategories } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Dezen Contrast Studio's portfolio of architectural interior design projects across residential, commercial, hospitality, and cultural sectors.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getAllCategories();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-accent/5" />
          <Container>
            <div className="text-center max-w-3xl">
              <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
                Selected Work
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-6">
                Projects That Define
                <br />
                <span className="font-medium">Contrast</span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                A curated collection of architectural interiors where material tension meets spatial harmony.
              </p>
            </div>
          </Container>
        </section>

        <ProjectsShowcase projects={projects} categories={categories} />
      </main>
      <Footer />
    </>
  );
}