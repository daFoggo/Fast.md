"use client";

import { Toolbar } from "@/components/Toolbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { routes } from "@/router/routes";
import { IMarkdownEditorProps } from "@/types/markdown-editor";
import { Download, Edit2, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MarkdownEditor = ({ fileId }: IMarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState("");
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [, setSelectedText] = useState("");
  const [fileName, setFileName] = useState("fastmarkdown");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({ filename: `${fileName}.pdf` });

  useEffect(() => {
    const files = JSON.parse(localStorage.getItem("markdownFiles") || "[]");
    const currentFile = files.find((file: any) => file.id === fileId);
    if (currentFile) {
      setMarkdown(currentFile.content);
      setFileName(currentFile.name);
    } else {
      navigate(routes.home);
    }
  }, [fileId, navigate]);

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

  const handleSave = () => {
    const files = JSON.parse(localStorage.getItem("markdownFiles") || "[]");
    const updatedFiles = files.map((file: any) =>
      file.id === fileId ? { ...file, content: markdown } : file
    );
    localStorage.setItem("markdownFiles", JSON.stringify(updatedFiles));
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

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setSelectedText(markdown.substring(start, end));
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex justify-between items-center p-2 bg-muted shadow-sm border">
          <Toolbar onInsert={handleInsert} />
          <div className="flex gap-2">
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  onClick={() => setView(view === "edit" ? "preview" : "edit")}
                >
                  {view === "edit" ? <Eye size={18} /> : <Edit2 size={18} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {view === "edit" ? "Preview" : "Edit"}
              </TooltipContent>
            </Tooltip>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <Download size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] sm:w-[425px] rounded-md">
                <DialogHeader className="items-center">
                  <DialogTitle>Export Options</DialogTitle>
                  <DialogDescription>
                    Choose the format to export your document.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button onClick={handleExportPDF}>Export as PDF</Button>
                  <Button onClick={handleExportMarkdown}>
                    Export as Markdown
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex-grow overflow-hidden">
          {view === "edit" ? (
            <Textarea
              ref={textareaRef}
              className="w-full h-full rounded-none resize-none p-4"
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
                handleSave();
              }}
              onSelect={handleSelectionChange}
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
