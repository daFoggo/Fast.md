import { routes } from "@/router/routes";
import { IAuthContextType, IUser } from "@/types/auth-context";
import { LOGIN_IP, REGISTER_IP } from "@/utils/ip";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isTokenValid = (token: string): boolean => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp ? decodedToken.exp > currentTime : false;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && isTokenValid(storedToken)) {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (name: string, password: string) => {
    try {
      const response = await axios.post(LOGIN_IP, {
        name,
        password,
      });

      if (response.data.success) {
        const { accessToken, user } = response.data.payload;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(accessToken);
        setUser(user);
        setIsAuthenticated(true);

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const register = async (name: string, password: string) => {
    try {
      const response = await axios.post(REGISTER_IP, {
        name,
        password,
      });

      if (response.data.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Register failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
