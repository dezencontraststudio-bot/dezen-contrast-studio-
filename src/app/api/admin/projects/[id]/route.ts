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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projects = await readProjects();
    const project = projects.find((p: { id: string }) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to read project" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const projects = await readProjects();

    const index = projects.findIndex((p: { id: string }) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[index] = {
      ...projects[index],
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };

    await writeProjects(projects);
    return NextResponse.json(projects[index]);
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projects = await readProjects();

    const filtered = projects.filter((p: { id: string }) => p.id !== id);
    if (filtered.length === projects.length) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await writeProjects(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}