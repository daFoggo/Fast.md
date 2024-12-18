export interface IEditorMenuProps {
  view: "edit" | "preview";
  setView: (view: "edit" | "preview") => void;
  handleExportPDF: () => void;
  handleExportMarkdown: () => void;
  handleSaveFile: () => void;
  handleDeleteFile: () => void;
}
