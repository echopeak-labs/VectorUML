import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { nodeTypeConfig } from '@/lib/uml-utils';
import { Search } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCreateNode: (type: string) => void;
}

export function ContextMenu({ x, y, onClose, onCreateNode }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Adjust menu position if it would go off-screen
  const getAdjustedPosition = () => {
    const menuWidth = 720; // Wider for grid layout
    const menuHeight = 600; // Taller for more content
    const padding = 10;

    let adjustedX = x;
    let adjustedY = y;

    // Check right edge
    if (x + menuWidth + padding > window.innerWidth) {
      adjustedX = window.innerWidth - menuWidth - padding;
    }

    // Check bottom edge
    if (y + menuHeight + padding > window.innerHeight) {
      adjustedY = window.innerHeight - menuHeight - padding;
    }

    // Ensure menu doesn't go off left edge
    if (adjustedX < padding) {
      adjustedX = padding;
    }

    // Ensure menu doesn't go off top edge
    if (adjustedY < padding) {
      adjustedY = padding;
    }

    return { x: adjustedX, y: adjustedY };
  };

  const position = getAdjustedPosition();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('contextmenu', handleContextMenu);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [onClose]);

  const commonNodes = [
    { type: 'class', ...nodeTypeConfig.class },
    { type: 'interface', ...nodeTypeConfig.interface },
    { type: 'abstract', ...nodeTypeConfig.abstract },
    { type: 'enum', ...nodeTypeConfig.enum },
    { type: 'package', ...nodeTypeConfig.package },
    { type: 'note', ...nodeTypeConfig.note },
    { type: 'markdown', ...nodeTypeConfig.markdown },
    { type: 'idea-pin', ...nodeTypeConfig['idea-pin'] },
    { type: 'actor', ...nodeTypeConfig.actor },
    { type: 'usecase', ...nodeTypeConfig.usecase },
    { type: 'component', ...nodeTypeConfig.component },
    { type: 'api-server', ...nodeTypeConfig['api-server'] },
    { type: 'database', ...nodeTypeConfig.database },
  ];

  const awsNodes = [
    { type: 'aws-lambda', ...nodeTypeConfig['aws-lambda'] },
    { type: 'aws-api-gateway', ...nodeTypeConfig['aws-api-gateway'] },
    { type: 'aws-dynamodb', ...nodeTypeConfig['aws-dynamodb'] },
    { type: 'aws-ecs', ...nodeTypeConfig['aws-ecs'] },
    { type: 'aws-ecr', ...nodeTypeConfig['aws-ecr'] },
    { type: 'aws-amplify', ...nodeTypeConfig['aws-amplify'] },
    { type: 'aws-cognito', ...nodeTypeConfig['aws-cognito'] },
    { type: 'aws-s3', ...nodeTypeConfig['aws-s3'] },
    { type: 'aws-alb', ...nodeTypeConfig['aws-alb'] },
    { type: 'aws-ec2', ...nodeTypeConfig['aws-ec2'] },
  ];

  const pipelineNodes = [
    { type: 'github-actions', ...nodeTypeConfig['github-actions'] },
    { type: 'circleci', ...nodeTypeConfig.circleci },
    { type: 'aws-codebuild', ...nodeTypeConfig['aws-codebuild'] },
    { type: 'aws-codepipeline', ...nodeTypeConfig['aws-codepipeline'] },
  ];

  const filterNodes = <T extends { label: string; type: string; icon: any; color: string }>(nodes: T[]) => {
    if (!searchQuery) return nodes;
    return nodes.filter(node => 
      node.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredCommon = filterNodes(commonNodes);
  const filteredAws = filterNodes(awsNodes);
  const filteredPipeline = filterNodes(pipelineNodes);

  return (
    <Card
      ref={menuRef}
      className="fixed z-50 w-[720px] p-4 shadow-2xl border-border bg-popover"
      style={{ left: position.x, top: position.y }}
    >
      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-input border-border focus-visible:ring-primary"
          autoFocus
        />
      </div>

      <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-primary">
        {/* Common Components */}
        {filteredCommon.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">Common</h3>
            <div className="grid grid-cols-8 gap-2">
              {filteredCommon.map((node) => {
                const Icon = node.icon;
                return (
                  <button
                    key={node.type}
                    onClick={() => onCreateNode(node.type)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent/10 border border-transparent hover:border-primary/50 transition-all group"
                  >
                    <Icon 
                      className="h-6 w-6 group-hover:scale-110 transition-transform" 
                      style={{ color: `hsl(var(--${node.color}))` }} 
                    />
                    <span className="text-xs text-center leading-tight">{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Divider */}
        {filteredAws.length > 0 && filteredCommon.length > 0 && (
          <div className="border-t border-border my-4"></div>
        )}

        {/* AWS Components */}
        {filteredAws.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">AWS</h3>
            <div className="grid grid-cols-8 gap-2">
              {filteredAws.map((node) => {
                const Icon = node.icon;
                return (
                  <button
                    key={node.type}
                    onClick={() => onCreateNode(node.type)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent/10 border border-transparent hover:border-primary/50 transition-all group"
                  >
                    <Icon 
                      className="h-6 w-6 group-hover:scale-110 transition-transform" 
                      style={{ color: `hsl(var(--${node.color}))` }} 
                    />
                    <span className="text-xs text-center leading-tight">{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Divider */}
        {filteredPipeline.length > 0 && (filteredAws.length > 0 || filteredCommon.length > 0) && (
          <div className="border-t border-border my-4"></div>
        )}

        {/* Pipeline Components */}
        {filteredPipeline.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">Pipeline</h3>
            <div className="grid grid-cols-8 gap-2">
              {filteredPipeline.map((node) => {
                const Icon = node.icon;
                return (
                  <button
                    key={node.type}
                    onClick={() => onCreateNode(node.type)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent/10 border border-transparent hover:border-primary/50 transition-all group"
                  >
                    <Icon 
                      className="h-6 w-6 group-hover:scale-110 transition-transform" 
                      style={{ color: `hsl(var(--${node.color}))` }} 
                    />
                    <span className="text-xs text-center leading-tight">{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredCommon.length === 0 && filteredAws.length === 0 && filteredPipeline.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No components found</p>
          </div>
        )}
      </div>
    </Card>
  );
}
