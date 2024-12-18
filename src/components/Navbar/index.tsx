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
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <h1 className="text-lg font-bold">fast.md</h1>
        {user ? (
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <UserMenu user={user} />
          </div>
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
    </header>
  );
};

export default Navbar;
