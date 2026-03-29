import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Activity,
  Settings,
  Sprout,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onItemClick?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  onItemClick,
}) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-md text-[15px] font-medium transition-all duration-200 ${
      isActive
        ? "bg-primary-bg text-primary-dark"
        : "text-text-muted hover:bg-background hover:text-text-main"
    }`;

  return (
    <aside
      className={`bg-surface border-r border-gray-200 h-full flex-col p-4 overflow-y-auto hidden md:flex min-w-[260px] z-40 transition-transform duration-300 ${
        isOpen
          ? "translate-x-0 flex! fixed inset-y-0 left-0 shadow-2xl h-full"
          : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex items-center gap-2 mb-8 px-3">
        <Sprout size={28} className="text-primary-dark" />
        <span className="text-lg font-bold text-text-main tracking-tight">
          Admin System
        </span>
      </div>
      <div className="mb-8">
        <p className="text-[11px] font-bold text-text-light tracking-wider px-3 mb-3 uppercase">
          SYSTEM ADMIN
        </p>
        <ul className="list-none flex flex-col gap-1">
          <li>
            <NavLink
              to="/admin"
              className={getLinkClass}
              end
              onClick={onItemClick}
            >
              <LayoutDashboard size={20} />
              <span>Platform Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/approvals"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <ShieldCheck size={20} />
              <span>Verify Advisors</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <Users size={20} />
              <span>Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/activity"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <Activity size={20} />
              <span>System Health Logs</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mt-auto mb-2">
        <ul className="list-none flex flex-col gap-1">
          <li>
            <NavLink
              to="/admin/settings"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <Settings size={20} />
              <span>Platform Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
