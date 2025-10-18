import { memo, useState, useCallback } from 'react';
import { NodeProps, NodeResizer } from '@xyflow/react';
import { FileText } from 'lucide-react';

export const UMLNoteNode = memo(({ data, selected }: NodeProps) => {
  const [localText, setLocalText] = useState<string>((data as any).text || '');

  const handleTextChange = useCallback((newText: string) => {
    setLocalText(newText);
    (data as any).text = newText;
  }, [data]);

  return (
    <div className="rounded-lg border-2 border-uml-note bg-card shadow-lg w-full h-full min-w-[200px] min-h-[100px]">
      <NodeResizer
        minWidth={200}
        minHeight={100}
        isVisible={selected}
        lineClassName="border-uml-note"
        handleClassName="h-3 w-3 !bg-uml-note border-2 border-card rounded-sm"
      />
      
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-uml-note/20 rounded-t-md border-b border-uml-note">
        <FileText className="h-4 w-4 text-uml-note" />
        <span className="text-sm font-semibold text-uml-note">Note</span>
      </div>

      {/* Text Content */}
      <div className="px-3 py-2 h-[calc(100%-40px)]">
        <textarea
          value={localText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="bg-transparent text-xs w-full h-full outline-none resize-none"
          placeholder="Enter note text..."
        />
      </div>
    </div>
  );
});

UMLNoteNode.displayName = 'UMLNoteNode';
