import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Users, Activity, CheckCircle, XCircle } from 'lucide-react';
import './Dashboard.css';

export const SystemAdminDashboard: React.FC = () => {
  return (
    <div className="dashboard animate-fade-in">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">System Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage platform users, verify advisors, and monitor system health.</p>
        </div>
      </header>

      {/* System Stats overview */}
      <div className="weather-grid mb-6">
        <Card className="weather-card">
          <Users size={32} className="text-primary" />
          <div>
            <div className="weather-value">1,245</div>
            <div className="weather-label">Total Farmers</div>
          </div>
        </Card>
        <Card className="weather-card">
          <ShieldCheck size={32} className="text-secondary" />
          <div>
            <div className="weather-value">48</div>
            <div className="weather-label">Verified Advisors</div>
          </div>
        </Card>
        <Card className="weather-card">
          <Activity size={32} style={{ color: '#0ea5e9' }} />
          <div>
            <div className="weather-value">99.9%</div>
            <div className="weather-label">System Uptime</div>
          </div>
        </Card>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-column" style={{ flex: 2 }}>
          <h2 className="section-title">Pending Advisor Approvals</h2>
          <Card>
            <div className="inquiry-item">
              <div className="inquiry-user">
                <div className="avatar">EK</div>
                <div>
                  <h4>Emmanuel K.</h4>
                  <p>Agronomist • 5 years experience • Kigali</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button size="sm" variant="outline"><XCircle size={16} className="mr-2" style={{ marginRight: '0.5rem' }} /> Reject</Button>
                <Button size="sm"><CheckCircle size={16} className="mr-2" style={{ marginRight: '0.5rem' }} /> Approve</Button>
              </div>
            </div>
            
            <div className="inquiry-item mt-4 pt-4 border-t">
              <div className="inquiry-user">
                <div className="avatar">AM</div>
                <div>
                  <h4>Alice M.</h4>
                  <p>Soil Specialist • 3 years experience • Huye</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button size="sm" variant="outline"><XCircle size={16} className="mr-2" style={{ marginRight: '0.5rem' }} /> Reject</Button>
                <Button size="sm"><CheckCircle size={16} className="mr-2" style={{ marginRight: '0.5rem' }} /> Approve</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="dashboard-column" style={{ flex: 1 }}>
          <h2 className="section-title">Recent Activity</h2>
          <Card className="bg-surface">
            <ul className="market-list">
              <li>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="text-sm font-medium">New Bulk SMS sent</span>
                  <span className="text-xs text-muted">2 hours ago</span>
                </div>
              </li>
              <li>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="text-sm font-medium">Weather API synced</span>
                  <span className="text-xs text-muted">4 hours ago</span>
                </div>
              </li>
              <li>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="text-sm font-medium">Advisor "Sarah A." verified</span>
                  <span className="text-xs text-muted">Yesterday</span>
                </div>
              </li>
            </ul>
            <Button variant="ghost" fullWidth className="mt-4">View Full Logs</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
