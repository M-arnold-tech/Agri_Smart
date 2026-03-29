import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Sprout, PhoneCall, TrendingUp, SunMedium } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 pb-16 animate-fade-in">
      {/* Hero Section */}
      <section className="flex items-center justify-between min-h-[calc(100vh-64px-4rem)] lg:flex-row flex-col text-center lg:text-left px-8 lg:px-16 bg-gradient-to-br from-background to-[#e8f5e9] rounded-xl m-4 overflow-hidden relative p-8 lg:p-16">
        <div className="flex-1 max-w-[600px] z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-primary-dark mb-6 tracking-tight">
            Empowering Rwanda’s Agriculture with Expert Guidance
          </h1>
          <p className="text-xl text-text-muted mb-10 leading-relaxed">
            Agri_Smart bridges the gap between local farmers and certified agricultural advisors. 
            Get real-time consultation, crop calendars, and weather alerts to maximize your yield.
          </p>
          <div className="flex gap-4 lg:justify-start justify-center flex-wrap">
            <Link to="/register">
              <Button size="lg">Get Started Today</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-r from-primary to-secondary animate-morph shadow-[0_20px_40px_rgba(76,175,80,0.2)] mt-12 lg:mt-0"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">Why Choose Agri_Smart?</h2>
          <p className="text-lg text-text-muted">Everything you need to grow smarter and faster.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="flex flex-col items-start p-8 bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(76,175,80,0.1)] group">
            <div className="w-14 h-14 bg-primary-bg text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <PhoneCall size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-main">Expert Consultations</h3>
            <p className="text-text-muted leading-relaxed">Connect directly with certified agricultural advisors for tailored guidance and problem-solving.</p>
          </Card>
          
          <Card className="flex flex-col items-start p-8 bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(76,175,80,0.1)] group">
            <div className="w-14 h-14 bg-primary-bg text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-main">Crop Tracking</h3>
            <p className="text-text-muted leading-relaxed">Get personalized task notifications and crop calendars to never miss a crucial farming step.</p>
          </Card>
          
          <Card className="flex flex-col items-start p-8 bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(76,175,80,0.1)] group">
            <div className="w-14 h-14 bg-primary-bg text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <SunMedium size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-main">Weather Alerts</h3>
            <p className="text-text-muted leading-relaxed">Receive localized weather forecasts and warnings to protect your harvest from unexpected changes.</p>
          </Card>
          
          <Card className="flex flex-col items-start p-8 bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(76,175,80,0.1)] group">
            <div className="w-14 h-14 bg-primary-bg text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <Sprout size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-main">Resource Library</h3>
            <p className="text-text-muted leading-relaxed">Access a rich knowledge base of manuals, guides, and best practices available offline.</p>
          </Card>
        </div>
      </section>
    </div>
  );
};
