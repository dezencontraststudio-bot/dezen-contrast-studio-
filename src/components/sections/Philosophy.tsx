"use client";

import { motion } from "framer-motion";
import { philosophy } from "@/data/philosophy";
import { Container } from "@/components/ui/Container";

export function Philosophy() {
  return (
    <section className="py-24 md:py-32">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
            Our Philosophy
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
            Design Principles That
            <br />
            <span className="font-medium">Guide Every Decision</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophy.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group p-8 bg-card border border-border rounded-2xl hover:border-accent/50 transition-all duration-300"
            >
              <h3 className="font-display text-xl font-medium text-foreground mb-4 group-hover:text-accent transition-colors">
                {pillar.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">{pillar.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-foreground/2 relative overflow-hidden">
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
            Our Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
            From Conversation to
            <br />
            <span className="font-medium">Completion</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2 hidden md:block" aria-hidden="true" />

          <div className="space-y-16 md:space-y-20">
            {philosophy.process.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } items-start gap-8`}
              >
                <div
                  className={`relative flex-shrink-0 w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12"
                  }`}
                >
                  <div className="relative z-10">
                    <span className="text-accent font-mono text-lg font-medium">
                      {step.number}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground mt-2 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                  </div>
                  <div
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent border-4 border-background rounded-full z-20 hidden md:block"
                    aria-hidden="true"
                  />
                </div>

                <div
                  className={`relative flex-shrink-0 w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                  }`}
                >
                  <div
                    className="aspect-[4/3] bg-muted/30 rounded-xl overflow-hidden relative"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 border border-border rounded-full flex items-center justify-center bg-background/50">
                          <svg
                            className="w-7 h-7 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-foreground/50 font-medium">Process Visualization</p>
                        <p className="text-sm text-foreground/40 mt-1">
                          {step.title} phase imagery
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="py-24 md:py-32">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
            The Studio
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
            The Hands Behind
            <br />
            <span className="font-medium">The Work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophy.team.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="aspect-[3/4] bg-muted/30 rounded-xl overflow-hidden relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 border border-border rounded-full flex items-center justify-center bg-background/50">
                      <svg
                        className="w-8 h-8 text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <p className="text-foreground/50 font-medium text-sm">Team Portrait</p>
                  </div>
                </div>
              </div>
              <h3 className="font-display text-lg font-medium text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-accent text-sm font-medium mb-4">{member.role}</p>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}