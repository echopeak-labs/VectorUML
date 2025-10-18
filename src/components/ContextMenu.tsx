import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { nodeTypeConfig } from '@/lib/uml-utils';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCreateNode: (type: string) => void;
}

export function ContextMenu({ x, y, onClose, onCreateNode }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Adjust menu position if it would go off-screen
  const getAdjustedPosition = () => {
    const menuWidth = 256; // w-64 = 16rem = 256px
    const menuHeight = 500; // max-h-[500px]
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
      // Close menu on right-click anywhere
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add listeners with a slight delay to prevent immediate closure
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

  return (
    <Card
      ref={menuRef}
      className="fixed z-50 w-64 p-2 shadow-xl border-border bg-popover"
      style={{ left: position.x, top: position.y }}
    >
      <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-primary">
        <div>
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Common</div>
          <div className="space-y-1">
            {commonNodes.map((node) => {
              const Icon = node.icon;
              return (
                <button
                  key={node.type}
                  onClick={() => onCreateNode(node.type)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4" style={{ color: `hsl(var(--${node.color}))` }} />
                  <span>{node.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border pt-2">
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">AWS</div>
          <div className="space-y-1">
            {awsNodes.map((node) => {
              const Icon = node.icon;
              return (
                <button
                  key={node.type}
                  onClick={() => onCreateNode(node.type)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4" style={{ color: `hsl(var(--${node.color}))` }} />
                  <span>{node.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border pt-2">
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Pipeline</div>
          <div className="space-y-1">
            {pipelineNodes.map((node) => {
              const Icon = node.icon;
              return (
                <button
                  key={node.type}
                  onClick={() => onCreateNode(node.type)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4" style={{ color: `hsl(var(--${node.color}))` }} />
                  <span>{node.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
