
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <Button asChild>
          <a href={isAuthenticated ? "/dashboard" : "/"}>
            Go back to {isAuthenticated ? "Dashboard" : "Login"}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
