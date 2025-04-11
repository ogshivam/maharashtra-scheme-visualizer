import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context Providers
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SchemesProvider } from "./contexts/SchemesContext";

// Pages
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PublicServiceDeliveryPage from "./pages/PublicServiceDeliveryPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import EconomicGrowthPage from "./pages/EconomicGrowthPage";
import EnvironmentalPage from "./pages/EnvironmentalPage";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// App Routes
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Category detail pages */}
      <Route path="/public-service" element={
        <ProtectedRoute>
          <PublicServiceDeliveryPage />
        </ProtectedRoute>
      } />
      
      <Route path="/infrastructure" element={
        <ProtectedRoute>
          <InfrastructurePage />
        </ProtectedRoute>
      } />
      
      <Route path="/economic-growth" element={
        <ProtectedRoute>
          <EconomicGrowthPage />
        </ProtectedRoute>
      } />
      
      <Route path="/environmental" element={
        <ProtectedRoute>
          <EnvironmentalPage />
        </ProtectedRoute>
      } />
      
      {/* Legacy route - keep for backward compatibility */}
      <Route path="/dashboard/category/:categoryId" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SchemesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </SchemesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
