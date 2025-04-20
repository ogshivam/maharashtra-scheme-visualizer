
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { SchemesProvider } from '@/contexts/SchemesContext';
import App from './App';
import './index.css';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import PublicServiceDeliveryPage from '@/pages/PublicServiceDeliveryPage';
import InfrastructurePage from '@/pages/InfrastructurePage';
import EconomicGrowthPage from '@/pages/EconomicGrowthPage';
import EnvironmentalPage from '@/pages/EnvironmentalPage';
import NotFound from '@/pages/NotFound';
import DistrictView from '@/pages/DistrictView';
import Index from '@/pages/Index';

// Define the router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <PublicServiceDeliveryPage />,
          },
          {
            path: 'public-service-delivery',
            element: <PublicServiceDeliveryPage />,
          },
          {
            path: 'infrastructure',
            element: <InfrastructurePage />,
          },
          {
            path: 'economic-growth',
            element: <EconomicGrowthPage />,
          },
          {
            path: 'environmental',
            element: <EnvironmentalPage />,
          },
        ],
      },
      {
        path: 'district-view',
        element: <DistrictView />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

// Render the app with the router provider and context providers
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SchemesProvider>
        <RouterProvider router={router} />
      </SchemesProvider>
    </AuthProvider>
  </React.StrictMode>,
);
