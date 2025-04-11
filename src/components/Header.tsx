import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

const Header = () => {
  const { logout, userRole } = useAuth();
  
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <img 
            src="/maharashtra-gov-logo.png" 
            alt="Maharashtra Government Logo" 
            className="h-10 w-10 object-contain"
            onError={(e) => {
              console.error('Error loading logo in header');
              e.currentTarget.style.display = 'none';
            }}
          />
          <div>
            <h1 className="text-lg font-semibold">Maharashtra Government</h1>
            <p className="text-xs text-muted-foreground">Scheme Performance Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <span>{userRole === 'admin' ? 'Administrator' : 'General User'}</span>
          </div>
          
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
