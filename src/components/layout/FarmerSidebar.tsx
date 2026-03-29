import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, BookOpen, CloudSun, CalendarClock, Settings } from 'lucide-react';
import './Sidebar.css';

export const FarmerSidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-heading">FARMER MENU</p>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/farmer" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={20} />
              <span>My Farm</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <MessageSquare size={20} />
              <span>Advisor Messages</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-heading">GROWTH & TRACKING</p>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/calendar" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <CalendarClock size={20} />
              <span>Crop Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/weather" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <CloudSun size={20} />
              <span>Local Weather</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/knowledge" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <BookOpen size={20} />
              <span>Library</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-mt-auto sidebar-section">
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/settings" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
