import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Base_URL } from "../../constants/baseUrl";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const IS_ADMIN_KEY = "isAdmin";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem(IS_ADMIN_KEY) === "true"
  );
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const isAuthenticated = !!token; // evaluate if token has a value

  const login = (username: string, token: string, isAdmin: boolean) => {
    setUsername(username);
    setToken(token);
    setIsAdmin(isAdmin);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(IS_ADMIN_KEY, String(isAdmin));
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(IS_ADMIN_KEY);
    setUsername(null);
    setToken(null);
    setIsAdmin(false);
  };

  const getMyOrders = async () => {
    const response = await fetch(`${Base_URL}/user/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return;

    const data = await response.json();

    setMyOrders(data);
  };

  const getAllUsers = async () => {
    const response = await fetch(`${Base_URL}/user/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setAllUsers(data);
    }
  };


  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`${Base_URL}/user/user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("User deleted successfully");
        await getAllUsers(); // Refresh the user list after deletion
      } else {
        const errorMessage = await response.text();
        console.error("Failed to delete user:", errorMessage);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        isAuthenticated,
        isAdmin,
        myOrders,
        allUsers,
        login,
        logout,
        getMyOrders,
        getAllUsers,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
