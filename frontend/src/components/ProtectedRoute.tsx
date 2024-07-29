import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

// This route is like jwt middleware it's a route middleware thzt you cannot proceed until passing throw it and check the authentification :)

const ProtectedRoute = ({ isAdminRoute }: { isAdminRoute?: boolean }) => {
    const { isAuthenticated, isAdmin } = useAuth();
  
    if (!isAuthenticated ) {
      return <Navigate to="/login" replace />;
    }

    if (isAdminRoute && !isAdmin) {
        return <Navigate to="/" replace />;
      }
      
    return <Outlet/>  // Renders the child route's element, if there is one.
}

export default ProtectedRoute;