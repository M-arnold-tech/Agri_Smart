import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const DashboardLayout: React.FC<{ role?: 'FARMER' | 'ADVISOR' | 'ADMIN' }> = ({ role = 'FARMER' }) => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content" style={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar role={role} />
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
