import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldCheck, Activity, Settings } from 'lucide-react';
import './Sidebar.css';

export const AdminSidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-heading">SYSTEM ADMIN</p>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/admin" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`} end>
              <LayoutDashboard size={20} />
              <span>Platform Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/approvals" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <ShieldCheck size={20} />
              <span>Verify Advisors</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Users size={20} />
              <span>Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/activity" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Activity size={20} />
              <span>System Health Logs</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-mt-auto sidebar-section">
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/admin/settings" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Settings size={20} />
              <span>Platform Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
