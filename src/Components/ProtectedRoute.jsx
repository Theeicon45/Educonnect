import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // Check for the token
  if (!authToken) {
    return <Navigate to="/Login" />; // Redirect to login if token is missing
  }
  return children; // Render protected content
};

export default ProtectedRoute;
