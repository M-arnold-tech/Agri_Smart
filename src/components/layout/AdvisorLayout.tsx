import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AdvisorSidebar } from './AdvisorSidebar';

export const AdvisorLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content" style={{ display: 'flex', flexDirection: 'row' }}>
        <AdvisorSidebar />
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
