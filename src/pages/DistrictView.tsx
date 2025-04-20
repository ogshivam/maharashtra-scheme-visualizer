
import React from 'react';
import Header from '@/components/Header';
import DistrictDataView from '@/components/DistrictDataView';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DistrictView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <div className="container px-4 py-6 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">District Dashboard</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Switch to Category View
          </Button>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            This view organizes data by districts, departments, and schemes, providing a hierarchical view of 
            Maharashtra's government initiatives and their performance metrics.
          </p>
        </div>
        
        <DistrictDataView />
      </div>
    </div>
  );
};

export default DistrictView;
