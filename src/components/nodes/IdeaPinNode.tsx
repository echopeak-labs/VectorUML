import { memo, useState, useCallback } from 'react';
import { NodeProps, Handle, Position } from '@xyflow/react';
import { Pin } from 'lucide-react';

export const IdeaPinNode = memo(({ data }: NodeProps) => {
  const [localText, setLocalText] = useState<string>((data as any).text || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = useCallback((newText: string) => {
    setLocalText(newText);
    (data as any).text = newText;
  }, [data]);

  return (
    <div className="relative">
      {/* Connection Handles */}
      <Handle type="source" position={Position.Top} className="w-2 h-2 !bg-primary opacity-0" />
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-primary opacity-0" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-primary opacity-0" />
      <Handle type="target" position={Position.Right} className="w-2 h-2 !bg-primary opacity-0" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-primary opacity-0" />
      <Handle type="target" position={Position.Bottom} className="w-2 h-2 !bg-primary opacity-0" />
      <Handle type="source" position={Position.Left} className="w-2 h-2 !bg-primary opacity-0" />
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-primary opacity-0" />

      {/* Glowing Red Pin Icon - Outside the box */}
      <div className="absolute -top-3 -left-3 z-20">
        <div 
          className="absolute inset-0 rounded-full blur-md animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, transparent 70%)',
            width: '32px',
            height: '32px',
          }}
        />
        <Pin 
          className="h-6 w-6 relative z-10 rotate-45" 
          style={{ 
            color: 'rgb(239, 68, 68)',
            filter: 'drop-shadow(0 0 8px rgb(239, 68, 68)) drop-shadow(0 0 4px rgb(239, 68, 68))'
          }} 
          fill="rgb(239, 68, 68)"
        />
      </div>

      {/* Text Box */}
      <div 
        className="flex items-center px-4 py-2.5 rounded-lg bg-primary shadow-lg min-w-[180px] max-w-[400px]"
        style={{
          boxShadow: '0 4px 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Editable Text */}
        {isEditing ? (
          <input
            type="text"
            value={localText}
            onChange={(e) => handleTextChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditing(false);
            }}
            className="bg-transparent text-primary-foreground font-semibold text-sm outline-none flex-1 placeholder:text-primary-foreground/50"
            placeholder="Enter idea..."
            autoFocus
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="text-primary-foreground font-semibold text-sm cursor-text flex-1"
          >
            {localText || 'Click to add idea...'}
          </div>
        )}
      </div>
    </div>
  );
});

IdeaPinNode.displayName = 'IdeaPinNode';
