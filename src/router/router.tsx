import { useAuth } from "@/contexts/auth-context";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { IAuthContextType } from "@/types/auth-context";
import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { routes } from "./routes";
import RootLayout from "@/layouts/RootLayout";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated = false, user } = useAuth() as IAuthContextType;
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const storedUser = localStorage.getItem("user");

  //   if (storedToken && storedUser && !isAuthenticated) {
  //     return;
  //   }

  //   if (!storedToken || !storedUser) {
  //     navigate(routes.login, { replace: true });
  //   }
  // }, [isAuthenticated, navigate]);

  // return isAuthenticated ? <Outlet /> : null;
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: routes.home,
            element: <Home />,
          },
        ],
      },
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.register,
        element: <Register />,
      },
      {
        path: "*",
        element: <Navigate to={routes.login} replace />,
      },
    ],
  },
]);

export default router;
