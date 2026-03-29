import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Sprout } from 'lucide-react';
import './Auth.css';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <Sprout size={32} className="text-primary" />
            <span>Agri_Smart</span>
          </Link>
          <h2>Create an Account</h2>
          <p>Join the digital agriculture platform</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input label="First Name" type="text" placeholder="John" required />
            <Input label="Last Name" type="text" placeholder="Doe" required />
          </div>
          
          <Input label="Email or Phone" type="text" placeholder="Enter email or phone" required />
          
          <div className="input-wrapper">
            <label className="input-label">I am a...</label>
            <select className="input-field" required defaultValue="FARMER">
              <option value="FARMER">Farmer</option>
              <option value="ADVISOR">Agricultural Advisor</option>
            </select>
          </div>

          <Input label="Password" type="password" placeholder="Create a password" required />
          <Input label="Confirm Password" type="password" placeholder="Confirm your password" required />

          <Button type="submit" size="lg" fullWidth style={{ marginTop: '1rem' }}>
            Create Account
          </Button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};
