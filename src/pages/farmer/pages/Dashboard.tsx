import React from "react";
import { Card } from "../../../components/ui/Card";
import {
  CloudSun,
  Droplets,
  ThermometerSun,
  CalendarClock,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const FarmerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in text-xs">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            Welcome back, John!
          </h1>
          <p className="text-text-muted text-sm">
            Here is what is happening on your farm today.
          </p>
        </div>
        <Button>
          <PhoneCall size={16} />
          Contact Advisor
        </Button>
      </header>

      {/* Weather Widget */}
      <section>
        <h2 className="text-xl font-semibold text-text-main mb-4">
          Today's Weather (Musanze)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-4">
            <CloudSun size={32} className="text-primary shrink-0" />
            <div>
              <div className="text-2xl font-bold text-text-main">22°C</div>
              <div className="text-xs text-text-muted">Partly Cloudy</div>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <Droplets size={32} className="text-secondary shrink-0" />
            <div>
              <div className="text-2xl font-bold text-text-main">65%</div>
              <div className="text-xs text-text-muted">Humidity</div>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <ThermometerSun size={32} className="text-accent shrink-0" />
            <div>
              <div className="text-2xl font-bold text-text-main">High UV</div>
              <div className="text-xs text-text-muted">Index: 8</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Tasks */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-text-main mb-1">
            Current Tasks
          </h2>
          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-bg text-primary flex items-center justify-center shrink-0">
                <CalendarClock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-main">
                  Apply NPK Fertilizer
                </h3>
                <p className="text-xs text-text-muted">
                  Maize Field • Due in 2 days
                </p>
              </div>
            </div>
            <p className="text-[15px] text-text-main leading-relaxed">
              Recommended by your advisor based on current growth stage and
              expected rains.
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Mark as Done
            </Button>
          </Card>

          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-4 border-l-4 border-accent">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 ">
                <CalendarClock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-main">
                  Check for Fall Armyworm
                </h3>
                <p className="text-xs text-text-muted">
                  Maize Field • Due today
                </p>
              </div>
            </div>
            <p className="text-[15px] text-text-main leading-relaxed">
              Recent alerts in your district indicate high pest activity.
              Inspect leaves carefully.
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Report Findings
            </Button>
          </Card>
        </div>

        {/* Right Column - Market & Consultations */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-text-main mb-1">
            Recent Consultations
          </h2>
          <Card className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-bg text-primary flex items-center justify-center font-bold text-lg">
                SA
              </div>
              <div>
                <h4 className="font-semibold text-text-main text-lg">
                  Sarah Advisor
                </h4>
                <p className="text-xs text-text-muted">Agronomist</p>
              </div>
            </div>
            <div className="bg-[#dcfce7] text-[#166534] px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">
              Online
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-text-main">
                Market Prices
              </h3>
              <a
                href="#"
                className="text-xs text-primary flex items-center font-medium hover:underline"
              >
                View all <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
            <ul className="divide-y divide-border">
              <li className="flex justify-between items-center py-4">
                <span className="text-text-main font-medium">Maize (1kg)</span>
                <span className="text-primary-dark font-bold flex items-center gap-1">
                  500 RWF <TrendingUpIcon />
                </span>
              </li>
              <li className="flex justify-between items-center py-4">
                <span className="text-text-main font-medium">Beans (1kg)</span>
                <span className="text-[#ef4444] font-bold">800 RWF</span>
              </li>
              <li className="flex justify-between items-center py-4">
                <span className="text-text-main font-medium">
                  Irish Potatoes (1kg)
                </span>
                <span className="text-primary-dark font-bold flex items-center gap-1">
                  350 RWF <TrendingUpIcon />
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Mini component just for the arrow
const TrendingUpIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
    <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);
