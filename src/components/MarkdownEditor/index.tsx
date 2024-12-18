"use client";

import { Toolbar } from "@/components/Toolbar";
import { Textarea } from "@/components/ui/textarea";
import { IMarkdownEditorProps } from "@/types/markdown-editor";
import { MARKDOWN_IP } from "@/utils/ip";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { toast } from "sonner";
import EditorMenu from "../EditorMenu";
import { Input } from "../ui/input";
import { TooltipProvider } from "../ui/tooltip";
import { routes } from "@/router/routes";

const MarkdownEditor = ({ fileData }: IMarkdownEditorProps) => {
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState(fileData?.content || "");
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [title, setTitle] = useState(fileData?.title || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toPDF, targetRef } = usePDF({ filename: `${title}.pdf` });

  useEffect(() => {
    if (fileData) {
      setMarkdown(fileData.content);
      setTitle(fileData.title);
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
    link.download = `${title}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveFile = async () => {
    try {
      const resonse = await axios.put(`${MARKDOWN_IP}/${fileData.id}`, {
        title: title,
        content: markdown,
        tags: fileData.tags,
      });

      if (resonse.status === 200) {
        toast.success("File saved successfully");
      } else {
        toast.error("Failed to save file");
      }
    } catch (error) {
      toast.error("Failed to save file");
      console.error(error);
    }
  };

  const handleDeleteFile = async () => {
    try {
      const resonse = await axios.delete(`${MARKDOWN_IP}/${fileData.id}`);

      if (resonse.status === 200 || resonse.status === 204) {
        toast.success("File deleted successfully");
        navigate(routes.fileList);
      } else {
        toast.error("Failed to delete file");
      }
    } catch (error) {
      toast.error("Failed to delete file");
      console.error(error);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex justify-between items-center p-2 bg-muted shadow-sm">
          <Toolbar onInsert={handleInsert} />
          <EditorMenu
            view={view}
            setView={setView}
            handleExportPDF={handleExportPDF}
            handleExportMarkdown={handleExportMarkdown}
            handleSaveFile={handleSaveFile}
            handleDeleteFile={handleDeleteFile}
          />
        </div>
        <div className="px-4 py-2 bg-muted shadow-sm flex items-center">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-none text-lg font-semibold focus:ring-0 focus:ring-offset-0  text-center shadow-none
            "
            placeholder="Untitled Document"
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
