import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "src", "data", "projects.json");

async function readProjects() {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProjects(projects: any[]) {
  await writeFile(DATA_FILE, JSON.stringify(projects, null, 2));
}

export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to read projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const projects = await readProjects();

    const newProject = {
      ...body,
      id: body.id || Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.push(newProject);
    await writeProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}