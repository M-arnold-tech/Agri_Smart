import React, { useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { 
  Settings, 
  Globe, 
  MessageSquare, 
  Shield, 
  CloudSun,
  Save,
  CheckCircle2,
  Info
} from "lucide-react";

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab ] = useState<"general" | "sms" | "weather" | "security">("general");

  const tabs = [
    { id: "general", label: "General", icon: <Globe size={18} /> },
    { id: "sms", label: "SMS Config", icon: <MessageSquare size={18} /> },
    { id: "weather", label: "Weather API", icon: <CloudSun size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
  ] as const;

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-5xl mx-auto">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-main flex items-center gap-3">
          <Settings size={32} className="text-primary" />
          Platform Settings
        </h1>
        <p className="text-text-muted text-lg">
          Configure global system parameters, API integrations, and security policies.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="flex flex-row lg:flex-col gap-1 p-1 bg-primary-bg rounded-sm border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest rounded-sm transition-all text-left ${
                  activeTab === tab.id 
                    ? "bg-white text-primary shadow-sm ring-1 ring-black/5" 
                    : "text-text-muted hover:bg-white/50 hover:text-text-main"
                }`}
              >
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          {activeTab === "general" && (
             <Card className="flex flex-col gap-8 p-8 border-t-4 border-t-primary">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-main">General Configuration</h3>
                    <p className="text-sm text-text-muted mt-1">Global platform branding and contact details.</p>
                  </div>
                  <div className="px-3 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest leading-none">
                     LIVE PREVIEW
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                  <Input label="Platform Name" defaultValue="Agri_Smart Rwanda" />
                  <Input label="Support Email" defaultValue="support@agrismart.rw" />
                  <Input label="Official Website" defaultValue="https://agrismart.rw" />
                  <Input label="System Language" defaultValue="English / Kinyarwanda" />
                </div>

                <div className="flex justify-end pt-4 border-t border-border/50">
                   <Button className="flex items-center gap-2 px-8">
                      <Save size={18} />
                      Save Changes
                   </Button>
                </div>
             </Card>
          )}

          {activeTab === "sms" && (
             <Card className="flex flex-col gap-8 p-8 border-t-4 border-t-secondary">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary/10 rounded-sm">
                    <MessageSquare size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-main">SMS Gateway Settings</h3>
                    <p className="text-sm text-text-muted mt-1">Configure bulk SMS provider for farmer alerts.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-6 pt-4 border-t border-border/50">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input label="Provider API Key" type="password" value="************************" readOnly />
                      <Input label="Sender ID" defaultValue="AGRI_SMART" />
                   </div>
                   <div className="p-4 bg-primary-bg rounded-sm border border-border flex items-start gap-3">
                      <Info size={18} className="text-primary mt-0.5" />
                      <div className="text-xs text-text-muted leading-relaxed">
                         The SMS gateway is currently connected to <b>M-Notify Africa</b>. Status: 
                         <span className="ml-2 px-2 py-0.5 bg-green-500/10 text-green-500 rounded-sm font-bold">ACTIVE</span>
                      </div>
                   </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border/50">
                   <Button variant="outline" className="flex items-center gap-2 mr-4">
                      Test Connection
                   </Button>
                   <Button className="flex items-center gap-2 px-8">
                      <Save size={18} />
                      Update Config
                   </Button>
                </div>
             </Card>
          )}

          {activeTab === "weather" && (
             <Card className="flex flex-col gap-8 p-8 border-t-4 border-t-[#0ea5e9]">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-[#0ea5e9]/10 rounded-sm">
                    <CloudSun size={24} className="text-[#0ea5e9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-main">Weather API Integration</h3>
                    <p className="text-sm text-text-muted mt-1">Configure the real-time weather data source.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-6 pt-4 border-t border-border/50">
                   <Input label="OpenWeather API Key" type="password" value="************************" readOnly />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                         <label className="text-xs font-bold text-text-main uppercase tracking-widest opacity-80">Sync Frequency</label>
                         <select className="w-full px-4 py-2 bg-primary-bg border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Every 1 Hour</option>
                            <option>Every 3 Hours</option>
                            <option>Daily</option>
                         </select>
                      </div>
                      <div className="flex flex-col gap-2">
                         <label className="text-xs font-bold text-text-main uppercase tracking-widest opacity-80">Default Unit</label>
                         <select className="w-full px-4 py-2 bg-primary-bg border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Celsius (°C)</option>
                            <option>Fahrenheit (°F)</option>
                         </select>
                      </div>
                   </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border/50">
                   <Button className="flex items-center gap-2 px-8">
                      <CheckCircle2 size={18} />
                      Save & Sync
                   </Button>
                </div>
             </Card>
          )}

          {activeTab === "security" && (
             <Card className="flex flex-col gap-8 p-8 border-t-4 border-t-error">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-error/10 rounded-sm">
                    <Shield size={24} className="text-error" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-main">Security Policies</h3>
                    <p className="text-sm text-text-muted mt-1">Platform-wide security and access controls.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-6 pt-4 border-t border-border/50">
                   <div className="flex items-center justify-between p-4 bg-primary-bg/50 rounded-sm border border-border">
                      <div>
                        <h4 className="text-sm font-bold text-text-main">Multi-Factor Authentication</h4>
                        <p className="text-xs text-text-muted">Require MFA for all administrative accounts.</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-primary-bg/50 rounded-sm border border-border">
                      <div>
                        <h4 className="text-sm font-bold text-text-main">Automatic Account Deactivation</h4>
                        <p className="text-xs text-text-muted">Deactivate accounts after 90 days of inactivity.</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                   </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border/50">
                   <Button className="flex items-center gap-2 px-8">
                      <Save size={18} />
                      Save Security Config
                   </Button>
                </div>
             </Card>
          )}
        </div>
      </div>
    </div>
  );
};
