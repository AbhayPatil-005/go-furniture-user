import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userEmail = useSelector((state) => state.auth.userEmail);

  if (!userEmail) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;