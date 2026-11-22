import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Services } from "@/components/sections/Services";
import { Philosophy, Process, Team } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProjectsShowcase featured />
        <Services />
        <Philosophy />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}