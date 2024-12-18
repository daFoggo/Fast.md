import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";

import { routes } from "@/router/routes";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
const Navbar = () => {
  const auth = useAuth();
  const user = auth?.user;
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">fast.md</h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {user ? (
            <UserMenu user={user} />
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
