import fs from "fs";
import path from "path";
import { Project } from "@/data/projects";

export function loadProjects(): Project[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "projects.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch {
    return [];
  }
}

export function getProject(slug: string): Project | undefined {
  const projects = loadProjects();
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return loadProjects().filter((p) => p.featured);
}

export function getAllCategories(): string[] {
  const projects = loadProjects();
  return ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
}

export function getAllProjects(): Project[] {
  return loadProjects();
}