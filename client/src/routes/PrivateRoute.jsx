import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#0048B0]"></div>
            </div>
        );
    }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  // Render children if user is authenticated
  return children;
}

export default PrivateRoute;
