import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Diagram } from '@/types/uml';
import { UMLClassNode } from './nodes/UMLClassNode';
import { UMLInterfaceNode } from './nodes/UMLInterfaceNode';
import { UMLNoteNode } from './nodes/UMLNoteNode';
import { UMLEnumNode } from './nodes/UMLEnumNode';
import { ContextMenu } from './ContextMenu';
import { EdgeLabelDialog } from './EdgeLabelDialog';
import { Button } from './ui/button';
import { Download, Upload, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { toast } from 'sonner';
import { exportDiagramToJSON, importDiagramFromJSON } from '@/lib/uml-utils';

const nodeTypes = {
  class: UMLClassNode,
  interface: UMLInterfaceNode,
  abstract: UMLClassNode,
  enum: UMLEnumNode,
  note: UMLNoteNode,
  package: UMLClassNode,
  actor: UMLClassNode,
  usecase: UMLClassNode,
  component: UMLClassNode,
};

interface DiagramCanvasProps {
  diagram: Diagram;
  projectId: string;
  onDiagramUpdate: (updates: Partial<Diagram>) => void;
}

export function DiagramCanvas({ diagram, projectId, onDiagramUpdate }: DiagramCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [labelDialog, setLabelDialog] = useState<{ open: boolean; edgeId: string; currentLabel: string }>({
    open: false,
    edgeId: '',
    currentLabel: '',
  });

  // Convert diagram data to React Flow format only when diagram changes
  useEffect(() => {
    if (diagram) {
      const flowNodes: Node[] = diagram.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: { ...node.data }, // Clone data to prevent mutations
      }));

      const flowEdges: Edge[] = diagram.edges.map((edge) => ({
        id: edge.id,
        source: edge.from.nodeId,
        target: edge.to.nodeId,
        type: edge.style.dashed ? 'step' : 'smoothstep',
        animated: false,
        label: edge.labels.center,
      }));

      setNodes(flowNodes);
      setEdges(flowEdges);
    }
  }, [diagram.id]); // Only re-run when diagram ID changes, not on every diagram update

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({
        ...params,
        type: 'smoothstep',
        animated: false,
        style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
      }, eds));
    },
    [setEdges]
  );

  // Handle delete key press for selected edges and nodes
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        setEdges((eds) => eds.filter((edge) => !edge.selected));
        setNodes((nds) => nds.filter((node) => !node.selected));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setEdges, setNodes]);

  // Handle double-click on edge to add/edit label
  const onEdgeDoubleClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      const currentLabel = edge.label as string || '';
      setLabelDialog({
        open: true,
        edgeId: edge.id,
        currentLabel,
      });
    },
    []
  );

  const handleLabelSave = useCallback(
    (newLabel: string) => {
      setEdges((eds) =>
        eds.map((e) =>
          e.id === labelDialog.edgeId
            ? { 
                ...e, 
                label: newLabel,
                labelStyle: { fill: 'hsl(var(--foreground))', fontSize: 12 },
                labelBgStyle: { fill: 'hsl(var(--card))', fillOpacity: 0.9 },
                labelBgPadding: [4, 4] as [number, number],
              }
            : e
        )
      );
    },
    [labelDialog.edgeId, setEdges]
  );

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handleCreateNode = useCallback(
    (type: string) => {
      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: contextMenu?.x || 0,
        y: contextMenu?.y || 0,
      });

      const newNode: Node = {
        id: crypto.randomUUID(),
        type,
        position,
        data: {
          name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          fields: type === 'class' || type === 'abstract' ? [] : undefined,
          methods: type === 'class' || type === 'interface' || type === 'abstract' ? [] : undefined,
          values: type === 'enum' ? [] : undefined,
          text: type === 'note' ? 'Note text' : undefined,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setContextMenu(null);
      toast.success(`${type} node created`);
    },
    [contextMenu, reactFlowInstance, setNodes]
  );

  const handleExport = useCallback(() => {
    const exportData = exportDiagramToJSON(diagram, projectId);
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${diagram.name}.json`;
    a.click();
    toast.success('Diagram exported');
  }, [diagram, projectId]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const imported = importDiagramFromJSON(e.target?.result as string);
            onDiagramUpdate({
              nodes: imported.nodes,
              edges: imported.edges,
              settings: imported.settings,
            });
            toast.success('Diagram imported');
          } catch (error) {
            toast.error('Failed to import diagram');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [onDiagramUpdate]);

  // Save changes back to diagram with debounce - but prevent infinite loops
  useEffect(() => {
    if (nodes.length === 0 && edges.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      const updatedNodes = nodes.map((node) => ({
        id: node.id,
        type: node.type as any,
        icon: node.type,
        position: node.position,
        size: { w: 240, h: 120 },
        connectors: ['top', 'right', 'bottom', 'left'] as any,
        data: node.data,
      }));

      const updatedEdges = edges.map((edge) => ({
        id: edge.id,
        from: { nodeId: edge.source, port: 'right' as any },
        to: { nodeId: edge.target, port: 'left' as any },
        relation: 'association' as any,
        labels: { center: edge.label as string },
        style: { dashed: edge.type === 'step' },
      }));

      // Only update if there are actual changes
      const hasChanges = 
        JSON.stringify(updatedNodes) !== JSON.stringify(diagram.nodes) ||
        JSON.stringify(updatedEdges) !== JSON.stringify(diagram.edges);

      if (hasChanges) {
        onDiagramUpdate({
          nodes: updatedNodes,
          edges: updatedEdges,
        });
      }
    }, 1000); // Increased debounce to 1 second

    return () => clearTimeout(saveTimeout);
  }, [nodes, edges]); // Removed onDiagramUpdate and diagram from dependencies

  return (
    <div className="h-full w-full" onContextMenu={handleContextMenu}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        fitView
        className="bg-canvas"
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        edgesFocusable={true}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
          focusable: true,
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(var(--grid))" />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            return `hsl(var(--uml-${node.type}))`;
          }}
          className="bg-card border border-border"
        />
        <Panel position="top-right" className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="secondary" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </Panel>
      </ReactFlow>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onCreateNode={handleCreateNode}
        />
      )}

      <EdgeLabelDialog
        open={labelDialog.open}
        currentLabel={labelDialog.currentLabel}
        onClose={() => setLabelDialog({ open: false, edgeId: '', currentLabel: '' })}
        onSave={handleLabelSave}
      />
    </div>
  );
}
