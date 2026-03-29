import React from "react";
import { Link } from "react-router-dom";
import useGroups from "../../../hooks/useGroups";
import useAuth from "../../../hooks/useAuth";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import {
  Users,
  MapPin,
  Loader2,
  RefreshCw,
  SendHorizonal,
  UserPlus,
} from "lucide-react";

export const FarmerGroups: React.FC = () => {
  const { user } = useAuth();
  const { groups, isLoading, joinGroup, refreshGroups } = useGroups(
    user?.district,
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1 tracking-tight uppercase leading-none">
            Community Groups
          </h1>
          <p className="text-text-muted text-sm flex items-center gap-2 font-medium">
            <MapPin size={18} className="text-secondary" />
            Discover cooperative clusters in{" "}
            <span className="text-secondary font-semibold">
              {user?.district || "Your District"}
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refreshGroups()}
          disabled={isLoading}
          className=" border-secondary text-secondary hover:bg-secondary/10 font-semibold "
        >
          <RefreshCw
            size={16}
            className={isLoading ? "animate-spin mr-2" : "mr-2"}
          />
          Update Feed
        </Button>
      </header>

      {isLoading && groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center opacity-50">
          <Loader2 className="animate-spin text-secondary mb-4" size={48} />
          <p className="text-sm font-semibold uppercase tracking-widest leading-none">
            Finding local communities...
          </p>
        </div>
      ) : groups.length === 0 ? (
        <div className="p-20 bg-surface/50 border border-dashed border-gray-200 rounded-[40px] text-center">
          <Users className="mx-auto text-gray-300 mb-4 " size={64} />
          <h3 className="text-xl font-semibold text-text-main mb-2 uppercase tracking-tight">
            No Groups Found
          </h3>
          <p className="text-text-muted max-w-sm mx-auto leading-relaxed text-sm font-medium">
            We couldn't find any cooperative groups in your district yet. Why
            not start one or contact your advisor?
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {groups.map((group) => (
            <Card
              key={group.id}
              className="flex flex-col gap-4 p-5 group overflow-hidden relative border-none bg-white   transition-all rounded-3xl"
              hoverable
            >
              {/* Visual Accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary/30" />

              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-secondary/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <Users size={22} className="text-secondary" />
                </div>
                <div className="bg-surface/80 backdrop-blur-md border border-gray-100 px-3 py-1 rounded-full flex items-center gap-1.5 ">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-semibold uppercase tracking-tighter text-text-main">
                    {group.memberCount} members
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-main group-hover:text-secondary transition-colors leading-tight tracking-tight mb-1">
                  {group.name}
                </h3>
                <div className="flex items-center gap-1.5 text-secondary font-bold text-[10px] uppercase tracking-widest mb-3">
                  <MapPin size={10} />
                  {group.district}
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-medium line-clamp-2 italic">
                  {group.description ||
                    "Connecting farmers for regional productivity and shared resource access."}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50">
                {group.isMember ? (
                  <Link
                    to={`/farmer/groups/${group.id}`}
                    className="flex items-center justify-center w-full rounded-2xl bg-[#eff6ff] text-primary border border-primary/10 font-bold uppercase tracking-widest py-4 hover:bg-primary/5 transition-all text-[10px]"
                  >
                    <SendHorizonal size={14} className="mr-1.5" />
                    Enter Discussion
                  </Link>
                ) : (
                  <Button
                    size="sm"
                    fullWidth
                    variant="secondary"
                    onClick={() => joinGroup(group.id)}
                    disabled={isLoading}
                    className="rounded-2xl font-bold uppercase tracking-widest py-4 group-hover: transition-all text-[10px]"
                  >
                    <UserPlus size={14} className="mr-1.5" />
                    Join Group
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
