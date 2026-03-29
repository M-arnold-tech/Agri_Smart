import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  UserCheck,
  Settings,
  Sprout,
} from "lucide-react";

interface AdvisorSidebarProps {
  isOpen?: boolean;
  onItemClick?: () => void;
}

export const AdvisorSidebar: React.FC<AdvisorSidebarProps> = ({
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
        <Sprout size={28} className="text-secondary" />
        <span className="text-lg font-bold text-text-main tracking-tight">
          Advisor Hub
        </span>
      </div>
      <div className="mb-8">
        <p className="text-[11px] font-bold text-text-light tracking-wider px-3 mb-3 uppercase">
          ADVISOR MENU
        </p>
        <ul className="list-none flex flex-col gap-1">
          <li>
            <NavLink
              to="/advisor"
              className={getLinkClass}
              end
              onClick={onItemClick}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/advisor/farmers"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <UserCheck size={20} />
              <span>My Farmers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/advisor/chat"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <MessageSquare size={20} />
              <span>Consultations</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <p className="text-[11px] font-bold text-text-light tracking-wider px-3 mb-3 uppercase">
          RESOURCES
        </p>
        <ul className="list-none flex flex-col gap-1">
          <li>
            <NavLink
              to="/advisor/knowledge"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <BookOpen size={20} />
              <span>Knowledge Base</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mt-auto mb-2">
        <ul className="list-none flex flex-col gap-1">
          <li>
            <NavLink to="/advisor/settings" className={getLinkClass}>
              <Settings size={20} />
              <span>Profile Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
