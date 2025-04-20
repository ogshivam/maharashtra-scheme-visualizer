
import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryNavigation from '@/components/CategoryNavigation';
import { Outlet } from 'react-router-dom';
import { useSchemes } from '@/contexts/SchemesContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import DistrictDataView from '@/components/DistrictDataView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getGovData } from '@/utils/dataUtils';

const Dashboard = () => {
  const { schemeCategories } = useSchemes();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('psd'); // Default to public service delivery
  const [view, setView] = useState<'category' | 'district'>('category');

  const maharashtraData = getGovData();
  const overallProgress = 68; // This would be calculated from actual data in a real app

  const switchView = (newView: 'category' | 'district') => {
    setView(newView);
    if (newView === 'district') {
      navigate('/district-view');
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Maharashtra Dashboard</h1>
          <Tabs defaultValue="category" className="w-full md:w-auto" onValueChange={(value) => switchView(value as 'category' | 'district')}>
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="category">Category View</TabsTrigger>
              <TabsTrigger value="district">District View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Konkan Division - Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={overallProgress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{overallProgress}% Complete</span>
                <span>{maharashtraData.districts.length} Districts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {view === 'category' && (
          <>
            <div className="mb-6">
              <CategoryNavigation 
                categories={schemeCategories} 
                activeCategory={activeCategory}
                onChange={handleCategoryChange} 
              />
            </div>
            
            <div className="mb-10">
              <Outlet />
            </div>
          </>
        )}
        
        {view === 'district' && (
          <div className="border-t pt-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">District-Department-Scheme Hierarchy View</h2>
            <p className="text-sm text-muted-foreground mb-6">
              This view provides district-based data structure. Select a district, department, 
              and scheme to view its KPIs. This structure provides more granular control and role-based access.
            </p>
            <DistrictDataView />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
