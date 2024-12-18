"use client";

import { Toolbar } from "@/components/Toolbar";
import { Textarea } from "@/components/ui/textarea";
import { IMarkdownEditorProps } from "@/types/markdown-editor";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { usePDF } from "react-to-pdf";
import EditorMenu from "../EditorMenu";
import { TooltipProvider } from "../ui/tooltip";

const MarkdownEditor = ({ fileData }: IMarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState(fileData?.content || ""); 
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [fileName, setFileName] = useState(fileData?.title || "fastmarkdown"); 
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toPDF, targetRef } = usePDF({ filename: `${fileName}.pdf` });

  useEffect(() => {
    if (fileData) {
      setMarkdown(fileData.content);
      setFileName(fileData.title);
    }
  }, [fileData]); 

  const handleInsert = (format: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selection = markdown.substring(start, end);

      let newText;
      if (selection) {
        newText = format.replace("{}", selection);
      } else {
        newText = format;
      }

      const newMarkdown =
        markdown.substring(0, start) + newText + markdown.substring(end);
      setMarkdown(newMarkdown);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + newText.length;
          textareaRef.current.selectionEnd = start + newText.length;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const handleExportPDF = () => {
    setView("preview");
    setTimeout(() => {
      toPDF();
    }, 100);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex justify-between items-center p-2 bg-muted shadow-sm border">
          <Toolbar onInsert={handleInsert} />
          <EditorMenu
            view={view}
            setView={setView}
            handleExportPDF={handleExportPDF}
            handleExportMarkdown={handleExportMarkdown}
          />
        </div>
        <div className="flex-grow overflow-hidden">
          {view === "edit" ? (
            <Textarea
              ref={textareaRef}
              className="w-full h-full rounded-none resize-none p-4"
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
              }}
              placeholder="Write down your ideas..."
            />
          ) : (
            <div
              ref={targetRef}
              className="p-4 overflow-auto h-full prose dark:prose-invert max-w-none"
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MarkdownEditor;