import { ThemeProvider } from "@/components/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import router from "./router/router";


function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
