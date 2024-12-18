import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-muted">
      <div className="p-2 flex justify-between items-center w-full">
        <p className="font-semibold text-xs">Developed by Foggo © 2024</p>
        <Link to="https://github.com/daFoggo/fast.md" target="_blank">
          <Button>
            <Github className="size-2" />
            Github
          </Button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
