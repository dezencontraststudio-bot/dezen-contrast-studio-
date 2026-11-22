"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services, Service } from "@/data/services";
import { Container } from "@/components/ui/Container";

const serviceIcons: Record<string, React.ReactNode> = {
  home: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12h6v10" />
    </svg>
  ),
  building: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  wine: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.293 9.707a4 4 0 010-5.657l10-10a4 4 0 115.657 5.657l-10 10a4 4 0 01-5.657 0zM17.657 16.343a4 4 0 01-5.657 0l-10-10a4 4 0 115.657-5.657l10 10a4 4 0 010 5.657z" />
    </svg>
  ),
  compass: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export function Services() {
  return (
    <section className="py-24 md:py-32 bg-foreground/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" aria-hidden="true" />
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
            Our Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
            Services Tailored to
            <br />
            <span className="font-medium">Each Project</span>
          </h2>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Four distinct service pathways, each rooted in the same philosophy: contrast creates character.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-20 text-center"
        >
          <Link href="/services">
            <span className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors px-6 py-3 border border-border rounded-full hover:border-accent/50">
              View All Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:border-accent/50 hover:shadow-xl"
    >
      <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
        {serviceIcons[service.icon]}
      </div>

      <h3 className="font-display text-2xl font-medium text-foreground mb-3">
        {service.title}
      </h3>

      <p className="text-foreground/70 leading-relaxed mb-6">{service.shortDescription}</p>

      <ul className="space-y-3 mb-8" role="list">
        {service.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-foreground/60">
            <svg className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
        {service.features.length > 4 && (
          <li className="text-sm text-accent font-medium flex items-center gap-2">
            +{service.features.length - 4} more
          </li>
        )}
      </ul>

      <Link
        href={`/services#${service.slug}`}
        className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-dark transition-colors text-sm"
      >
        Learn more
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.article>
  );
}