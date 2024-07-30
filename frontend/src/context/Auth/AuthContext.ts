import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  myOrders: any[];
  allUsers: any[];
  allOrders: any[];
  login: (username: string, token: string, isAdmin: boolean) => void;
  logout: () => void;
  getMyOrders: () => void;
  getAllUsers: () => void;
  getAllOrders: () => void; 
  updateUserStatus: (userId: string, isAdmin: boolean) => void;
  deleteUser: (userId: string) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  myOrders: [],
  allUsers: [],
  allOrders: [],
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
  getAllUsers: () => {},
  getAllOrders: () => {},
  updateUserStatus: () => {},
  deleteUser: () => {},
  updateOrderStatus: () => {},
});

export const useAuth = () => useContext(AuthContext);
