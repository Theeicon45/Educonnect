import { Navigate } from "react-router-dom";
import { getDecodedToken } from "../Utils/routeprotector"; // Import the method to get the decoded token

const ProtectedRoute = ({ children }) => {
  const decoded = getDecodedToken(); // Decode and verify the token

  if (!decoded || decoded.role !== "admin") {
    // If there's no decoded token or the role is not 'admin', redirect to login
    return <Navigate to="/login" replace />;
  }

  // If the role is admin, render the children (protected content)
  return children;
};

export default ProtectedRoute;
