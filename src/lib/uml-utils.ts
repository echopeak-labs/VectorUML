import { NodeType, RelationType } from '@/types/uml';
import { 
  Box, 
  Circle, 
  Component, 
  FileText, 
  FileCode,
  Hexagon, 
  Package, 
  Square, 
  Tag, 
  User,
  Server,
  Database,
  Zap,
  ArrowRightLeft,
  Container,
  Archive,
  Users,
  HardDrive,
  Scale,
  Github,
  CircleDot,
  Hammer,
  GitBranch
} from 'lucide-react';

export const nodeTypeConfig = {
  class: { icon: Box, color: 'uml-class', label: 'Class' },
  interface: { icon: Circle, color: 'uml-interface', label: 'Interface' },
  abstract: { icon: Tag, color: 'uml-abstract', label: 'Abstract Class' },
  enum: { icon: Square, color: 'uml-enum', label: 'Enum' },
  package: { icon: Package, color: 'uml-package', label: 'Package' },
  note: { icon: FileText, color: 'uml-note', label: 'Note' },
  markdown: { icon: FileCode, color: 'primary', label: 'Markdown' },
  actor: { icon: User, color: 'uml-actor', label: 'Actor' },
  usecase: { icon: Circle, color: 'uml-usecase', label: 'Use Case' },
  component: { icon: Component, color: 'uml-component', label: 'Component' },
  'api-server': { icon: Server, color: 'uml-component', label: 'API Server' },
  'database': { icon: Database, color: 'uml-package', label: 'Database' },
  'aws-lambda': { icon: Zap, color: 'uml-class', label: 'AWS Lambda' },
  'aws-api-gateway': { icon: ArrowRightLeft, color: 'uml-interface', label: 'AWS API Gateway' },
  'aws-dynamodb': { icon: Database, color: 'uml-package', label: 'AWS DynamoDB' },
  'aws-ecs': { icon: Container, color: 'uml-component', label: 'AWS ECS' },
  'aws-ecr': { icon: Archive, color: 'uml-package', label: 'AWS ECR' },
  'aws-amplify': { icon: Zap, color: 'uml-actor', label: 'AWS Amplify' },
  'aws-cognito': { icon: Users, color: 'uml-actor', label: 'AWS Cognito' },
  'aws-s3': { icon: HardDrive, color: 'uml-package', label: 'AWS S3' },
  'aws-alb': { icon: Scale, color: 'uml-interface', label: 'AWS ALB' },
  'aws-ec2': { icon: Server, color: 'uml-component', label: 'AWS EC2' },
  'github-actions': { icon: Github, color: 'uml-class', label: 'Github Actions' },
  'circleci': { icon: CircleDot, color: 'uml-class', label: 'CircleCI' },
  'aws-codebuild': { icon: Hammer, color: 'uml-class', label: 'AWS CodeBuild' },
  'aws-codepipeline': { icon: GitBranch, color: 'uml-interface', label: 'AWS CodePipeline' },
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
