import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IToolbarProps } from "@/types/tool-bar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { tools } from "./constant";

export function Toolbar({ onInsert }: IToolbarProps) {
  return (
    <TooltipProvider>
      <div className="flex gap-1">
        {tools.map((tool, index) => (
          <div key={index}>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="hover:border-muted-foreground"
                  onClick={() => onInsert(tool.markdown)}
                >
                  {tool.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{tool.label}</TooltipContent>
            </Tooltip>
          </div>
        ))}

        <DropdownMenu>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:border-muted-foreground"
                >
                  H
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Heading</TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <DropdownMenuItem
                key={`h${level}`}
                onClick={() => onInsert(`${"#".repeat(level)} {}\n`)}
              >
                Heading {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
}

