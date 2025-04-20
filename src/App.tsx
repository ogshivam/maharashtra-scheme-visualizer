
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";

// Context Providers
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login and remember where the user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
};

// Public route component - redirects to dashboard if already authenticated
const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Outlet />
    </TooltipProvider>
  </QueryClientProvider>
);

export { ProtectedRoute, PublicRoute };
export default App;
