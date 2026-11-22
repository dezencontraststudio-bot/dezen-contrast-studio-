export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
  process: { step: string; description: string }[];
  relatedProjects: string[];
}

export const services: Service[] = [
  {
    id: "1",
    slug: "residential",
    title: "Residential Design",
    shortDescription:
      "From urban apartments to country estates, we create homes that reflect the rhythms and rituals of daily life.",
    longDescription:
      "Residential design is where contrast feels most personal. We approach each home as a unique biography — understanding how you live, entertain, rest, and create. Whether transforming a historic brownstone or conceiving a new build, we balance architectural integrity with intimate comfort. Our process begins with deep listening: mapping your daily rituals, understanding your relationship to light, and identifying the tensions that will give the space its character. The result is never a styled interior, but a lived environment where material honesty meets emotional resonance.",
    icon: "home",
    features: [
      "Full Interior Architecture",
      "Kitchen & Bath Design",
      "Custom Millwork & Cabinetry",
      "Lighting Design & Specification",
      "Furniture & Textile Curation",
      "Art Integration & Placement",
      "Renovation & Historic Restoration",
      "New Construction Interiors",
    ],
    process: [
      {
        step: "Discovery",
        description:
          "In-depth conversation about lifestyle, aspirations, and the poetry of daily routines.",
      },
      {
        step: "Concept Development",
        description:
          "Spatial strategies and material narratives presented through renderings and material boards.",
      },
      {
        step: "Design Development",
        description:
          "Technical drawings, specifications, and custom detailing for every element.",
      },
      {
        step: "Construction Administration",
        description:
          "Site oversight, millwork coordination, and installation curation through completion.",
      },
    ],
    relatedProjects: ["river-loft", "meridian-house", "terrace-residence"],
  },
  {
    id: "2",
    slug: "commercial",
    title: "Commercial & Workplace",
    shortDescription:
      "Workplaces that cultivate culture, creativity, and collaboration through intentional spatial choreography.",
    longDescription:
      "The contemporary workplace is a cultural instrument. We design environments that make your values visible — spaces where collaboration feels natural, focus is protected, and identity is expressed through material and light. Our workplace strategy begins with understanding how your team actually works: mapping communication patterns, identifying friction points, and envisioning future modes. We then translate this into spatial neighborhoods, each calibrated for a specific mode of work. Material warmth, acoustic intelligence, and biophilic connections replace the generic open plan.",
    icon: "building",
    features: [
      "Workplace Strategy & Programming",
      "Interior Architecture",
      "Custom Workstation Design",
      "Acoustic & Lighting Engineering",
      "Brand Environmental Graphics",
      "Collaborative & Focus Zones",
      "Hospitality-Style Amenities",
      "Change Management Support",
    ],
    process: [
      {
        step: "Workplace Analytics",
        description:
          "Data-driven analysis of space utilization, collaboration patterns, and employee needs.",
      },
      {
        step: "Strategic Programming",
        description:
          "Spatial framework aligning real estate with organizational culture and growth.",
      },
      {
        step: "Design & Documentation",
        description:
          "Integrated architecture, interior, and systems design with full construction documents.",
      },
      {
        step: "Implementation",
        description:
          "Phased construction management, FF&E procurement, and occupancy coordination.",
      },
    ],
    relatedProjects: ["apex-office"],
  },
  {
    id: "3",
    slug: "hospitality",
    title: "Hospitality & Retail",
    shortDescription:
      "Environments that tell a brand story through sensory choreography — where every touchpoint reinforces identity.",
    longDescription:
      "Hospitality and retail spaces are brand theaters. Every surface, light level, scent, and sound contributes to a narrative that guests unconsciously read. We design from the guest journey inward: arrival, transition, dwelling, departure. Materials are selected for their patina potential — how they age, how they feel, how they reflect light at 2 PM versus 10 PM. Custom furnishings, curated art, and integrated technology create moments of discovery. The result is not a decorated space but a memorable experience that generates loyalty and word-of-mouth.",
    icon: "wine",
    features: [
      "Concept Development & Brand Alignment",
      "Full Interior Design & FF&E",
      "Custom Lighting & Acoustic Design",
      "Bar, Restaurant & Kitchen Design",
      "Guest Room & Suite Design",
      "Spa & Wellness Environments",
      "Retail Flagship & Pop-up Design",
      "Art Curation & Commissioning",
    ],
    process: [
      {
        step: "Brand Immersion",
        description:
          "Deep dive into brand DNA, guest personas, and competitive landscape.",
      },
      {
        step: "Experience Mapping",
        description:
          "Choreography of the guest journey from street to departure.",
      },
      {
        step: "Design & Specification",
        description:
          "Integrated architecture, interiors, lighting, acoustics, and custom elements.",
      },
      {
        step: "Pre-Opening & Launch",
        description:
          "Soft opening support, staff training on space, and operational fine-tuning.",
      },
    ],
    relatedProjects: ["aurum-hotel"],
  },
  {
    id: "4",
    slug: "consultation",
    title: "Design Consultation",
    shortDescription:
      "Strategic guidance for clients with in-house teams or specific design challenges requiring expert perspective.",
    longDescription:
      "Not every project requires full-service design. Our consultation offering provides surgical expertise — material strategy reviews, lighting audits, spatial planning second opinions, and design direction for client-led implementations. We also serve as design advisors for developers and institutions building internal capabilities. Engagements range from half-day workshops to ongoing monthly retainers, always delivering actionable clarity rather than abstract theory.",
    icon: "compass",
    features: [
      "Material & Finish Strategy",
      "Lighting Design Review",
      "Spatial Planning Audit",
      "Vendor & Product Specification",
      "Design Direction Workshops",
      "Developer Design Guidelines",
      "Historic Preservation Consulting",
      "Sustainability & Wellness Certification Support",
    ],
    process: [
      {
        step: "Scope Definition",
        description:
          "Clear articulation of the challenge, constraints, and desired outcomes.",
      },
      {
        step: "Analysis & Research",
        description:
          "Site visits, document review, stakeholder interviews, and benchmarking.",
      },
      {
        step: "Recommendations",
        description:
          "Prioritized, actionable guidance with visual support and implementation roadmap.",
      },
      {
        step: "Follow-Through",
        description:
          "Implementation check-ins, specification refinement, and course correction.",
      },
    ],
    relatedProjects: [],
  },
];

export const serviceCategories = [
  { slug: "residential", label: "Residential", count: 3 },
  { slug: "commercial", label: "Commercial", count: 1 },
  { slug: "hospitality", label: "Hospitality", count: 1 },
  { slug: "consultation", label: "Consultation", count: 0 },
];