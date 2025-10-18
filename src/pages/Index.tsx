import { useEffect, useState } from 'react';
import { Project, Diagram } from '@/types/uml';
import { storage } from '@/lib/storage';
import { seedProject } from '@/lib/seed-data';
import { ProjectSidebar } from '@/components/ProjectSidebar';
import { DiagramCanvas } from '@/components/DiagramCanvas';
import { toast } from 'sonner';

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);

  useEffect(() => {
    // Initialize with seed data if no projects exist
    let loadedProjects = storage.getProjects();
    if (loadedProjects.length === 0) {
      storage.saveProjects([seedProject]);
      loadedProjects = [seedProject];
      toast.success('Welcome! Loaded example project with 2 diagrams');
    }
    setProjects(loadedProjects);
    
    // Select first project and diagram by default
    if (loadedProjects.length > 0) {
      setSelectedProject(loadedProjects[0]);
      if (loadedProjects[0].diagrams.length > 0) {
        setSelectedDiagram(loadedProjects[0].diagrams[0]);
      }
    }
  }, []);

  const handleProjectsUpdate = () => {
    const updated = storage.getProjects();
    setProjects(updated);
    
    // Update selected project if it still exists
    if (selectedProject) {
      const updatedProject = updated.find(p => p.id === selectedProject.id);
      if (updatedProject) {
        setSelectedProject(updatedProject);
        // Update selected diagram if it still exists
        if (selectedDiagram) {
          const updatedDiagram = updatedProject.diagrams.find(d => d.id === selectedDiagram.id);
          if (updatedDiagram) {
            setSelectedDiagram(updatedDiagram);
          } else if (updatedProject.diagrams.length > 0) {
            setSelectedDiagram(updatedProject.diagrams[0]);
          } else {
            setSelectedDiagram(null);
          }
        }
      } else {
        setSelectedProject(null);
        setSelectedDiagram(null);
      }
    }
  };

  const handleDiagramUpdate = (updates: Partial<Diagram>) => {
    if (selectedProject && selectedDiagram) {
      storage.updateDiagram(selectedProject.id, selectedDiagram.id, updates);
      handleProjectsUpdate();
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    if (project.diagrams.length > 0) {
      setSelectedDiagram(project.diagrams[0]);
    } else {
      setSelectedDiagram(null);
    }
  };

  const handleDiagramSelect = (diagram: Diagram) => {
    setSelectedDiagram(diagram);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ProjectSidebar
        projects={projects}
        selectedProject={selectedProject}
        selectedDiagram={selectedDiagram}
        onProjectSelect={handleProjectSelect}
        onDiagramSelect={handleDiagramSelect}
        onProjectsUpdate={handleProjectsUpdate}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedDiagram && selectedProject ? (
          <>
            <div className="border-b border-border px-6 py-3 bg-card">
              <h1 className="text-xl font-semibold text-foreground">{selectedDiagram.name}</h1>
              <p className="text-sm text-muted-foreground">
                Right-click to add elements
              </p>
            </div>
            <div className="flex-1 overflow-hidden">
              <DiagramCanvas
                diagram={selectedDiagram}
                projectId={selectedProject.id}
                onDiagramUpdate={handleDiagramUpdate}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">No Diagram Selected</h2>
              <p className="text-muted-foreground">
                {projects.length === 0
                  ? 'Create a project to get started'
                  : 'Select a diagram from the sidebar or create a new one'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
