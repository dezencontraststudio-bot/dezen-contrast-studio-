"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 50) {
      newErrors.message = "Please provide more details (at least 50 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" aria-hidden="true" />
      <Container size="xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="pr-12"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-background mb-8">
              Let&apos;s Begin a
              <br />
              <span className="font-medium">Conversation</span>
            </h2>
            <p className="text-background/70 text-lg leading-relaxed mb-12 max-w-xl">
              Every project starts with a dialogue. Tell us about your space, your aspirations, and the challenges you face. We&apos;ll respond within two business days to discuss how we might work together.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-background">Email</p>
                  <a href="mailto:Dezencontraststudio@gmail.com" className="text-background/70 hover:text-accent transition-colors">
                    Dezencontraststudio@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-background">Phone</p>
                  <a href="tel:+919666055462" className="text-background/70 hover:text-accent transition-colors">
                    +91 96660 55462
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-background">Studio</p>
                  <address className="not-italic text-background/70 leading-relaxed">
                    Plot No. 63, 402, Road No. 5,<br />
                    Ayyappa Society, Madhapur,<br />
                    Hyderabad, Telangana, India 500081
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-background">WhatsApp</p>
                  <a href="https://wa.me/919666055462" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-accent transition-colors">
                    +91 96660 55462
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-background">Instagram</p>
                  <a href="https://instagram.com/dezen.contraststudio" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-accent transition-colors">
                    @dezen.contraststudio
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-background">Typical Response</p>
                  <p className="text-background/70">Within 2 Business Days</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10" noValidate>
              <AnimatePresence mode="wait">
                {submitStatus === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-8 p-6 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="font-medium">Thank you for reaching out. We&apos;ll be in touch within two business days.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-8 p-6 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="font-medium">Something went wrong. Please try again or email us directly.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-background/80 mb-2">
                    Full Name <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${
                      errors.name ? "border-red-500/50 focus:ring-red-500" : "border-border hover:border-foreground/30"
                    }`}
                    placeholder="Your name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-background/80 mb-2">
                    Email Address <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${
                      errors.email ? "border-red-500/50 focus:ring-red-500" : "border-border hover:border-foreground/30"
                    }`}
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-background/80 mb-2">
                    Project Type <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none bg-no-repeat bg-right pr-10 ${
                      errors.projectType ? "border-red-500/50 focus:ring-red-500" : "border-border hover:border-foreground/30"
                    }`}
                    aria-invalid={errors.projectType ? "true" : "false"}
                    aria-describedby={errors.projectType ? "projectType-error" : undefined}
                    disabled={isSubmitting}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a3a3a3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.5rem",
                    }}
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential Design</option>
                    <option value="commercial">Commercial / Workplace</option>
                    <option value="hospitality">Hospitality / Retail</option>
                    <option value="consultation">Design Consultation</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.projectType && (
                    <p id="projectType-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-background/80 mb-2">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none bg-no-repeat bg-right pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a3a3a3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.5rem",
                    }}
                    disabled={isSubmitting}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-100k">Under $100K</option>
                    <option value="100k-250k">$100K - $250K</option>
                    <option value="250k-500k">$250K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-plus">$1M+</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-background/80 mb-2">
                    Desired Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none bg-no-repeat bg-right pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a3a3a3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.5rem",
                    }}
                    disabled={isSubmitting}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="3-6-months">3-6 Months</option>
                    <option value="6-12-months">6-12 Months</option>
                    <option value="12-months-plus">12+ Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-background/80 mb-2">
                  Project Details <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-y min-h-[140px] ${
                    errors.message ? "border-red-500/50 focus:ring-red-500" : "border-border hover:border-foreground/30"
                  }`}
                  placeholder="Tell us about your project: location, scope, vision, challenges, inspiration..."
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : "message-hint"}
                  disabled={isSubmitting}
                />
                {errors.message ? (
                  <p id="message-error" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.message}
                  </p>
                ) : (
                  <p id="message-hint" className="mt-1.5 text-sm text-background/40">
                    Minimum 50 characters — the more detail, the better we can prepare for our conversation.
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting} disabled={isSubmitting || submitStatus === "success"}>
                {submitStatus === "success" ? "Message Sent" : "Send Inquiry"}
              </Button>

              <p className="mt-4 text-center text-sm text-background/40">
                By submitting, you agree to our <a href="/privacy" className="underline hover:text-accent transition-colors">Privacy Policy</a>.
              </p>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}