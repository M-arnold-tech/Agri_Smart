import React from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import {
  User,
  Mail,
  Shield,
  Phone,
  Camera,
  CheckCircle,
  Key,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

export const AdminProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-4xl mx-auto">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-text-main">Admin Profile</h1>
        <p className="text-text-muted text-sm">
          Manage your account information and security settings.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col gap-6">
          <Card className="flex flex-col items-center justify-center p-8 text-center bg-primary/5 border-gray-200">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-sm bg-primary text-white flex items-center justify-center font-bold text-3xl shadow-lg border-4 border-white/20">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-sm bg-white text-primary border border-gray-200 shadow-sm hover:bg-primary-bg transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-text-main">
              {user?.firstName} {user?.lastName}
            </h2>
            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-sm bg-error/10 text-error text-[10px] font-bold uppercase  leading-none">
              <Shield size={12} />
              System Admin
            </div>
            <p className="text-xs text-text-muted mt-4">
              Member since: March 2024
            </p>
          </Card>

          <Card className="p-0 overflow-hidden divide-y divide-gray-200">
            <div className="p-4 bg-primary-bg/50">
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider">
                Account Status
              </h4>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <CheckCircle size={16} className="text-green-500" />
                Verified Admin
              </div>
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/20"></span>
            </div>
            <div className="p-4">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="text-[10px] uppercase font-bold "
              >
                View Login History
              </Button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <Card className="flex flex-col gap-6 p-8">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
              <User size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-text-main uppercase  opacity-80 text-[12px]">
                Personal Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="First Name"
                defaultValue={user?.firstName}
                placeholder="Enter first name"
              />
              <Input
                label="Last Name"
                defaultValue={user?.lastName}
                placeholder="Enter last name"
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              defaultValue={user?.email}
              placeholder="admin@example.com"
              icon={<Mail size={18} />}
              disabled
            />

            <Input
              label="Phone Number"
              type="tel"
              defaultValue={user?.phone}
              placeholder="+250 788 000 000"
              icon={<Phone size={18} />}
            />

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button size="lg" className="px-10">
                Update Profile
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col gap-6 p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield size={120} className="text-primary" />
            </div>
            <div className="flex items-center gap-2 pb-4 border-b border-gray-200 relative z-10">
              <Key size={20} className="text-secondary" />
              <h3 className="text-lg font-bold text-text-main uppercase  opacity-80 text-[12px]">
                Security & Authentication
              </h3>
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              <p className="text-sm text-text-muted leading-relaxed">
                Keeping your credentials secure is essential for platform
                integrity.
              </p>
              <Button
                variant="outline"
                className="flex items-center gap-2 self-start border-secondary/30 text-secondary hover:bg-secondary/5 font-bold uppercase  text-[10px]"
              >
                Change Password
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
