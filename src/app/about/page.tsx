import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Philosophy, Process, Team } from "@/components/sections/Philosophy";
import { Container } from "@/components/ui/Container";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Dezen Contrast Studio's design philosophy, process, and the team behind the work.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-accent/5" />
          <Container>
            <div className="text-center max-w-3xl">
              <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
                The Studio
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-6">
                Design Principles
                <br />
                <span className="font-medium">That Guide Us</span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Six pillars. One philosophy. Every project begins with contrast.
              </p>
            </div>
          </Container>
        </section>

        <Philosophy />
        <Process />
        <Team />

        <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" aria-hidden="true" />
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
                Join the Studio
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-background mb-6">
                We&apos;re Always Looking
                <br />
                <span className="font-medium">For Talent</span>
              </h2>
              <p className="text-background/70 text-lg leading-relaxed">
                Designers, architects, and makers who believe in material honesty and intentional contrast.
              </p>
            </div>
            <div className="text-center">
              <a href="/contact" className="inline-flex items-center gap-2 text-background font-medium hover:text-accent transition-colors px-8 py-4 border border-border rounded-full hover:border-accent/50">
                View Opportunities
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </Container>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}