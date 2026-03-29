import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, BookOpen, Settings } from 'lucide-react';
import './Sidebar.css';

export const AdvisorSidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-heading">ADVISOR MENU</p>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/advisor" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`} end>
              <LayoutDashboard size={20} />
              <span>Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/advisor/farmers" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Users size={20} />
              <span>My Assignments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <MessageSquare size={20} />
              <span>Farmer Inquiries</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-heading">RESOURCES</p>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/knowledge" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <BookOpen size={20} />
              <span>Knowledge Base</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-mt-auto sidebar-section">
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/settings" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Settings size={20} />
              <span>Profile Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
