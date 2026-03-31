import React, { useEffect } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { 
  Users, 
  Search, 
  Plus, 
  MapPin, 
  User as UserIcon,
  Loader2,
  AlertTriangle
} from "lucide-react";
import useGroups from "../../../hooks/useGroups";
import { Input } from "../../../components/ui/Input";

export const AdminGroups: React.FC = () => {
  const { groups, isLoading, error, fetchGroups } = useGroups();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">
            Farmer Groups
          </h1>
          <p className="text-text-muted text-sm">
            Monitor and manage community farmer groups and cooperatives.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input
              type="text"
              placeholder="Search groups..."
              className="min-w-[300px]"
            />
          <Button className="flex items-center gap-2 whitespace-nowrap">
            <Plus size={18} />
            Create Group
          </Button>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-sm text-error text-xs flex items-center gap-3 animate-shake">
          <AlertTriangle size={18} />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && groups.length === 0 ? (
          <div className="col-span-full p-12 flex flex-col items-center justify-center text-text-muted">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Loading groups...</p>
          </div>
        ) : groups.length === 0 ? (
          <div className="col-span-full p-12 text-center text-text-muted border border-dashed border-border rounded-lg bg-surface">
            <p>No farmer groups found in the system.</p>
            <Button variant="ghost" className="mt-4" onClick={() => fetchGroups()}>
               Refresh List
            </Button>
          </div>
        ) : (
          groups.map((group) => (
            <Card key={group.id} className="flex flex-col gap-4 p-5 hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-sm bg-primary/10 text-primary flex items-center justify-center">
                  <Users size={24} />
                </div>
                <span className="px-2 py-1 rounded-sm bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                   {group.memberCount} Members
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">
                  {group.name}
                </h3>
                <p className="text-xs text-text-muted line-clamp-2 mt-1">
                  {group.description || "A community group for shared agricultural knowledge and support."}
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <MapPin size={14} className="text-primary" />
                  <span>{group.district} District</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <UserIcon size={14} className="text-secondary" />
                  <span>Lead by: Certified Advisor</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="text-error border-error/20 hover:bg-error/5">
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
