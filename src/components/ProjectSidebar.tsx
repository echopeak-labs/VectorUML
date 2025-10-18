import { useState } from 'react';
import { Project, Diagram } from '@/types/uml';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Plus, 
  FolderOpen, 
  FileText, 
  Trash2, 
  Edit2, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

interface ProjectSidebarProps {
  projects: Project[];
  selectedProject: Project | null;
  selectedDiagram: Diagram | null;
  onProjectSelect: (project: Project) => void;
  onDiagramSelect: (diagram: Diagram) => void;
  onProjectsUpdate: () => void;
}

export function ProjectSidebar({
  projects,
  selectedProject,
  selectedDiagram,
  onProjectSelect,
  onDiagramSelect,
  onProjectsUpdate,
}: ProjectSidebarProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingDiagram, setEditingDiagram] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [diagramToDelete, setDiagramToDelete] = useState<{ projectId: string; diagramId: string } | null>(null);
  const [createDiagramDialogOpen, setCreateDiagramDialogOpen] = useState(false);
  const [projectIdForNewDiagram, setProjectIdForNewDiagram] = useState<string | null>(null);
  const [newDiagramName, setNewDiagramName] = useState('');
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleCreateProject = () => {
    setNewProjectName('');
    setCreateProjectDialogOpen(true);
  };

  const confirmCreateProject = () => {
    if (newProjectName.trim()) {
      storage.createProject(newProjectName.trim());
      onProjectsUpdate();
      toast.success('Project created');
      setNewProjectName('');
    }
    setCreateProjectDialogOpen(false);
  };

  const handleCreateDiagram = (projectId: string) => {
    setProjectIdForNewDiagram(projectId);
    setNewDiagramName('');
    setCreateDiagramDialogOpen(true);
  };

  const confirmCreateDiagram = () => {
    if (projectIdForNewDiagram && newDiagramName.trim()) {
      storage.createDiagram(projectIdForNewDiagram, newDiagramName.trim());
      onProjectsUpdate();
      toast.success('Diagram created');
      setProjectIdForNewDiagram(null);
      setNewDiagramName('');
    }
    setCreateDiagramDialogOpen(false);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this project and all its diagrams?')) {
      storage.deleteProject(projectId);
      onProjectsUpdate();
      toast.success('Project deleted');
    }
  };

  const handleDeleteDiagram = (projectId: string, diagramId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDiagramToDelete({ projectId, diagramId });
    setDeleteDialogOpen(true);
  };

  const confirmDeleteDiagram = () => {
    if (diagramToDelete) {
      storage.deleteDiagram(diagramToDelete.projectId, diagramToDelete.diagramId);
      onProjectsUpdate();
      toast.success('Diagram deleted');
      setDiagramToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleRenameProject = (projectId: string, newName: string) => {
    if (newName.trim()) {
      storage.updateProject(projectId, { name: newName.trim() });
      onProjectsUpdate();
      toast.success('Project renamed');
    }
    setEditingProject(null);
  };

  const handleRenameDiagram = (projectId: string, diagramId: string, newName: string) => {
    if (newName.trim()) {
      storage.updateDiagram(projectId, diagramId, { name: newName.trim() });
      onProjectsUpdate();
      toast.success('Diagram renamed');
    }
    setEditingDiagram(null);
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="border-b border-sidebar-border p-4">
        <h2 className="mb-3 text-lg font-semibold text-sidebar-foreground">Projects</h2>
        <Button onClick={handleCreateProject} size="sm" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {projects.map((project) => (
            <div key={project.id} className="mb-2">
              <div
                className={`flex items-center justify-between rounded-md p-2 hover:bg-sidebar-accent cursor-pointer ${
                  selectedProject?.id === project.id ? 'bg-sidebar-accent' : ''
                }`}
                onClick={() => {
                  onProjectSelect(project);
                  toggleProject(project.id);
                }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleProject(project.id);
                    }}
                    className="shrink-0"
                  >
                    {expandedProjects.has(project.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  <FolderOpen className="h-4 w-4 shrink-0" />
                  {editingProject === project.id ? (
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={() => handleRenameProject(project.id, newName)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameProject(project.id, newName);
                        if (e.key === 'Escape') setEditingProject(null);
                      }}
                      className="h-6 py-0 text-sm"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="truncate text-sm">{project.name}</span>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewName(project.name);
                      setEditingProject(project.id);
                    }}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => handleDeleteProject(project.id, e)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {expandedProjects.has(project.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {project.diagrams.map((diagram) => (
                    <div
                      key={diagram.id}
                      className={`flex items-center justify-between rounded-md p-2 hover:bg-sidebar-accent cursor-pointer ${
                        selectedDiagram?.id === diagram.id ? 'bg-sidebar-accent' : ''
                      }`}
                      onClick={() => onDiagramSelect(diagram)}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileText className="h-3 w-3 shrink-0" />
                        {editingDiagram === diagram.id ? (
                          <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={() => handleRenameDiagram(project.id, diagram.id, newName)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleRenameDiagram(project.id, diagram.id, newName);
                              if (e.key === 'Escape') setEditingDiagram(null);
                            }}
                            className="h-6 py-0 text-xs"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <span className="truncate text-xs">{diagram.name}</span>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewName(diagram.name);
                            setEditingDiagram(diagram.id);
                          }}
                        >
                          <Edit2 className="h-2.5 w-2.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={(e) => handleDeleteDiagram(project.id, diagram.id, e)}
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs h-7"
                    onClick={() => handleCreateDiagram(project.id)}
                  >
                    <Plus className="mr-2 h-3 w-3" />
                    New Diagram
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Diagram</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this diagram? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteDiagram}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={createDiagramDialogOpen} onOpenChange={setCreateDiagramDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Diagram</DialogTitle>
            <DialogDescription>
              Enter a name for your new diagram
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="diagram-name">Diagram Name</Label>
              <Input
                id="diagram-name"
                value={newDiagramName}
                onChange={(e) => setNewDiagramName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newDiagramName.trim()) {
                    confirmCreateDiagram();
                  }
                }}
                placeholder="Enter diagram name"
                autoFocus
                maxLength={100}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDiagramDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCreateDiagram} disabled={!newDiagramName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={createProjectDialogOpen} onOpenChange={setCreateProjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter a name for your new project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newProjectName.trim()) {
                    confirmCreateProject();
                  }
                }}
                placeholder="Enter project name"
                autoFocus
                maxLength={100}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCreateProject} disabled={!newProjectName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
