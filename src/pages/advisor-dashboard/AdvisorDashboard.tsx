import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import './Dashboard.css';

export const AdvisorDashboard: React.FC = () => {
  return (
    <div className="dashboard animate-fade-in">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Advisor Dashboard</h1>
          <p className="dashboard-subtitle">Manage your assigned farmers and pending consultations.</p>
        </div>
        <div className="status-badge verified">
          <CheckCircle2 size={16} /> Verified Advisor
        </div>
      </header>

      {/* Stats overview */}
      <div className="weather-grid mb-6">
        <Card className="weather-card">
          <Users size={32} className="text-primary" />
          <div>
            <div className="weather-value">24</div>
            <div className="weather-label">Assigned Farmers</div>
          </div>
        </Card>
        <Card className="weather-card">
          <AlertCircle size={32} style={{ color: '#f59e0b' }} />
          <div>
            <div className="weather-value">5</div>
            <div className="weather-label">Pending Messages</div>
          </div>
        </Card>
        <Card className="weather-card">
          <FileText size={32} className="text-secondary" />
          <div>
            <div className="weather-value">12</div>
            <div className="weather-label">Tasks Created</div>
          </div>
        </Card>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-column" style={{ flex: 2 }}>
          <h2 className="section-title">Farmer Inquiries</h2>
          <Card>
            <div className="inquiry-item">
              <div className="inquiry-user">
                <div className="avatar">JM</div>
                <div>
                  <h4>Jean Marie</h4>
                  <p>Musanze • Potato yield dropping</p>
                </div>
              </div>
              <Button size="sm">Reply</Button>
            </div>
            
            <div className="inquiry-item mt-4 pt-4 border-t">
              <div className="inquiry-user">
                <div className="avatar">CU</div>
                <div>
                  <h4>Chantal U.</h4>
                  <p>Bugesera • Watering schedule</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Reply</Button>
            </div>
          </Card>
        </div>

        <div className="dashboard-column" style={{ flex: 1 }}>
          <Card className="bg-primary-light text-white p-6">
            <h3 className="text-xl font-bold mb-2">Publish Resource</h3>
            <p className="mb-4 text-sm opacity-90">Upload guides for farmers to access offline.</p>
            <Button variant="secondary" fullWidth>Upload PDF/Image</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
