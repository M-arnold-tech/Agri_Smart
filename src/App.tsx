import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/DashboardLayout";
import { FarmerLayout } from "./components/layout/FarmerLayout";
import { AdvisorLayout } from "./components/layout/AdvisorLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

// Separated Dashboards
import { FarmerDashboard } from "./pages/farmer-dashboard/FarmerDashboard";
import { AdvisorDashboard } from "./pages/advisor-dashboard/AdvisorDashboard";
import { SystemAdminDashboard } from "./pages/admin-dashboard/SystemAdminDashboard";

import { ChatHub } from "./pages/ChatHub";
import { KnowledgeBase } from "./pages/KnowledgeBase";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Auth routes don't have Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main layout (Navbar only) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Farmer Dashboard Layout (Navbar + FarmerSidebar) */}
      <Route element={<FarmerLayout />}>
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/chat" element={<ChatHub />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
      </Route>

      {/* Advisor Dashboard Layout (Navbar + AdvisorSidebar) */}
      <Route element={<AdvisorLayout />}>
        <Route path="/advisor" element={<AdvisorDashboard />} />
      </Route>

      {/* System Admin Layout (Navbar + AdminSidebar) */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<SystemAdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
