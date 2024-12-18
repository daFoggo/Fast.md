import router from "./router/router";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} /> {/* RouterProvider at the top level */}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;