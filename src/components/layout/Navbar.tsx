import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Bell, Search, Menu, User } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="navbar-menu-btn d-lg-none">
          <Menu size={24} />
        </button>
        <Link to="/" className="navbar-logo">
          <Sprout size={28} className="text-primary" />
          <span>Agri_Smart</span>
        </Link>
      </div>

      <div className="navbar-center hidden-mobile">
        <div className="navbar-search">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search crops, tasks, advisors..." />
        </div>
      </div>

      <div className="navbar-right">
        <button className="navbar-icon-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        <Link to="/login" className="navbar-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <span className="hidden-mobile">Sign In</span>
        </Link>
      </div>
    </nav>
  );
};
