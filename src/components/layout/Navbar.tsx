import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sprout, Bell, Search, Menu, User } from "lucide-react";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) return null;

  return (
    <nav className="h-16 bg-surface border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center lg:hidden text-text-muted hover:text-text-main">
          <Menu size={24} />
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-primary-dark"
        >
          <Sprout size={28} className="text-primary" />
          <span className="hidden md:inline">Agri_Smart</span>
        </Link>
      </div>

      <div className="flex-1 max-w-[480px] mx-8 hidden md:block">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search crops, tasks, advisors..."
            className="w-full py-2 pl-10 pr-4 rounded-sm border border-gray-200 bg-background transition-all text-xs focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-bg focus:bg-surface"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex items-center justify-center w-10 h-10 rounded-sm text-text-muted hover:bg-background hover:text-text-main transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 bg-red-500 text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-sm border-2 border-surface">
            3
          </span>
        </button>
        <Link
          to="/login"
          className="flex items-center gap-3 cursor-pointer p-1 rounded-sm transition-all hover:bg-background"
        >
          <div className="bg-primary-bg text-primary w-9 h-9 rounded-sm flex items-center justify-center">
            <User size={20} />
          </div>
          <span className="font-medium text-xs pr-2 hidden md:block">
            Sign In
          </span>
        </Link>
      </div>
    </nav>
  );
};
