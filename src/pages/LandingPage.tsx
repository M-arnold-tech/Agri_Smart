import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Sprout, PhoneCall, TrendingUp, SunMedium } from 'lucide-react';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Empowering Rwanda’s Agriculture with Expert Guidance</h1>
          <p>
            Agri_Smart bridges the gap between local farmers and certified agricultural advisors. 
            Get real-time consultation, crop calendars, and weather alerts to maximize your yield.
          </p>
          <div className="hero-actions">
            <Link to="/register">
              <Button size="lg">Get Started Today</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Abstract green shapes / dynamic illustration placeholder */}
          <div className="hero-blob"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Agri_Smart?</h2>
          <p>Everything you need to grow smarter and faster.</p>
        </div>
        
        <div className="features-grid">
          <Card className="feature-card">
            <div className="feature-icon"><PhoneCall size={28} /></div>
            <h3>Expert Consultations</h3>
            <p>Connect directly with certified agricultural advisors for tailored guidance and problem-solving.</p>
          </Card>
          
          <Card className="feature-card">
            <div className="feature-icon"><TrendingUp size={28} /></div>
            <h3>Crop Tracking</h3>
            <p>Get personalized task notifications and crop calendars to never miss a crucial farming step.</p>
          </Card>
          
          <Card className="feature-card">
            <div className="feature-icon"><SunMedium size={28} /></div>
            <h3>Weather Alerts</h3>
            <p>Receive localized weather forecasts and warnings to protect your harvest from unexpected changes.</p>
          </Card>
          
          <Card className="feature-card">
            <div className="feature-icon"><Sprout size={28} /></div>
            <h3>Resource Library</h3>
            <p>Access a rich knowledge base of manuals, guides, and best practices available offline.</p>
          </Card>
        </div>
      </section>
    </div>
  );
};
