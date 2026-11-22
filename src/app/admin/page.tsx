"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
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

const CATEGORIES = ["Residential", "Commercial", "Hospitality", "Cultural"];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
        setMessage({ type: "success", text: "Logged in successfully" });
      } else {
        setMessage({ type: "error", text: "Invalid password" });
      }
    } catch {
      setMessage({ type: "error", text: "Login failed" });
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setEditingId(null);
    setShowNew(false);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    setShowNew(false);
  };

  const handleNew = () => {
    setEditingId("new");
    setShowNew(true);
    setFormData({
      title: "",
      category: "Residential",
      location: "",
      year: new Date().getFullYear().toString(),
      area: "",
      description: "",
      longDescription: "",
      images: ["/projects/new/hero.svg"],
      materials: [],
      services: [],
      featured: false,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowNew(false);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev) => {
      const arr = [...(prev[field as keyof Project] as string[] || [])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const handleAddArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof Project] as string[] || []), ""],
    }));
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    setFormData((prev) => {
      const arr = [...(prev[field as keyof Project] as string[] || [])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const slug = formData.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "new-project";

      const projectData = {
        ...formData,
        slug,
        id: editingId === "new" ? Date.now().toString() : editingId,
        images: formData.images?.filter((i) => i.trim()) || [],
        materials: formData.materials?.filter((m) => m.trim()) || [],
        services: formData.services?.filter((s) => s.trim()) || [],
        featured: formData.featured || false,
      };

      const url = editingId === "new" ? "/api/admin/projects" : `/api/admin/projects/${editingId}`;
      const method = editingId === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: editingId === "new" ? "Project created" : "Project updated" });
        setEditingId(null);
        setShowNew(false);
        setFormData({});
        loadProjects();
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Failed to save" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project permanently?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Project deleted" });
        loadProjects();
      } else {
        setMessage({ type: "error", text: "Delete failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <Link href="/" className="font-display text-2xl font-medium text-foreground block mb-2">
              Dezen Contrast Studio
            </Link>
            <p className="text-foreground/60">Admin Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>
            {message && (
              <div className={`p-4 rounded-lg text-sm ${message.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                {message.text}
              </div>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-medium text-background">
            Dezen Contrast Studio
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-background/70 hover:text-background transition-colors">
              View Site
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 text-sm text-background/70 hover:text-background transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-light text-foreground">Project Manager</h1>
            <p className="text-foreground/60">Add, edit, and manage portfolio projects</p>
          </div>
          <button onClick={handleNew} className="px-6 py-2.5 bg-accent text-white rounded-full font-medium hover:bg-accent-dark transition-colors">
            + New Project
          </button>
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg border text-sm ${
              message.type === "success"
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {editingId ? (
          <ProjectForm
            project={formData as Project}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onChange={handleChange}
            onArrayChange={handleArrayChange}
            onAddArrayItem={handleAddArrayItem}
            onRemoveArrayItem={handleRemoveArrayItem}
            loading={loading}
            isNew={showNew}
          />
        ) : (
          <ProjectsList projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}

function ProjectsList({
  projects,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}) {
  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 bg-card border border-border rounded-2xl"
      >
        <p className="text-foreground/60 mb-4">No projects yet</p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-hidden bg-card border border-border rounded-2xl">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-foreground/5">
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/60 uppercase tracking-wider">Project</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/60 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/60 uppercase tracking-wider">Location</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/60 uppercase tracking-wider">Year</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/60 uppercase tracking-wider">Featured</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-foreground/60 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-foreground/5 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-foreground">{project.title}</div>
                <div className="text-sm text-foreground/50">{project.slug}</div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                  {project.category}
                </span>
              </td>
              <td className="px-6 py-4 text-foreground/70">{project.location}</td>
              <td className="px-6 py-4 text-foreground/70">{project.year}</td>
              <td className="px-6 py-4">
                {project.featured ? (
                  <span className="inline-flex items-center gap-1 text-xs text-green-400">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Featured
                  </span>
                ) : (
                  <span className="text-xs text-foreground/40">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => onEdit(project)} className="px-3 py-1.5 text-sm text-accent hover:text-accent-dark font-medium">
                  Edit
                </button>
                <button onClick={() => onDelete(project.id)} className="ml-2 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 font-medium">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProjectForm({
  project,
  onSubmit,
  onCancel,
  onChange,
  onArrayChange,
  onAddArrayItem,
  onRemoveArrayItem,
  loading,
  isNew,
}: {
  project: Project;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onArrayChange: (field: string, index: number, value: string) => void;
  onAddArrayItem: (field: string) => void;
  onRemoveArrayItem: (field: string, index: number) => void;
  loading: boolean;
  isNew: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <h2 className="font-display text-2xl font-medium text-foreground">
          {isNew ? "New Project" : "Edit Project"}
        </h2>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
          Cancel
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground/80 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={project.title || ""}
              onChange={onChange}
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground/80 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={project.category || "Residential"}
              onChange={onChange}
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-foreground/80 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={project.location || ""}
              onChange={onChange}
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-foreground/80 mb-2">
              Year *
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={project.year || ""}
              onChange={onChange}
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-foreground/80 mb-2">
              Area (e.g., "3,200 sq ft")
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={project.area || ""}
              onChange={onChange}
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={project.featured || false}
              onChange={(e) => onChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
              className="w-4 h-4 text-accent border-border rounded focus:ring-accent"
            />
            <label htmlFor="featured" className="text-sm font-medium text-foreground">
              Featured Project
            </label>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground/80 mb-2">
              Short Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={project.description || ""}
              onChange={onChange}
              rows={3}
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-y"
              required
            />
          </div>

          <div>
            <label htmlFor="longDescription" className="block text-sm font-medium text-foreground/80 mb-2">
              Long Description *
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              value={project.longDescription || ""}
              onChange={onChange}
              rows={6}
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-y"
              required
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 space-y-6">
        <ArrayField
          label="Images (paths like /projects/slug/image.svg)"
          field="images"
          values={project.images || []}
          onChange={onArrayChange}
          onAdd={onAddArrayItem}
          onRemove={onRemoveArrayItem}
        />

        <ArrayField
          label="Materials"
          field="materials"
          values={project.materials || []}
          onChange={onArrayChange}
          onAdd={onAddArrayItem}
          onRemove={onRemoveArrayItem}
        />

        <ArrayField
          label="Services"
          field="services"
          values={project.services || []}
          onChange={onArrayChange}
          onAdd={onAddArrayItem}
          onRemove={onRemoveArrayItem}
        />
      </div>

      <div className="flex justify-end gap-4 border-t border-border pt-6">
        <button type="button" onClick={onCancel} className="px-6 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-6 py-2.5 bg-accent text-white rounded-full font-medium hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Saving..." : isNew ? "Create Project" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

function ArrayField({
  label,
  field,
  values,
  onChange,
  onAdd,
  onRemove,
}: {
  label: string;
  field: string;
  values: string[];
  onChange: (field: string, index: number, value: string) => void;
  onAdd: (field: string) => void;
  onRemove: (field: string, index: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        <button type="button" onClick={() => onAdd(field)} className="px-3 py-1 text-sm text-accent hover:text-accent-dark font-medium">
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(field, index, e.target.value)}
              className="flex-1 px-4 py-2 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder={`Item ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => onRemove(field, index)}
              className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
              aria-label="Remove"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        ))}
        {values.length === 0 && (
          <div className="text-sm text-foreground/40 italic">No items yet</div>
        )}
      </div>
    </div>
  );
}