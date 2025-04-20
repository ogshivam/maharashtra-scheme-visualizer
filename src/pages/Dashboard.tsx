
import React from 'react';
import Header from '@/components/Header';
import CategoryNavigation from '@/components/CategoryNavigation';
import { Outlet } from 'react-router-dom';
import { useSchemes } from '@/contexts/SchemesContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import DistrictDataView from '@/components/DistrictDataView';

const Dashboard = () => {
  const { schemeCategories } = useSchemes();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <div className="container px-4 py-6 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={() => navigate('/district-view')}>
            Switch to District View
          </Button>
        </div>
        
        <div className="mb-6">
          <CategoryNavigation />
        </div>
        
        <div className="mb-10">
          <Outlet />
        </div>
        
        <div className="border-t pt-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">New District-Department-Scheme Hierarchy View</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This is a preview of the new district-based data structure. Select a district, department, 
            and scheme to view its KPIs. This structure provides more granular control and role-based access.
          </p>
          <DistrictDataView />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
