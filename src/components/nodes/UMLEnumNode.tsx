import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { getNodeIcon } from '@/lib/uml-utils';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UMLEnumNode = memo(({ data }: NodeProps) => {
  const Icon = getNodeIcon('enum');
  const values: any[] = (data as any).values || [];

  const addValue = () => {
    const newValues = [...values, 'NEW_VALUE'];
    (data as any).values = newValues;
  };

  const removeValue = (index: number) => {
    (data as any).values = values.filter((_: any, i: number) => i !== index);
  };

  return (
    <div className="rounded-lg border-2 border-uml-enum bg-card shadow-lg min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-uml-enum rounded-t-md">
        <Icon className="h-4 w-4 text-accent-foreground" />
        <input
          type="text"
          value={(data as any).name}
          onChange={(e) => ((data as any).name = e.target.value)}
          className="bg-transparent text-accent-foreground font-semibold text-sm flex-1 outline-none border-none"
        />
      </div>
      <div className="px-3 py-1 text-xs text-center italic text-muted-foreground border-b border-border">
        «enumeration»
      </div>

      {/* Values Section */}
      <div className="border-t border-border px-3 py-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-muted-foreground">Values</span>
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={addValue}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        {values.map((value: string, i: number) => (
          <div key={i} className="flex items-center gap-1 mb-1 group">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                const newValues = [...values];
                newValues[i] = e.target.value;
                (data as any).values = newValues;
              }}
              className="bg-transparent text-xs flex-1 outline-none uppercase"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 opacity-0 group-hover:opacity-100"
              onClick={() => removeValue(i)}
            >
              <Trash2 className="h-2.5 w-2.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
});

UMLEnumNode.displayName = 'UMLEnumNode';
