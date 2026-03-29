import React from 'react';
import { Card } from '../../components/ui/Card';
import { CloudSun, Droplets, ThermometerSun, CalendarClock, PhoneCall, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import './Dashboard.css';

export const FarmerDashboard: React.FC = () => {
  return (
    <div className="dashboard animate-fade-in">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, John!</h1>
          <p className="dashboard-subtitle">Here is what is happening on your farm today.</p>
        </div>
        <Button>
          <PhoneCall size={18} style={{ marginRight: '0.5rem' }} />
          Contact Advisor
        </Button>
      </header>

      {/* Weather Widget */}
      <section className="dashboard-section">
        <h2 className="section-title">Today's Weather (Musanze)</h2>
        <div className="weather-grid">
          <Card className="weather-card">
            <CloudSun size={32} className="text-primary" />
            <div>
              <div className="weather-value">22°C</div>
              <div className="weather-label">Partly Cloudy</div>
            </div>
          </Card>
          <Card className="weather-card">
            <Droplets size={32} className="text-secondary" />
            <div>
              <div className="weather-value">65%</div>
              <div className="weather-label">Humidity</div>
            </div>
          </Card>
          <Card className="weather-card">
            <ThermometerSun size={32} className="text-accent" />
            <div>
              <div className="weather-value">High UV</div>
              <div className="weather-label">Index: 8</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Left Column - Tasks */}
        <div className="dashboard-column">
          <h2 className="section-title">Current Tasks</h2>
          <Card className="task-card">
            <div className="task-header">
              <div className="task-icon"><CalendarClock size={20} /></div>
              <div>
                <h3 className="task-title">Apply NPK Fertilizer</h3>
                <p className="task-meta">Maize Field • Due in 2 days</p>
              </div>
            </div>
            <p className="task-desc">Recommended by your advisor based on current growth stage and expected rains.</p>
            <Button variant="outline" size="sm" fullWidth>Mark as Done</Button>
          </Card>

          <Card className="task-card">
            <div className="task-header">
              <div className="task-icon bg-warning"><CalendarClock size={20} /></div>
              <div>
                <h3 className="task-title">Check for Fall Armyworm</h3>
                <p className="task-meta">Maize Field • Due today</p>
              </div>
            </div>
            <p className="task-desc">Recent alerts in your district indicate high pest activity. Inspect leaves carefully.</p>
            <Button variant="outline" size="sm" fullWidth>Report Findings</Button>
          </Card>
        </div>

        {/* Right Column - Market & Consultations */}
        <div className="dashboard-column">
          <h2 className="section-title">Recent Consultations</h2>
          <Card className="consultation-card">
            <div className="consultation-info">
              <div className="avatar advisor-avatar">SA</div>
              <div>
                <h4>Sarah Advisor</h4>
                <p>Agronomist</p>
              </div>
            </div>
            <div className="consultation-status online">Online</div>
          </Card>
          
          <Card className="market-card mt-4">
            <div className="market-header">
              <h3>Market Prices</h3>
              <a href="#" className="text-link">View all <ArrowRight size={16} /></a>
            </div>
            <ul className="market-list">
              <li>
                <span>Maize (1kg)</span>
                <span className="price up">500 RWF <TrendingUpIcon /></span>
              </li>
              <li>
                <span>Beans (1kg)</span>
                <span className="price down">800 RWF</span>
              </li>
              <li>
                <span>Irish Potatoes (1kg)</span>
                <span className="price up">350 RWF <TrendingUpIcon /></span>
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
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
    <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);
