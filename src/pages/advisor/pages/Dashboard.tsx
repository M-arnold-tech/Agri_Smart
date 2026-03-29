import React from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Users, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

export const AdvisorDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            Advisor Dashboard
          </h1>
          <p className="text-text-muted text-lg">
            Manage your assigned farmers and pending consultations.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0f2fe] text-[#0369a1] text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 size={16} /> Verified Advisor
        </div>
      </header>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <Users size={32} className="text-primary shrink-0" />
          <div>
            <div className="text-2xl font-bold text-text-main">24</div>
            <div className="text-xs text-text-muted">Assigned Farmers</div>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <AlertCircle size={32} className="text-accent shrink-0" />
          <div>
            <div className="text-2xl font-bold text-text-main">5</div>
            <div className="text-xs text-text-muted">Pending Messages</div>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <FileText size={32} className="text-secondary shrink-0" />
          <div>
            <div className="text-2xl font-bold text-text-main">12</div>
            <div className="text-xs text-text-muted">Tasks Created</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-text-main mb-1">
            Farmer Inquiries
          </h2>
          <Card className="flex flex-col gap-0 p-0 overflow-hidden divide-y divide-border">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-bg text-primary flex items-center justify-center font-bold text-lg">
                  JM
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-lg">
                    Jean Marie
                  </h4>
                  <p className="text-xs text-text-muted">
                    Musanze • Potato yield dropping
                  </p>
                </div>
              </div>
              <Button size="sm">Reply</Button>
            </div>

            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-bg text-primary flex items-center justify-center font-bold text-lg">
                  CU
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-lg">
                    Chantal U.
                  </h4>
                  <p className="text-xs text-text-muted">
                    Bugesera • Watering schedule
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Reply
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="bg-primary text-white p-8 border-none shadow-xl flex flex-col items-start gap-4">
            <h3 className="text-2xl font-bold">Publish Resource</h3>
            <p className="text-xs opacity-90 leading-relaxed">
              Upload guides, manuals, and best practices for farmers to access
              offline in their library.
            </p>
            <Button variant="secondary" fullWidth className="mt-4 shadow-md">
              Upload PDF/Image
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
