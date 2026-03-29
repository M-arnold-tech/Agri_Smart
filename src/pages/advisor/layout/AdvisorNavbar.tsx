import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Bell, Search, Menu, User, ShieldCheck } from "lucide-react";

interface AdvisorNavbarProps {
  onMenuClick: () => void;
}

export const AdvisorNavbar: React.FC<AdvisorNavbarProps> = ({
  onMenuClick,
}) => {
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
          to="/advisor"
          className="flex items-center gap-2 font-bold text-xl text-primary-dark"
        >
          <Sprout size={28} className="text-secondary" />
          <span className="hidden md:inline">Agri_Smart</span>
          <span className="text-xs bg-secondary/20 text-text-main px-2 py-0.5 rounded-full ml-1 hidden sm:inline">
            Advisor
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
            placeholder="Search farmers, registrations, reports..."
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-200 bg-background transition-all text-xs focus:outline-none focus:border-secondary focus:ring-3 focus:ring-secondary/10 focus:bg-surface"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-secondary/10 rounded-full border border-secondary/20 mr-2 text-secondary-dark">
          <ShieldCheck size={18} />
          <span className="text-xs font-medium">Verified Advisor</span>
        </div>

        <button className="relative flex items-center justify-center w-10 h-10 rounded-full text-text-muted hover:bg-background hover:text-text-main transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 bg-accent text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-surface">
            5
          </span>
        </button>
        <div className="flex items-center gap-3 cursor-pointer p-1 rounded-full transition-all hover:bg-background group">
          <div className="bg-secondary/20 text-secondary-dark w-9 h-9 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all shadow-inner">
            <User size={20} />
          </div>
          <div className="hidden md:block pr-2">
            <p className="text-xs font-bold text-text-main leading-none">
              Sarah Advisor
            </p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-1">
              Specialty: Agronomy
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
