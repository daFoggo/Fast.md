import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { Download, Edit2, Eye, Save } from "lucide-react";
import { FaFilePdf, FaMarkdown } from "react-icons/fa";

const EditorMenu = ({
  view,
  setView,
  handleExportPDF,
  handleExportMarkdown,
}: IEditorMenuProps) => {
  return (
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
        <TooltipContent>{view === "edit" ? "Preview" : "Edit"}</TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button>
            <Save className="size-2" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Save</TooltipContent>
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
    </div>
  );
};

export default EditorMenu;
