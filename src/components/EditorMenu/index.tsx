import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IEditorMenuProps } from "@/types/editor-menu";
import { Download, Edit2, Eye, Save, Trash2 } from "lucide-react";
import { FaFilePdf, FaMarkdown } from "react-icons/fa";

const EditorMenu = ({
  view,
  setView,
  handleExportPDF,
  handleExportMarkdown,
  handleSaveFile,
  handleDeleteFile,
}: IEditorMenuProps) => {
  return (
    <div className="flex gap-2">
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            onClick={() => setView(view === "edit" ? "preview" : "edit")}
          >
            {view === "edit" ? (
              <Eye className="size-2" />
            ) : (
              <Edit2 className="size-2" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{view === "edit" ? "Preview" : "Edit"}</TooltipContent>
      </Tooltip>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon">
            <Download className="size-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95%] sm:w-[425px] rounded-md">
          <DialogHeader className="items-center">
            <DialogTitle>Export Options</DialogTitle>
            <DialogDescription>
              Choose the format to export your document.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center space-x-2 pt-4">
            <Button onClick={handleExportPDF}>
              PDF
              <FaFilePdf className="size-2" />
            </Button>
            <Button onClick={handleExportMarkdown}>
              Markdown
              <FaMarkdown className="size-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button onClick={handleSaveFile} size="icon">
            <Save className="size-2" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Save</TooltipContent>
      </Tooltip>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="destructive">
            <Trash2 className="sizr-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95%] sm:w-[425px] rounded-md">
          <DialogHeader>
            <DialogTitle className="text-left">Delete confirm</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center space-x-2 pt-4">
            <p>Are your sure that you want to delete this meeting?</p>
          </div>
          <DialogFooter className="flex flex-row gap-2 justify-end items-center">
            <DialogClose className="flex" asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteFile}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorMenu;
