import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { getNodeIcon, getNodeColor } from '@/lib/uml-utils';

export const AWSDynamoDBNode = memo(({ data, type, id }: NodeProps) => {
  const Icon = getNodeIcon(type as any);
  const color = getNodeColor(type as any);

  const [localData, setLocalData] = useState<any>(() => ({
    name: (data as any).name || 'DynamoDB Table',
    tableName: (data as any).tableName || '',
    region: (data as any).region || 'us-east-1',
    partitionKey: (data as any).partitionKey || '',
    sortKey: (data as any).sortKey || '',
  }));

  const updateData = useCallback((updates: Partial<typeof localData>) => {
    setLocalData((prev: any) => {
      const newData = { ...prev, ...updates };
      Object.assign(data, newData);
      return newData;
    });
  }, [data]);

  return (
    <div className={`rounded-lg border-2 bg-card shadow-lg min-w-[240px]`} style={{ borderColor: `hsl(var(--${color}))` }}>
      <Handle type="source" position={Position.Top} id="top-source" className="w-3 h-3 !bg-primary hover:!bg-primary/80" />
      <Handle type="target" position={Position.Top} id="top-target" className="w-3 h-3 !bg-primary hover:!bg-primary/80" />
      <Handle type="source" position={Position.Left} id="left-source" className="w-3 h-3 !bg-primary hover:!bg-primary/80" />
      <Handle type="target" position={Position.Left} id="left-target" className="w-3 h-3 !bg-primary hover:!bg-primary/80" />
      <Handle type="source" position={Position.Right} id="right-source" className="w-3 h-3 !bg-primary hover:!bg-primary/80" />
      <Handle type="target" position={Position.Right} id="right-target" className="w-3 h-3 !bg-primary hover:!bg-primary/80" />
      <Handle type="source" position={Position.Bottom} id="bottom-source" className="w-3 h-3 !bg-primary hover:!bg-primary/80" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" className="w-3 h-3 !bg-primary hover:!bg-primary/80" />

      <div className={`flex items-center gap-2 px-3 py-2 rounded-t-md`} style={{ backgroundColor: `hsl(var(--${color}))` }}>
        <Icon className="h-4 w-4 text-primary-foreground" />
        <input
          type="text"
          value={localData.name}
          onChange={(e) => updateData({ name: e.target.value })}
          className="bg-transparent text-primary-foreground font-semibold text-sm flex-1 outline-none border-none"
        />
      </div>

      <div className="border-t border-border px-3 py-2 space-y-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Table Name</label>
          <input
            type="text"
            value={localData.tableName}
            onChange={(e) => updateData({ tableName: e.target.value })}
            className="bg-transparent text-xs outline-none border-b border-border focus:border-primary"
            placeholder="my-table"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Region</label>
          <input
            type="text"
            value={localData.region}
            onChange={(e) => updateData({ region: e.target.value })}
            className="bg-transparent text-xs outline-none border-b border-border focus:border-primary"
            placeholder="us-east-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Partition Key</label>
          <input
            type="text"
            value={localData.partitionKey}
            onChange={(e) => updateData({ partitionKey: e.target.value })}
            className="bg-transparent text-xs outline-none border-b border-border focus:border-primary"
            placeholder="id"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Sort Key</label>
          <input
            type="text"
            value={localData.sortKey}
            onChange={(e) => updateData({ sortKey: e.target.value })}
            className="bg-transparent text-xs outline-none border-b border-border focus:border-primary"
            placeholder="timestamp"
          />
        </div>
      </div>
    </div>
  );
});

AWSDynamoDBNode.displayName = 'AWSDynamoDBNode';
