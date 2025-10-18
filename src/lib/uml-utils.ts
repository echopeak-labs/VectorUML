import { NodeType, RelationType } from '@/types/uml';
import { 
  Box, 
  Circle, 
  Component, 
  FileText, 
  Hexagon, 
  Package, 
  Square, 
  Tag, 
  User 
} from 'lucide-react';

export const nodeTypeConfig = {
  class: { icon: Box, color: 'uml-class', label: 'Class' },
  interface: { icon: Circle, color: 'uml-interface', label: 'Interface' },
  abstract: { icon: Tag, color: 'uml-abstract', label: 'Abstract Class' },
  enum: { icon: Square, color: 'uml-enum', label: 'Enum' },
  package: { icon: Package, color: 'uml-package', label: 'Package' },
  note: { icon: FileText, color: 'uml-note', label: 'Note' },
  actor: { icon: User, color: 'uml-actor', label: 'Actor' },
  usecase: { icon: Circle, color: 'uml-usecase', label: 'Use Case' },
  component: { icon: Component, color: 'uml-component', label: 'Component' },
} as const;

export const relationTypeConfig = {
  association: { label: 'Association', symbol: '→', dashed: false },
  aggregation: { label: 'Aggregation', symbol: '◇→', dashed: false },
  composition: { label: 'Composition', symbol: '◆→', dashed: false },
  inheritance: { label: 'Inheritance', symbol: '△→', dashed: false },
  realization: { label: 'Realization', symbol: '▻→', dashed: true },
  dependency: { label: 'Dependency', symbol: '↝', dashed: true },
} as const;

export function getNodeIcon(type: NodeType) {
  return nodeTypeConfig[type]?.icon || Box;
}

export function getNodeColor(type: NodeType): string {
  return nodeTypeConfig[type]?.color || 'uml-class';
}

export function exportDiagramToJSON(diagram: any, projectId: string) {
  return {
    schemaVersion: '1.0',
    projectId,
    diagramId: diagram.id,
    name: diagram.name,
    nodes: diagram.nodes,
    edges: diagram.edges,
    settings: diagram.settings,
  };
}

export function importDiagramFromJSON(json: string) {
  try {
    const data = JSON.parse(json);
    if (!data.schemaVersion || !data.nodes || !data.edges) {
      throw new Error('Invalid diagram format');
    }
    return data;
  } catch (error) {
    throw new Error('Failed to parse diagram JSON');
  }
}
