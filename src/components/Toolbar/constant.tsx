import { Bold, Code, Italic, Link, List, Quote, SeparatorHorizontal } from "lucide-react";

export const tools = [
  { icon: <Bold size={18} />, markdown: "**{}**", label: "Bold" },
  { icon: <Italic size={18} />, markdown: "*{}*", label: "Italic" },
  { icon: <List size={18} />, markdown: "- {}\n", label: "List" },
  { icon: <Link size={18} />, markdown: "[{}](url)", label: "Link" },
  { icon: <Quote size={18} />, markdown: "> {}\n", label: "Quote" },
  { icon: <Code size={18} />, markdown: "```\n{}\n```", label: "Code Block" },
  { icon: <SeparatorHorizontal size={18} />, markdown: "---\n", label: "Horizontal" },
];
