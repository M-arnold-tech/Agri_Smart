import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, MessageSquare, CloudSun, CalendarClock, Settings } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  role?: 'FARMER' | 'ADVISOR' | 'ADMIN';
}

export const Sidebar: React.FC<SidebarProps> = ({ role = 'FARMER' }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-heading">MAIN MENU</p>
        <ul className="sidebar-nav">
          <li>
            <NavLink 
              to={role === 'ADMIN' ? '/admin' : role === 'FARMER' ? '/farmer' : '/advisor'} 
              className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          {role === 'ADVISOR' && (
            <li>
              <NavLink to="/advisor/farmers" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Users size={20} />
                <span>My Farmers</span>
              </NavLink>
            </li>
          )}

          {role === 'ADMIN' && (
            <li>
              <NavLink to="/admin/approvals" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Users size={20} />
                <span>Advisor Approvals</span>
              </NavLink>
            </li>
          )}
          
          {role !== 'ADMIN' && (
            <li>
              <NavLink to="/chat" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <MessageSquare size={20} />
                <span>Messages</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {role !== 'ADMIN' && (
        <div className="sidebar-section">
          <p className="sidebar-heading">PRODUCTIVITY</p>
          <ul className="sidebar-nav">
            {role === 'FARMER' && (
              <li>
                <NavLink to="/calendar" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                  <CalendarClock size={20} />
                  <span>Crop Calendar</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/knowledge" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <BookOpen size={20} />
                <span>Knowledge Base</span>
              </NavLink>
            </li>
            {role === 'FARMER' && (
              <li>
                <NavLink to="/weather" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                  <CloudSun size={20} />
                  <span>Weather Alerts</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}

      {role === 'ADMIN' && (
        <div className="sidebar-section">
          <p className="sidebar-heading">SYSTEM</p>
          <ul className="sidebar-nav">
            <li>
              <NavLink to="/admin/users" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Users size={20} />
                <span>Platform Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/settings" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Settings size={20} />
                <span>System Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      <div className="sidebar-mt-auto sidebar-section">
        <ul className="sidebar-nav">
          {role !== 'ADMIN' && (
            <li>
              <NavLink to="/settings" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Settings size={20} />
                <span>Settings</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};
