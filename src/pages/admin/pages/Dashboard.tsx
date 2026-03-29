import React from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import {
  ShieldCheck,
  Users,
  Activity,
  CheckCircle,
  XCircle,
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            System Admin Dashboard
          </h1>
          <p className="text-text-muted text-lg">
            Manage platform users, verify advisors, and monitor system health.
          </p>
        </div>
      </header>

      {/* System Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <Users size={32} className="text-primary shrink-0" />
          <div>
            <div className="text-2xl font-bold text-text-main">1,245</div>
            <div className="text-xs text-text-muted">Total Farmers</div>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <ShieldCheck size={32} className="text-secondary shrink-0" />
          <div>
            <div className="text-2xl font-bold text-text-main">48</div>
            <div className="text-xs text-text-muted">Verified Advisors</div>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <Activity size={32} className="text-[#0ea5e9] shrink-0" />
          <div>
            <div className="text-2xl font-bold text-text-main">99.9%</div>
            <div className="text-xs text-text-muted">System Uptime</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-text-main mb-1">
            Pending Advisor Approvals
          </h2>
          <Card className="flex flex-col gap-0 p-0 overflow-hidden divide-y divide-border">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-bg text-primary flex items-center justify-center font-bold text-lg">
                  EK
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-lg">
                    Emmanuel K.
                  </h4>
                  <p className="text-xs text-text-muted">
                    Agronomist • 5 years experience • Kigali
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <XCircle size={16} className="mr-2" /> Reject
                </Button>
                <Button size="sm">
                  <CheckCircle size={16} className="mr-2" /> Approve
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-bg text-primary flex items-center justify-center font-bold text-lg">
                  AM
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-lg">
                    Alice M.
                  </h4>
                  <p className="text-xs text-text-muted">
                    Soil Specialist • 3 years experience • Huye
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <XCircle size={16} className="mr-2" /> Reject
                </Button>
                <Button size="sm">
                  <CheckCircle size={16} className="mr-2" /> Approve
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-text-main mb-1">
            Recent Activity
          </h2>
          <Card className="p-0 overflow-hidden divide-y divide-border">
            <ul className="list-none">
              <li className="p-4 flex flex-col">
                <span className="text-xs font-medium text-text-main">
                  New Bulk SMS sent
                </span>
                <span className="text-xs text-text-muted">2 hours ago</span>
              </li>
              <li className="p-4 flex flex-col">
                <span className="text-xs font-medium text-text-main">
                  Weather API synced
                </span>
                <span className="text-xs text-text-muted">4 hours ago</span>
              </li>
              <li className="p-4 flex flex-col">
                <span className="text-xs font-medium text-text-main">
                  Advisor "Sarah A." verified
                </span>
                <span className="text-xs text-text-muted">Yesterday</span>
              </li>
            </ul>
            <div className="p-4">
              <Button variant="ghost" fullWidth>
                View Full Logs
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
