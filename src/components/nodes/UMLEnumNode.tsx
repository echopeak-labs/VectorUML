import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { getNodeIcon } from '@/lib/uml-utils';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UMLEnumNode = memo(({ data }: NodeProps) => {
  const Icon = getNodeIcon('enum');

  const [localData, setLocalData] = useState<any>(() => ({
    name: (data as any).name || 'NewEnum',
    values: (data as any).values || [],
  }));

  const updateData = useCallback((updates: Partial<typeof localData>) => {
    setLocalData((prev: any) => {
      const newData = { ...prev, ...updates };
      Object.assign(data, newData);
      return newData;
    });
  }, [data]);

  const addValue = useCallback(() => {
    const newValues = [...localData.values, 'NEW_VALUE'];
    updateData({ values: newValues });
  }, [localData.values, updateData]);

  const removeValue = useCallback((index: number) => {
    const newValues = localData.values.filter((_: any, i: number) => i !== index);
    updateData({ values: newValues });
  }, [localData.values, updateData]);

  return (
    <div className="rounded-lg border-2 border-uml-enum bg-card shadow-lg min-w-[200px]">
      {/* Connection Handles - both source and target for bidirectional connections */}
      <Handle type="source" position={Position.Top} id="top-source" className="w-3 h-3 !bg-uml-enum hover:!bg-uml-enum/80" />
      <Handle type="target" position={Position.Top} id="top-target" className="w-3 h-3 !bg-uml-enum hover:!bg-uml-enum/80" />
      
      <Handle type="source" position={Position.Left} id="left-source" className="w-3 h-3 !bg-uml-enum hover:!bg-uml-enum/80" />
      <Handle type="target" position={Position.Left} id="left-target" className="w-3 h-3 !bg-uml-enum hover:!bg-uml-enum/80" />
      
      <Handle type="source" position={Position.Right} id="right-source" className="w-3 h-3 !bg-uml-enum hover:!bg-uml-enum/80" />
      <Handle type="target" position={Position.Right} id="right-target" className="w-3 h-3 !bg-uml-enum hover:!bg-uml-enum/80" />
      
      <Handle type="source" position={Position.Bottom} id="bottom-source" className="w-3 h-3 !bg-uml-enum hover:!bg-uml-enum/80" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" className="w-3 h-3 !bg-uml-enum hover:!bg-uml-enum/80" />

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-uml-enum rounded-t-md">
        <Icon className="h-4 w-4 text-accent-foreground" />
        <input
          type="text"
          value={localData.name}
          onChange={(e) => updateData({ name: e.target.value })}
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
        {localData.values.map((value: string, i: number) => (
          <div key={i} className="flex items-center gap-1 mb-1 group">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                const newValues = [...localData.values];
                newValues[i] = e.target.value;
                updateData({ values: newValues });
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
