import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";

import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/router/routes";
import { FaMarkdown } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4 flex items-center justify-between">
        <Link
          to={routes.fileList}
          className="flex items-center gap-2 justify-center"
        >
          <FaMarkdown className="size-6" />
          <h1 className="text-xl font-bold">fast.md</h1>
        </Link>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {user ? (
            <UserMenu user={user} logout={logout || (() => {})} />
          ) : location.pathname !== routes.register ? (
            <Link to={routes.register}>
              <Button>Register</Button>
            </Link>
          ) : (
            <Link to={routes.login}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
