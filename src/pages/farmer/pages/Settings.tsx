import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Plus,
  ArrowRight,
  Loader2,
  Search,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Drawer } from "../../../components/ui/Drawer";
import useAuth from "../../../hooks/useAuth";
import useGroups, { useCreateGroup } from "../../../hooks/useGroups";
import { RWANDA_DISTRICTS } from "../../../constants/locations";

export const FarmerSettings: React.FC = () => {
  const { user, isLoading: isUserLoading } = useAuth();
  const {
    groups,
    isLoading: isGroupsLoading,
    joinGroup,
    refreshGroups,
  } = useGroups(user?.district);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isCreating,
    setValue,
  } = useCreateGroup(() => {
    setIsDrawerOpen(false);
    refreshGroups();
  });

  // Sync district when user loads
  useEffect(() => {
    if (user?.district) {
      setValue("district", user.district);
    }
  }, [user, setValue]);

  const filteredGroups = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isUserLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-fade-in pb-20 max-w-6xl mx-auto font-sans">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-surface-hover p-10 rounded-lg border border-gray-100  relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-sm blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-24 h-24 rounded-[32px] bg-primary flex items-center justify-center text-white  shadow-primary/30 border-4 border-white">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-[28px]"
                />
              ) : (
                <User size={48} />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-text-main tracking-tight uppercase leading-none mb-2">
                {user?.firstName} {user?.lastName}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-semibold rounded-sm uppercase tracking-widest  shadow-primary/20">
                  {user?.role}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-secondary-dark font-bold bg-secondary/10 px-3 py-1 rounded-sm">
                  <CheckCircle2 size={12} /> Verified Farmer
                </span>
              </div>
            </div>
          </div>
          <p className="text-text-muted text-xs font-medium">
            Join date: January 2024 • Member ID:{" "}
            {user?.id.slice(-8).toUpperCase()}
          </p>
        </div>

        <div className="flex gap-4 relative z-10">
          <Button
            variant="outline"
            className="rounded-2xl border font-bold px-6"
          >
            Edit Profile
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            variant="outline"
            className=" border border-red-500 font-bold px-6 text-red-500 hover:bg-red-50"
          >
            <LogOut size={16} className="mr-2" /> Log Out
          </Button>
        </div>
      </header>

      {/* Profile Details Grid */}
      <section>
        <div className="flex items-center justify-between mb-6 px-4">
          <h2 className="text-xl font-semibold text-text-main uppercase tracking-tighter flex items-center gap-3">
            <ShieldCheck className="text-primary" /> Personal Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          <Card className="flex flex-col gap-3 p-6 border-none   transition-all rounded-[30px] bg-white group">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">
                Email
              </p>
              <p className="text-xs text-text-main font-bold truncate">
                {user?.email}
              </p>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-6 border-none   transition-all rounded-[30px] bg-white group">
            <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">
                Phone
              </p>
              <p className="text-xs text-text-main font-bold">
                {user?.phone || "+250 7XX XXX XXX"}
              </p>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-6 border-none   transition-all rounded-[30px] bg-white group">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">
                District
              </p>
              <p className="text-xs text-text-main font-bold">
                {user?.district || "Not Set"}
              </p>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-6 border-none   transition-all rounded-[30px] bg-white group border border-transparent">
            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-gray-800 group-hover:text-white transition-all">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">
                Status
              </p>
              <p className="text-xs text-primary font-semibold uppercase">
                Active Member
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Cooperative Groups Section */}
      <section className="mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-4">
          <div>
            <h2 className="text-xl font-semibold text-text-main uppercase tracking-tighter flex items-center gap-3">
              <Users size={18} className="text-secondary" /> Cooperative Groups
            </h2>
            <p className="text-text-muted text-xs mt-1">
              Connect with local farmers in {user?.district} and beyond.
            </p>
          </div>

          <div className="flex flex-row whitespace-nowrap gap-4">
            <Input
              type="text"
              placeholder="Search groups..."
              className="min-w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => setIsDrawerOpen(true)}>
              <Plus size={16} /> Launch Group
            </Button>
          </div>
        </div>

        {isGroupsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-[32px]"></div>
            ))}
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="bg-surface/50 border border-dashed border-gray-200 rounded-lg p-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-sm bg-gray-100 flex items-center justify-center mb-6 text-gray-400">
              <Users size={40} />
            </div>
            <h3 className="text-xl font-semibold text-text-main uppercase mb-2">
              No Groups Found
            </h3>
            <p className="text-text-muted text-xs font-medium max-w-sm">
              Be the first to build a community in {user?.district}!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className=" border border-gray-200 rounded-lg bg-white overflow-hidden"
              >
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-10 h-10 rounded-sm bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                      <Users size={16} />
                    </div>
                    <span className="px-4 py-1.5 bg-accent text-white text-[10px] font-semibold rounded-sm uppercase">
                      {group.district}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-text-main mb-3 uppercase tracking-tight group-hover:text-primary transition-colors">
                    {group.name}
                  </h3>
                  <p className="text-text-muted text-xs font-medium line-clamp-2 mb-6 flex-1 italic">
                    "{group.description}"
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-sm bg-gray-200 border border-white"
                          ></div>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                        {group.memberCount} Members
                      </span>
                    </div>

                    <Button
                      size="sm"
                      className=" px-4 hover:bg-primary hover:text-white"
                      onClick={() => joinGroup(group.id)}
                    >
                      Join <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Create Group Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Launch Community"
        description="Start a local cooperative group"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            label="Group Name"
            placeholder="e.g. Musanze Sustainable Maize Coop"
            {...register("name")}
            error={errors.name?.message}
          />

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-text-main opacity-80">
              District Focus
            </label>
            <select
              className={`w-full px-4 py-2.5 bg-surface border rounded-sm text-xs font-bold appearance-none outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all cursor-pointer ${
                errors.district ? "border-red-500" : "border-gray-200"
              }`}
              {...register("district")}
            >
              {RWANDA_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight px-2">
                {errors.district.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-text-main opacity-80">
              Vision & Mission
            </label>
            <textarea
              className={`w-full px-6 py-4 bg-surface border rounded-2xl text-xs font-medium h-32 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none ${
                errors.description ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Briefly describe what your group aims to achieve..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight px-2">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-2xl font-bold py-4 h-auto border border-gray-100"
              onClick={() => setIsDrawerOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-2 rounded-2xl font-bold py-4 h-auto shadow-primary/30"
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Launch Community"}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
