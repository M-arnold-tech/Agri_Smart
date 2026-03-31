import React from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Loader2, Trash2, Search, Users as UsersIcon, AlertTriangle } from "lucide-react";
import useAdmin from "../../../hooks/useAdmin";

export const AdminUsers: React.FC = () => {
  const { users, isLoading, error, deleteUser } = useAdmin();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to deactivate this user?")) {
      await deleteUser(id);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            Manage Users
          </h1>
          <p className="text-text-muted text-lg">
            View and manage all registered platform users.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              size={18}
            />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 rounded-lg bg-primary-bg border border-border focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <UsersIcon size={18} />
            Filter Role
          </Button>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-sm text-error text-sm flex items-center gap-3 animate-shake">
          <AlertTriangle size={18} />
          <p>{error}</p>
        </div>
      )}

      <Card className="p-0 overflow-hidden border border-border">
        {isLoading && users.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-text-muted">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-text-muted">
            <p>No users found in the system.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-bg border-b border-border text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-primary-bg/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-primary-bg text-primary flex items-center justify-center font-bold">
                          {user.firstName.charAt(0)}
                          {user.lastName.charAt(0)}
                        </div>
                        <span className="font-medium text-text-main">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-text-muted">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-sm text-xs font-medium ${
                          user.role === "ADMIN"
                            ? "bg-error/10 text-error"
                            : user.role === "ADVISOR"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-primary/10 text-primary"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isLoading || user.role === "ADMIN"}
                        onClick={() => handleDelete(user.id)}
                        className="text-error border-error/30 hover:bg-error/10"
                      >
                        <Trash2 size={16} className="md:mr-2" />
                        <span className="hidden md:inline">Deactivate</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
