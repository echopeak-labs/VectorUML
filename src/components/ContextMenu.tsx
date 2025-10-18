import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { nodeTypeConfig } from '@/lib/uml-utils';
import { ArrowRight, Circle as CircleIcon, Diamond, Triangle } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCreateNode: (type: string) => void;
}

export function ContextMenu({ x, y, onClose, onCreateNode }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

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
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('contextmenu', handleContextMenu);
    }, 0);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
  ];

  const relations = [
    { type: 'association', label: 'Association', icon: ArrowRight },
    { type: 'aggregation', label: 'Aggregation', icon: Diamond },
    { type: 'composition', label: 'Composition', icon: Diamond },
    { type: 'inheritance', label: 'Inheritance', icon: Triangle },
    { type: 'realization', label: 'Realization', icon: Triangle },
    { type: 'dependency', label: 'Dependency', icon: ArrowRight },
  ];

  return (
    <Card
      ref={menuRef}
      className="fixed z-50 w-64 p-2 shadow-xl border-border bg-popover"
      style={{ left: x, top: y }}
    >
      <div className="space-y-3">
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
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Relations</div>
          <div className="space-y-1">
            {relations.map((relation) => {
              const Icon = relation.icon;
              return (
                <button
                  key={relation.type}
                  onClick={() => {
                    // Relations are created by dragging from handles
                    onClose();
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{relation.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
