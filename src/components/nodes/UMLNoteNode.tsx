import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { FileText } from 'lucide-react';

export const UMLNoteNode = memo(({ data }: NodeProps) => {
  return (
    <div className="rounded-lg border-2 border-uml-note bg-card shadow-lg min-w-[200px] max-w-[300px]">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-uml-note/20 rounded-t-md border-b border-uml-note">
        <FileText className="h-4 w-4 text-uml-note" />
        <span className="text-sm font-semibold text-uml-note">Note</span>
      </div>

      {/* Text Content */}
      <div className="px-3 py-2">
        <textarea
          value={(data as any).text || ''}
          onChange={(e) => ((data as any).text = e.target.value)}
          className="bg-transparent text-xs w-full outline-none resize-none min-h-[60px]"
          placeholder="Enter note text..."
        />
      </div>
    </div>
  );
});

UMLNoteNode.displayName = 'UMLNoteNode';
