import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

// This route is like jwt middleware it's a route middleware thzt you cannot proceed until passing throw it and check the authentification :)

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet/>  // Renders the child route's element, if there is one.
}

export default ProtectedRoute;