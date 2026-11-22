import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Services } from "@/components/sections/Services";
import { Container } from "@/components/ui/Container";
import { services, Service } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our architectural interior design services: residential, commercial, hospitality, and design consultation.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-accent/5" />
          <Container>
            <div className="text-center max-w-3xl">
              <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
                Our Expertise
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-6">
                Services Tailored to
                <br />
                <span className="font-medium">Each Project</span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Four distinct service pathways, each rooted in the same philosophy: contrast creates character.
              </p>
            </div>
          </Container>
        </section>

        <Services />

        {services.map((service) => (
          <ServiceDetail key={service.slug} service={service} />
        ))}

        <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" aria-hidden="true" />
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
                Ready to Begin
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-background mb-6">
                Let&apos;s Discuss
                <br />
                <span className="font-medium">Your Project</span>
              </h2>
              <p className="text-background/70 text-lg leading-relaxed">
                Every engagement starts with a conversation. No questionnaires, no assumptions — just dialogue about what you're trying to achieve.
              </p>
            </div>
            <div className="text-center">
              <a href="/contact" className="inline-flex items-center gap-2 text-background font-medium hover:text-accent transition-colors px-8 py-4 border border-border rounded-full hover:border-accent/50">
                Start a Conversation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ServiceDetail({ service }: { service: Service }) {
  return (
    <section id={service.slug} className="py-24 md:py-32">
      <Container size="xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="sticky top-28">
            <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
              {service.title}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-8">
              {service.longDescription.split(".")[0]}.{" "}
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-12">
              {service.longDescription.split(".").slice(1).join(".").trim()}
            </p>

            <div className="space-y-6">
              <h3 className="font-display text-xl font-medium text-foreground">What We Deliver</h3>
              <ul className="space-y-4" role="list">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-8">
                Our Process
              </h3>
              <div className="space-y-8">
                {service.process.map((step, index) => (
                  <div key={step.step} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <span className="font-mono text-lg font-medium text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">{step.step}</h4>
                      <p className="text-foreground/70">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {service.relatedProjects.length > 0 && (
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-8">
                  Related Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.relatedProjects.map((slug) => {
                    const project = services.flatMap((s) => s.relatedProjects).includes(slug)
                      ? services.find((s) => s.relatedProjects.includes(slug))
                      : undefined;
                    // We'll need to import projects here, but for now just show the slug
                    return (
                      <div key={slug} className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
                        <p className="text-xs uppercase tracking-widest text-muted mb-2">{service.title}</p>
                        <h4 className="font-display text-lg font-medium text-foreground capitalize">{slug.replace(/-/g, " ")}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}