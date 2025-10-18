import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps, useUpdateNodeInternals } from '@xyflow/react';
import { getNodeIcon, getNodeColor } from '@/lib/uml-utils';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UMLClassNode = memo(({ data, type, id }: NodeProps) => {
  const Icon = getNodeIcon(type as any);
  const color = getNodeColor(type as any);
  const updateNodeInternals = useUpdateNodeInternals();

  const [localData, setLocalData] = useState<any>(() => ({
    name: (data as any).name || 'NewClass',
    fields: (data as any).fields || [],
    methods: (data as any).methods || [],
  }));

  const updateData = useCallback((updates: Partial<typeof localData>) => {
    setLocalData((prev: any) => {
      const newData = { ...prev, ...updates };
      Object.assign(data, newData);
      return newData;
    });
  }, [data]);

  const addField = useCallback(() => {
    const newFields = [...localData.fields, { visibility: '+' as const, name: 'newField', type: 'string' }];
    updateData({ fields: newFields });
  }, [localData.fields, updateData]);

  const addMethod = useCallback(() => {
    const newMethods = [...localData.methods, { visibility: '+' as const, name: 'newMethod', params: [], returns: 'void' }];
    updateData({ methods: newMethods });
  }, [localData.methods, updateData]);

  const removeField = useCallback((index: number) => {
    const newFields = localData.fields.filter((_: any, i: number) => i !== index);
    updateData({ fields: newFields });
  }, [localData.fields, updateData]);

  const removeMethod = useCallback((index: number) => {
    const newMethods = localData.methods.filter((_: any, i: number) => i !== index);
    updateData({ methods: newMethods });
  }, [localData.methods, updateData]);

  return (
    <div className={`rounded-lg border-2 bg-card shadow-lg min-w-[240px]`} style={{ borderColor: `hsl(var(--${color}))` }}>
      {/* Handles removed for now - will implement proper connection system later */}

      {/* Header */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-t-md`} style={{ backgroundColor: `hsl(var(--${color}))` }}>
        <Icon className="h-4 w-4 text-primary-foreground" />
        <input
          type="text"
          value={localData.name}
          onChange={(e) => updateData({ name: e.target.value })}
          className="bg-transparent text-primary-foreground font-semibold text-sm flex-1 outline-none border-none"
        />
      </div>

      {/* Fields Section */}
      {(type === 'class' || type === 'abstract') && (
        <div className="border-t border-border px-3 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Fields</span>
            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={addField}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          {localData.fields.map((field: any, i: number) => (
            <div key={i} className="flex items-center gap-1 mb-1 group">
              <span className="text-xs">{field.visibility}</span>
              <input
                type="text"
                value={field.name}
                onChange={(e) => {
                  const newFields = [...localData.fields];
                  newFields[i] = { ...field, name: e.target.value };
                  updateData({ fields: newFields });
                }}
                className="bg-transparent text-xs flex-1 outline-none"
              />
              <span className="text-xs text-muted-foreground">:</span>
              <input
                type="text"
                value={field.type}
                onChange={(e) => {
                  const newFields = [...localData.fields];
                  newFields[i] = { ...field, type: e.target.value };
                  updateData({ fields: newFields });
                }}
                className="bg-transparent text-xs w-20 outline-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 opacity-0 group-hover:opacity-100"
                onClick={() => removeField(i)}
              >
                <Trash2 className="h-2.5 w-2.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Methods Section */}
      {(type === 'class' || type === 'interface' || type === 'abstract') && (
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
      )}
    </div>
  );
});

UMLClassNode.displayName = 'UMLClassNode';
