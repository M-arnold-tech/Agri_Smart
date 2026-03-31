import React, { useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import {
  Loader2,
  Trash2,
  Search,
  Users as UsersIcon,
  AlertTriangle,
  Calendar,
  Shield,
  Mail,
  CheckCircle2,
  MinusCircle,
} from "lucide-react";
import useAdmin from "../../../hooks/useAdmin";
import { Input } from "../../../components/ui/Input";

interface AdminUsersProps {
  role?: "ADVISOR" | "FARMER";
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ role }) => {
  const { users, isLoading, error, deleteUser } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = (users || []).filter((u) => {
    const matchesRole = role ? u.role === role : true;
    const matchesSearch =
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const title =
    role === "ADVISOR"
      ? "Advisor Directory"
      : role === "FARMER"
        ? "Farmer Directory"
        : "Platform Users";
  const subtitle =
    role === "ADVISOR"
      ? "Browse and manage verified agricultural experts."
      : role === "FARMER"
        ? "View and support registered farmers."
        : "Comprehensive registry of all platform participants.";

  const handleDelete = async (id: string) => {
    if (
      window.confirm("Are you sure you want to deactivate this user account?")
    ) {
      await deleteUser(id);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "N/A";
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-text-main tracking-tight">
            {title}
          </h1>
          <p className="text-text-muted text-sm mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              className="min-w-[350px]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         
        </div>
      </header>

      {error && (
        <div className="mx-1 p-3 bg-error/5 border border-error/20 rounded-sm text-error text-xs flex items-center gap-3 animate-shake">
          <AlertTriangle size={16} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <Card className="p-0 overflow-hidden border-border bg-white  overflow-x-auto">
        {isLoading && filteredUsers.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-text-muted">
            <Loader2 className="animate-spin mb-4 text-primary" size={32} />
            <p className="text-sm font-medium">Scanning directory...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <Search size={32} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-text-main font-bold">No results found</p>
              <p className="text-text-muted text-xs">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-primary-bg/50 border-b border-primary/50 text-text-muted text-[10px] uppercase tracking-widest font-bold">
                <th className="p-4 pl-6 font-bold">Participant</th>
                <th className="p-4 font-bold flex items-center gap-1.5">
                  <Mail size={12} /> Email Address
                </th>
                <th className="p-4 font-bold">
                  <Shield size={12} className="inline mr-1.5" /> Role & Status
                </th>
                <th className="p-4 font-bold flex items-center gap-1.5">
                  <Calendar size={12} /> Joined Date
                </th>
                <th className="p-4 pr-6 font-bold text-right">
                  Administrative Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-primary-bg/30 transition-colors group"
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-sm bg-primary-bg border border-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                        {user.firstName?.charAt(0) || ""}
                        {user.lastName?.charAt(0) || ""}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-text-main text-sm">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-[10px] text-text-muted uppercase tracking-tighter">
                          ID: {user.id.split("-")[0]}...
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-text-muted font-medium">
                    {user.email}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest ${
                          user.role === "ADMIN"
                            ? "bg-error/10 text-error"
                            : user.role === "ADVISOR"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-primary/10 text-primary"
                        }`}
                      >
                        {user.role}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-[10px] font-bold ${user.isActive ? "text-secondary" : "text-gray-400 opacity-60"}`}
                      >
                        {user.isActive ? (
                          <CheckCircle2 size={10} />
                        ) : (
                          <MinusCircle size={10} />
                        )}
                        {user.isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-text-muted">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isLoading || user.role === "ADMIN"}
                      onClick={() => handleDelete(user.id)}
                      className={`text-[10px] font-bold uppercase tracking-widest h-8 px-3 ${user.isActive ? "text-error hover:bg-error/5 border-error/20" : "text-gray-400 opacity-50 cursor-not-allowed"}`}
                    >
                      <Trash2 size={12} className="mr-2" />
                      Deactivate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};
