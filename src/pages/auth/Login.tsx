import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Sprout } from 'lucide-react';
import './Auth.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login redirect
    navigate('/farmer');
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <Sprout size={32} className="text-primary" />
            <span>Agri_Smart</span>
          </Link>
          <h2>Welcome Back</h2>
          <p>Login to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <Input 
            label="Email/Phone Number" 
            type="text" 
            placeholder="Enter your email or phone" 
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            required
          />
          
          <div className="auth-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <Button type="submit" size="lg" fullWidth>
            Sign In
          </Button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};
