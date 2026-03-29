import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  CloudSun,
  CalendarClock,
  Users,
  Settings,
} from "lucide-react";

interface FarmerSidebarProps {
  isOpen?: boolean;
  onItemClick?: () => void;
}

export const FarmerSidebar: React.FC<FarmerSidebarProps> = ({
  isOpen,
  onItemClick,
}) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 text-xs rounded-md text-[15px] font-medium transition-all duration-160 ${
      isActive
        ? "bg-primary-bg text-primary-dark"
        : "text-text-muted hover:bg-background hover:text-text-main"
    }`;

  return (
    <aside
      className={`bg-surface border-r border-gray-200 h-full flex-col p-4 overflow-y-auto hidden md:flex min-w-[260px] z-40 transition-transform duration-300 ${
        isOpen
          ? "translate-x-0 flex! fixed inset-y-16 left-0 shadow-2xl h-[calc(100vh-64px)]"
          : "-translate-x-full md:translate-x-0"
      }`}
    >
      

      <div className="my-8">
        <ul className="list-none flex flex-col gap-1">
          <li>
            <NavLink
              to="/farmer"
              end
              className={getLinkClass}
              onClick={onItemClick}
            >
              <LayoutDashboard size={16} />
              <span className="text-xs font-semibold">My Farm</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/farmer/chat"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <MessageSquare size={16} />
              <span className="text-xs font-semibold">Advisor Messages</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <p className="text-[11px] font-bold text-text-light tracking-wider px-3 mb-3 uppercase">
          GROWTH & TRACKING
        </p>
        <ul className="list-none flex flex-col gap-1">
          <li>
            <NavLink
              to="/farmer/calendar"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <CalendarClock size={16} />
              <span className="text-xs font-semibold">Crop Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/farmer/weather"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <CloudSun size={16} />
              <span className="text-xs font-semibold">Local Weather</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/farmer/groups"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <Users size={16} />
              <span className="text-xs font-semibold">Community Groups</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/farmer/knowledge"
              className={getLinkClass}
              onClick={onItemClick}
            >
              <BookOpen size={16} />
              <span className="text-xs font-semibold">Library</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mt-auto mb-2">
        <ul className="list-none flex flex-col gap-1">
          <li>
            <NavLink to="/farmer/settings" className={getLinkClass}>
              <Settings size={16} />
              <span className="text-xs font-semibold">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
