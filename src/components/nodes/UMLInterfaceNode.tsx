import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { getNodeIcon } from '@/lib/uml-utils';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UMLInterfaceNode = memo(({ data }: NodeProps) => {
  const Icon = getNodeIcon('interface');

  const [localData, setLocalData] = useState<any>(() => ({
    name: (data as any).name || 'NewInterface',
    methods: (data as any).methods || [],
  }));

  const updateData = useCallback((updates: Partial<typeof localData>) => {
    setLocalData((prev: any) => {
      const newData = { ...prev, ...updates };
      Object.assign(data, newData);
      return newData;
    });
  }, [data]);

  const addMethod = useCallback(() => {
    const newMethods = [...localData.methods, { visibility: '+' as const, name: 'newMethod', params: [], returns: 'void' }];
    updateData({ methods: newMethods });
  }, [localData.methods, updateData]);

  const removeMethod = useCallback((index: number) => {
    const newMethods = localData.methods.filter((_: any, i: number) => i !== index);
    updateData({ methods: newMethods });
  }, [localData.methods, updateData]);

  return (
    <div className="rounded-lg border-2 border-uml-interface bg-card shadow-lg min-w-[240px]">
      {/* Connection Handles - all bidirectional */}
      <Handle 
        type="source" 
        position={Position.Top} 
        id="top"
        className="w-3 h-3 !bg-uml-interface hover:!bg-uml-interface/80" 
      />
      <Handle 
        type="source" 
        position={Position.Left} 
        id="left"
        className="w-3 h-3 !bg-uml-interface hover:!bg-uml-interface/80" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right"
        className="w-3 h-3 !bg-uml-interface hover:!bg-uml-interface/80" 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="bottom"
        className="w-3 h-3 !bg-uml-interface hover:!bg-uml-interface/80" 
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-uml-interface rounded-t-md">
        <Icon className="h-4 w-4 text-accent-foreground" />
        <input
          type="text"
          value={localData.name}
          onChange={(e) => updateData({ name: e.target.value })}
          className="bg-transparent text-accent-foreground font-semibold text-sm flex-1 outline-none border-none"
        />
      </div>
      <div className="px-3 py-1 text-xs text-center italic text-muted-foreground border-b border-border">
        «interface»
      </div>

      {/* Methods Section */}
      <div className="border-t border-border px-3 py-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-muted-foreground">Methods</span>
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={addMethod}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        {localData.methods.map((method: any, i: number) => (
          <div key={i} className="flex items-center gap-1 mb-1 group">
            <span className="text-xs">{method.visibility}</span>
            <input
              type="text"
              value={method.name}
              onChange={(e) => {
                const newMethods = [...localData.methods];
                newMethods[i] = { ...method, name: e.target.value };
                updateData({ methods: newMethods });
              }}
              className="bg-transparent text-xs flex-1 outline-none"
            />
            <span className="text-xs">()</span>
            <span className="text-xs text-muted-foreground">:</span>
            <input
              type="text"
              value={method.returns}
              onChange={(e) => {
                const newMethods = [...localData.methods];
                newMethods[i] = { ...method, returns: e.target.value };
                updateData({ methods: newMethods });
              }}
              className="bg-transparent text-xs w-16 outline-none"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 opacity-0 group-hover:opacity-100"
              onClick={() => removeMethod(i)}
            >
              <Trash2 className="h-2.5 w-2.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
});

UMLInterfaceNode.displayName = 'UMLInterfaceNode';
