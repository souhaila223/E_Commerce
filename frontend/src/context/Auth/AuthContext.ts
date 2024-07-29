import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  myOrders: any[];
  allUsers: any[];
  login: (username: string, token: string, isAdmin: boolean) => void;
  logout: () => void;
  getMyOrders: () => void;
  getAllUsers: () => void;
  deleteUser: (userId: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  myOrders: [],
  allUsers: [],
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
  getAllUsers: () => {},
  deleteUser: () => {},
});

export const useAuth = () => useContext(AuthContext);
