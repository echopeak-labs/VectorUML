export type NodeType = 
  | 'class' 
  | 'interface' 
  | 'abstract' 
  | 'enum' 
  | 'package' 
  | 'note' 
  | 'actor' 
  | 'usecase' 
  | 'component';

export type RelationType = 
  | 'association' 
  | 'aggregation' 
  | 'composition' 
  | 'inheritance' 
  | 'realization' 
  | 'dependency';

export type Visibility = '+' | '-' | '#' | '~';

export interface Field {
  visibility: Visibility;
  name: string;
  type: string;
}

export interface MethodParam {
  name: string;
  type: string;
}

export interface Method {
  visibility: Visibility;
  name: string;
  params: MethodParam[];
  returns: string;
}

export interface UMLNode {
  id: string;
  type: NodeType;
  icon: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  connectors: Array<'top' | 'right' | 'bottom' | 'left'>;
  data: {
    name: string;
    stereotypes?: string[];
    fields?: Field[];
    methods?: Method[];
    values?: string[]; // for enum
    text?: string; // for note
  };
}

export interface UMLEdge {
  id: string;
  from: { nodeId: string; port: 'top' | 'right' | 'bottom' | 'left' };
  to: { nodeId: string; port: 'top' | 'right' | 'bottom' | 'left' };
  relation: RelationType;
  labels: { head?: string; tail?: string; center?: string };
  style: { dashed: boolean };
}

export interface Diagram {
  id: string;
  name: string;
  nodes: UMLNode[];
  edges: UMLEdge[];
  settings: {
    grid: boolean;
    snap: boolean;
    theme: string;
  };
}

export interface Project {
  id: string;
  name: string;
  diagrams: Diagram[];
  createdAt: number;
  updatedAt: number;
}

export interface DiagramSchema {
  schemaVersion: string;
  projectId: string;
  diagramId: string;
  name: string;
  nodes: UMLNode[];
  edges: UMLEdge[];
  settings: {
    grid: boolean;
    snap: boolean;
    theme: string;
  };
}
