import { useAuth } from "@/contexts/auth-context";
import RootLayout from "@/layouts/RootLayout";
import FileEdit from "@/pages/FileEdit";
import FileList from "@/pages/FileList";
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

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated = false } = useAuth() as IAuthContextType;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && !isAuthenticated) {
      return;
    }

    if (!storedToken || !storedUser) {
      navigate(routes.login, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : null;
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
            path: "/",
            element: <Navigate to={routes.fileList} replace />,
          },
          {
            path: "/file-list",
            element: <FileList />,
          },
          {
            path: routes.dynamicFile,
            element: <FileEdit/>,
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
