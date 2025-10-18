import { memo, useState, useCallback } from 'react';
import { NodeProps, NodeResizer } from '@xyflow/react';
import { FileCode } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const MarkdownNode = memo(({ data, selected }: NodeProps) => {
  const [localText, setLocalText] = useState<string>((data as any).text || '');
  const [isFocused, setIsFocused] = useState(false);

  const handleTextChange = useCallback((newText: string) => {
    setLocalText(newText);
    (data as any).text = newText;
  }, [data]);

  return (
    <div className="rounded-lg border-2 border-primary bg-card shadow-lg w-full h-full min-w-[200px] min-h-[100px]">
      <NodeResizer
        minWidth={200}
        minHeight={100}
        isVisible={selected}
        lineClassName="border-primary"
        handleClassName="h-3 w-3 !bg-primary border-2 border-card rounded-sm"
      />
      
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-primary/20 rounded-t-md border-b border-primary">
        <FileCode className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-primary">Markdown</span>
      </div>

      {/* Content */}
      <div className="px-3 py-2 h-[calc(100%-40px)] overflow-auto">
        {isFocused ? (
          <textarea
            value={localText}
            onChange={(e) => handleTextChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="bg-transparent text-xs w-full h-full outline-none resize-none font-mono"
            placeholder="Enter markdown text..."
            autoFocus
          />
        ) : (
          <div
            onClick={() => setIsFocused(true)}
            className="prose prose-sm prose-invert max-w-none cursor-text h-full"
          >
            {localText ? (
              <ReactMarkdown>{localText}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground text-xs">Click to enter markdown...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

MarkdownNode.displayName = 'MarkdownNode';
