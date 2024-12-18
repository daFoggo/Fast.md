export interface IAuthContextType {
  user: User | null;
  token: string | null;
  login: (name: string, password: string) => Promise<boolean>;
  register: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface IUser {
  name: string;
}
