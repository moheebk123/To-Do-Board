import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isUserAllowed }) => {
  if (isAuthenticated) {
    return isUserAllowed ? <Outlet /> : <Navigate to="/not-allowed" />;
  } else {
    return isUserAllowed ? <Navigate to="/login" /> : <Outlet />;
  }
};

export default ProtectedRoute;
