import React from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import {
  ShieldCheck,
  Users,
  Activity,
  MessageSquare,
  CheckCircle,
  XCircle,
} from "lucide-react";
import useAdmin from "../../../hooks/useAdmin";
import { Skeleton } from "../../../components/ui/Skeleton";

export const AdminDashboard: React.FC = () => {
  const { stats, pendingAdvisors, isLoading, error, approveAdvisor } = useAdmin();

  const handleApprove = async (id: string) => {
    await approveAdvisor(id);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            System Admin Dashboard
          </h1>
          <p className="text-text-muted text-sm">
            Manage platform users, verify advisors, and monitor system health.
          </p>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-sm text-error text-xs flex items-center gap-3 animate-shake">
          <XCircle size={18} />
          <p>{error}</p>
        </div>
      )}

      {/* System Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4 border-l-4 border-l-primary">
          <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary shrink-0">
             <Users size={24} />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-text-main">
              {isLoading && !stats ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                stats?.users.farmers || 0
              )}
            </div>
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider text-xs">Total Farmers</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-l-secondary">
          <div className="w-12 h-12 rounded-sm bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
             <ShieldCheck size={24} />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-text-main">
              {isLoading && !stats ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                stats?.users.advisors || 0
              )}
            </div>
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider text-xs">Verified Advisors</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-l-accent">
          <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center text-accent shrink-0">
             <Activity size={24} />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-text-main">
              {isLoading && !stats ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                stats?.users.pendingAdvisors || 0
              )}
            </div>
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider text-xs">Pending Approvals</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-l-[#0ea5e9]">
          <div className="w-12 h-12 rounded-sm bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] shrink-0">
             <MessageSquare size={24} />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-text-main">
              {isLoading && !stats ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                stats?.community.totalGroups || 0
              )}
            </div>
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider text-xs">Active Groups</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-text-main mb-1">
            Pending Advisor Approvals
          </h2>
          <Card className="flex flex-col gap-0 p-0 overflow-hidden divide-gray-200">
            {isLoading && pendingAdvisors.length === 0 ? (
              <div className="flex flex-col divide-y divide-gray-200">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4 flex-1">
                      <Skeleton variant="circular" className="w-12 h-12" />
                      <div className="flex flex-col gap-2 flex-1 max-w-[200px]">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <Skeleton className="h-9 w-20 rounded-md" />
                       <Skeleton className="h-9 w-24 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : pendingAdvisors.length === 0 ? (
              <div className="p-12 text-center text-text-muted flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                   <ShieldCheck size={32} />
                </div>
                <p className="font-medium text-xs">No pending advisor approvals.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {pendingAdvisors
                  .filter((advisor) => !advisor.isApproved)
                  .map((advisor) => (
                    <div
                      key={advisor.id}
                      className="flex items-center justify-between p-6 hover:bg-primary-bg/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-sm bg-primary-bg text-primary flex items-center justify-center font-bold text-lg">
                          {advisor.user?.firstName?.charAt(0) || ""}
                          {advisor.user?.lastName?.charAt(0) || ""}
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-main text-lg">
                            {advisor.user?.firstName} {advisor.user?.lastName}
                          </h4>
                          <p className="text-xs text-text-muted">
                            Specialization:{" "}
                            {advisor.specialization || "Not specified"}
                            {advisor.certificationNumber
                              ? ` • Cert: ${advisor.certificationNumber}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isLoading}
                          className="text-secondary border-secondary/30 hover:bg-secondary/5 text-xs"
                        >
                          Details
                        </Button>
                        <Button
                          onClick={() => handleApprove(advisor.userId)}
                          disabled={isLoading}
                        >
                          <CheckCircle size={16} /> Approve
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
