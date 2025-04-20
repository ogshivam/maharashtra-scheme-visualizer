
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect authenticated users to the dashboard
      navigate("/dashboard");
    } else {
      // Redirect unauthenticated users to login
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
};

export default Index;
