import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FarmerSidebar } from './FarmerSidebar';

export const FarmerLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content" style={{ display: 'flex', flexDirection: 'row' }}>
        <FarmerSidebar />
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
