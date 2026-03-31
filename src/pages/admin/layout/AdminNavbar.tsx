import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout,
  Bell,
  Search,
  Menu,
  User,
  CloudSun,
  LogOut,
  Mail,
  Shield,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

interface AdminNavbarProps {
  onMenuClick: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onMenuClick }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-16 bg-surface border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center lg:hidden text-text-muted hover:text-text-main transition-colors"
        >
          <Menu size={24} />
        </button>
        <Link
          to="/admin"
          className="flex items-center gap-2 font-bold text-xl text-primary-dark"
        >
          <img src="./AgriSmart logo.svg" alt="AgriSmart" />
          <span className="text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded-sm ml-1 hidden sm:inline uppercase font-bold tracking-widest">
            Super Admin
          </span>
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
            placeholder="Search users, audit logs, analytics..."
            className="w-full py-2 pl-10 pr-4 rounded-sm border border-gray-200 bg-background transition-all text-xs focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-bg focus:bg-surface"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-background rounded-sm border border-gray-200 mr-2">
          <CloudSun size={18} className="text-primary" />
          <span className="text-xs font-medium">
            {isLoading ? "..." : user?.district || "Rwanda"} • 21°C
          </span>
        </div>

        <button className="relative flex items-center justify-center w-10 h-10 rounded-sm text-text-muted hover:bg-background hover:text-text-main transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 bg-red-500 text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-sm border-2 border-surface">
            2
          </span>
        </button>

        {/* Profile Section */}
        <div className="relative" ref={popoverRef}>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 cursor-pointer p-1 rounded-sm transition-all hover:bg-background group"
          >
            <div className="bg-primary-bg text-primary w-9 h-9 rounded-sm flex items-center justify-center overflow-hidden group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-primary/10">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="hidden md:block pr-2">
              <p className="text-xs font-bold text-text-main leading-none">
                {isLoading
                  ? "..."
                  : `${user?.firstName || "Farmer"} ${user?.lastName || ""}`}
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-1">
                ID: {isLoading ? "..." : user?.id.slice(-4) || "0000"}
              </p>
            </div>
          </div>

          {/* Profile Popover */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-surface rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
              <div className="p-5 bg-primary/5 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-1">
                  <div className="w-12 h-12 rounded-sm bg-primary flex items-center justify-center text-white overflow-hidden  border-2 border-white">
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-text-main line-clamp-1">
                      {user?.firstName} {user?.lastName}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 bg-primary text-white font-bold rounded-sm uppercase tracking-tighter">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-text-muted group-hover:bg-white group-hover: transition-all">
                    <Mail size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">
                      Email Address
                    </p>
                    <p className="text-xs text-text-main font-medium truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-text-muted group-hover:bg-white group-hover: transition-all">
                    <Shield size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">
                      Account Role
                    </p>
                    <p className="text-xs text-text-main font-medium">
                      {user?.role === "FARMER" ? "Verified Farmer" : user?.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group font-bold"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <LogOut size={16} />
                  </div>
                  <span className="text-xs">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
