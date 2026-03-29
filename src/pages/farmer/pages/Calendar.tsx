import React from "react";
import useCropCalendar from "../../../hooks/useCropCalendar";
import useAuth from "../../../hooks/useAuth";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Sprout,
  Loader2,
  RefreshCw,
} from "lucide-react";

export const FarmerCalendar: React.FC = () => {
  const { user } = useAuth();
  const { tasks, isLoading, error, refreshTasks, updateTask } = useCropCalendar(
    user?.district,
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1 tracking-tight">
            Crop Calendar
          </h1>
          <p className="text-text-muted text-sm flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Showing seasonal activities for{" "}
            <span className="text-primary font-bold">
              {user?.district || "Your District"}
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refreshTasks()}
          disabled={isLoading}
          className=""
        >
          <RefreshCw
            size={16}
            className={isLoading ? "animate-spin mr-2" : "mr-2"}
          />
          Sync Calendar
        </Button>
      </header>

      {isLoading && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center opacity-50">
          <Loader2 className="animate-spin text-primary mb-4" size={48} />
          <p className="text-sm font-bold uppercase tracking-widest leading-none">
            Loading your seasonal tasks...
          </p>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-100 rounded-[32px] text-center">
          <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
          <p className="text-red-800 font-semibold mb-2 uppercase tracking-tighter text-lg">
            Sync Error
          </p>
          <p className="text-red-600 text-sm mb-6 max-w-sm mx-auto">{error}</p>
          <Button
            variant="primary"
            onClick={() => refreshTasks()}
            className="rounded-xl px-8 "
          >
            Retry Sync
          </Button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="p-20 bg-surface/50 border border-dashed border-gray-200 rounded-[40px] text-center">
          <Calendar
            className="mx-auto text-gray-300 mb-4 "
            size={64}
          />
          <h3 className="text-xl font-semibold text-text-main mb-2 uppercase tracking-tight">
            No Scheduled Tasks
          </h3>
          <p className="text-text-muted max-w-sm mx-auto leading-relaxed text-sm font-medium">
            Your seasonal calendar is currently empty. Your advisor will post
            activities based on your crops and local weather patterns soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {tasks.map((task) => {
            const statusColors = {
              COMPLETED: "bg-[#dcfce7] text-[#166534] border-[#166534]/10",
              PENDING: "bg-[#fef9c3] text-[#854d0e] border-[#854d0e]/10",
              CANCELLED: "bg-gray-100 text-gray-500 border-gray-200",
            };

            const StatusIcon =
              task.status === "COMPLETED"
                ? CheckCircle2
                : task.status === "CANCELLED"
                  ? AlertCircle
                  : Clock;

            return (
              <Card
                key={task.id}
              >
              
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-primary-bg flex items-center justify-center transition-transform">
                    <Sprout size={24} className="text-primary" />
                  </div>
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${statusColors[task.status] || statusColors.PENDING} flex items-center gap-1.5`}
                  >
                    <StatusIcon size={12} />
                    {task.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-main   mb-1">
                    {task.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-medium line-clamp-2 italic">
                    {task.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[10px] font-semibold tracking-widest uppercase">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Sprout size={14} />
                      {task.crop || "General Farming"}
                    </div>
                    <div className="flex items-center gap-1.5 text-text-light">
                      <Clock size={14} />
                      {new Date(task.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {task.status === "PENDING" && (
                    <Button
                      size="sm"
                      fullWidth
                      onClick={() =>
                        updateTask(task.id, { status: "COMPLETED" })
                      }
                    >
                      <CheckCircle2 size={16} className="mr-1.5" />
                      Mark as Done
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
