import Link from "next/link";

const footerNavigation = {
  Explore: [
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Services: [
    { name: "Residential Design", href: "/services#residential" },
    { name: "Commercial Design", href: "/services#commercial" },
    { name: "Hospitality", href: "/services#hospitality" },
    { name: "Consultation", href: "/services#consultation" },
  ],
  Studio: [
    { name: "Philosophy", href: "/about#philosophy" },
    { name: "Process", href: "/about#process" },
    { name: "Team", href: "/about#team" },
    { name: "Press", href: "/about#press" },
  ],
  Connect: [
    { name: "Instagram", href: "https://instagram.com/dezen.contraststudio", external: true },
    { name: "WhatsApp", href: "https://wa.me/919666055462", external: true },
    { name: "Email", href: "mailto:Dezencontraststudio@gmail.com", external: true },
  ],
};

const studioAddress = "Plot No. 63, 402, Road No. 5, Ayyappa Society, Madhapur, Hyderabad, Telangana, India 500081";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-3xl font-medium tracking-tight mb-6 block"
              aria-label="Dezen Contrast Studio Home"
            >
              Dezen Contrast Studio
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-8 max-w-xs">
              Architectural interiors defined by material tension, spatial balance, and intentional contrast.
            </p>
            <address className="not-italic text-background/50 text-sm leading-relaxed mb-8 max-w-xs">
              {studioAddress}
            </address>
            <div className="flex gap-6">
              {footerNavigation.Connect.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-background/50 hover:text-background transition-colors text-sm"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.name}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-6">Explore</h3>
            <ul className="space-y-3" role="list">
              {footerNavigation.Explore.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-background/60 hover:text-background transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-6">Services</h3>
            <ul className="space-y-3" role="list">
              {footerNavigation.Services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-background/60 hover:text-background transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-6">Studio</h3>
            <ul className="space-y-3" role="list">
              {footerNavigation.Studio.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-background/60 hover:text-background transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-sm">
            &copy; 2026 Dezen Contrast Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-background/40">
            <Link
              href="/privacy"
              className="hover:text-background transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-background transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}