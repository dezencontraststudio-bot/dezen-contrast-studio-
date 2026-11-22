import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Dezen Contrast Studio about your architectural interior design project.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-accent/5" />
          <Container>
            <div className="text-center max-w-3xl">
              <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
                Get In Touch
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-6">
                Let&apos;s Begin a
                <br />
                <span className="font-medium">Conversation</span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Every project starts with a dialogue. Tell us about your space, your aspirations, and the challenges you face.
              </p>
            </div>
          </Container>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}