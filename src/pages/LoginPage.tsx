
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the path to redirect to after login (default to dashboard)
  const from = (location.state as { from: { pathname: string } })?.from?.pathname || "/dashboard";

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
      toast({
        title: "Login successful",
        description: `You are now logged in as a ${selectedRole === 'admin' ? 'Administrator' : 'General User'}`,
      });
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-[linear-gradient(135deg,rgba(255,153,0,0.1),rgba(0,128,0,0.1))]">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <img src="/maharashtra-gov-logo.png" 
                 alt="Maharashtra Government Logo" 
                 className="h-20 w-20 object-contain"
                 onError={(e) => {
                   console.error('Error loading logo in login page');
                   e.currentTarget.style.display = 'none';
                 }}
            />
          </div>
          <CardTitle className="text-2xl text-center">Government of Maharashtra</CardTitle>
          <CardDescription className="text-center">
            Scheme Performance Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-center">
            <p className="text-sm text-muted-foreground">Select your role to continue</p>
          </div>
          
          <div className="space-y-3">
            <Button
              type="button"
              variant={selectedRole === "general" ? "default" : "outline"}
              className={`w-full ${selectedRole === "general" ? "bg-dashboardBlue hover:bg-dashboardBlue/90" : ""}`}
              onClick={() => setSelectedRole("general")}
            >
              General User
            </Button>
            
            <Button
              type="button"
              variant={selectedRole === "admin" ? "default" : "outline"}
              className={`w-full ${selectedRole === "admin" ? "bg-primary hover:bg-primary/90" : ""}`}
              onClick={() => setSelectedRole("admin")}
            >
              Administrator
            </Button>
          </div>
          
          <Button
            className="w-full mt-4 bg-dashboardBlue hover:bg-dashboardBlue/90"
            disabled={!selectedRole}
            onClick={handleLogin}
          >
            Login
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            This is a prototype. No actual authentication is performed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
