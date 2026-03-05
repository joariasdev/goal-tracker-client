import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { navigation } from "../utils/navigation";

function ProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    navigation.navigate = navigate;
  }, [navigate]);

  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
