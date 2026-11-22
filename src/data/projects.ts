export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  description: string;
  longDescription: string;
  images: string[];
  materials: string[];
  services: string[];
  featured: boolean;
}