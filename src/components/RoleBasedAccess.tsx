
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LockKeyhole, Shield } from 'lucide-react';

interface RoleBasedAccessProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ 
  allowedRoles, 
  children, 
  fallback 
}) => {
  const { userRole } = useAuth();
  
  // Check if the current user role is in the allowed roles
  const hasAccess = allowedRoles.includes(userRole);
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  // Show fallback if provided, otherwise show default unauthorized message
  if (fallback) {
    return <>{fallback}</>;
  }
  
  return (
    <Alert variant="destructive" className="my-4">
      <Shield className="h-4 w-4" />
      <AlertTitle>Access Restricted</AlertTitle>
      <AlertDescription className="flex items-center gap-2">
        <LockKeyhole className="h-4 w-4" />
        <span>You don't have permission to access this section. Contact administrator for access.</span>
      </AlertDescription>
    </Alert>
  );
};

export default RoleBasedAccess;
