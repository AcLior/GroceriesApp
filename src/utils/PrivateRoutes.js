import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const PrivateRoutes = () => {
  const { authenticated } = useAuth();

  return authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
