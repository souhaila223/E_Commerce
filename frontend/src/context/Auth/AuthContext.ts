import { createContext, useContext } from "react";
import { Product } from "../../types/Product";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  myOrders: any[];
  allUsers: any[];
  allOrders: any[];
  products: Product[];
  login: (username: string, token: string, isAdmin: boolean) => void;
  logout: () => void;
  getMyOrders: () => void;
  getAllUsers: () => void;
  getAllOrders: () => void; 
  updateUserStatus: (userId: string, isAdmin: boolean) => void;
  // resetPassword: (userId: string, newPassword: string) => void;
  deleteUser: (userId: string) => void;
  deleteProduct: (productId: string) => void;
  setProducts: (products: Product[]) => void;
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
  products: [],
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
  getAllUsers: () => {},
  getAllOrders: () => {},
  updateUserStatus: () => {},
  // resetPassword: () => {},
  deleteUser: () => {},
  deleteProduct: () => {},
  setProducts: () => {},
  updateOrderStatus: () => {},
});

export const useAuth = () => useContext(AuthContext);
