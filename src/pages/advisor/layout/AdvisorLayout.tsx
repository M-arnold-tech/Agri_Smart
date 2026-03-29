import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdvisorNavbar } from './AdvisorNavbar';
import { AdvisorSidebar } from './AdvisorSidebar';

export const AdvisorLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <AdvisorNavbar onMenuClick={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            onClick={closeSidebar}
          />
        )}
        
        <AdvisorSidebar isOpen={isSidebarOpen} />
        <main className="flex-1 p-6 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
