import { Project, Diagram } from '@/types/uml';

const STORAGE_KEY = 'uml-diagrams-projects';

export const storage = {
  getProjects(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveProjects(projects: Project[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  },

  getProject(id: string): Project | undefined {
    const projects = this.getProjects();
    return projects.find(p => p.id === id);
  },

  createProject(name: string): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      diagrams: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    projects.push(newProject);
    this.saveProjects(projects);
    return newProject;
  },

  updateProject(id: string, updates: Partial<Project>): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates, updatedAt: Date.now() };
      this.saveProjects(projects);
    }
  },

  deleteProject(id: string): void {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    this.saveProjects(filtered);
  },

  createDiagram(projectId: string, name: string): Diagram {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');
    
    const newDiagram: Diagram = {
      id: crypto.randomUUID(),
      name,
      nodes: [],
      edges: [],
      settings: {
        grid: true,
        snap: true,
        theme: 'dark',
      },
    };
    
    project.diagrams.push(newDiagram);
    project.updatedAt = Date.now();
    this.saveProjects(projects);
    return newDiagram;
  },

  updateDiagram(projectId: string, diagramId: string, updates: Partial<Diagram>): void {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const diagramIndex = project.diagrams.findIndex(d => d.id === diagramId);
    if (diagramIndex !== -1) {
      project.diagrams[diagramIndex] = { ...project.diagrams[diagramIndex], ...updates };
      project.updatedAt = Date.now();
      this.saveProjects(projects);
    }
  },

  deleteDiagram(projectId: string, diagramId: string): void {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    project.diagrams = project.diagrams.filter(d => d.id !== diagramId);
    project.updatedAt = Date.now();
    this.saveProjects(projects);
  },
};
