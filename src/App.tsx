import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/DashboardLayout";
import { FarmerLayout } from "./pages/farmer/layout/FarmerLayout";
import { AdvisorLayout } from "./pages/advisor/layout/AdvisorLayout";
import { AdminLayout } from "./pages/admin/layout/AdminLayout";

import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

// Farmer Module
import { FarmerDashboard } from "./pages/farmer/pages/Dashboard";
import { FarmerChat } from "./pages/farmer/pages/Chat";
import { FarmerKnowledge } from "./pages/farmer/pages/Knowledge";
import { FarmerPlaceholder } from "./pages/farmer/pages/Placeholder";

// Advisor Module
import { AdvisorDashboard } from "./pages/advisor/pages/Dashboard";
import { AdvisorChat } from "./pages/advisor/pages/Chat";
import { AdvisorKnowledge } from "./pages/advisor/pages/Knowledge";
import { AdvisorPlaceholder } from "./pages/advisor/pages/Placeholder";

// Admin Module
import { AdminDashboard } from "./pages/admin/pages/Dashboard";
import { AdminPlaceholder } from "./pages/admin/pages/Placeholder";

import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { fontSize: "12px" } }} reverseOrder={false} />
      <Routes>
      {/* Auth routes don't have Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main layout (Navbar only) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Farmer Dashboard Layout (Shared sidebar under /farmer) */}
      <Route path="/farmer" element={<FarmerLayout />}>
        <Route index element={<FarmerDashboard />} />
        <Route path="chat" element={<FarmerChat />} />
        <Route path="knowledge" element={<FarmerKnowledge />} />
        <Route path="calendar" element={<FarmerPlaceholder title="Crop Calendar" />} />
        <Route path="weather" element={<FarmerPlaceholder title="Local Weather" />} />
        <Route path="settings" element={<FarmerPlaceholder title="Farmer Settings" />} />
      </Route>

      {/* Advisor Dashboard Layout (Shared sidebar under /advisor) */}
      <Route path="/advisor" element={<AdvisorLayout />}>
        <Route index element={<AdvisorDashboard />} />
        <Route path="chat" element={<AdvisorChat />} />
        <Route path="knowledge" element={<AdvisorKnowledge />} />
        <Route path="farmers" element={<AdvisorPlaceholder title="My Assignments" />} />
        <Route path="settings" element={<AdvisorPlaceholder title="Advisor Profile" />} />
      </Route>

      {/* System Admin Layout (Shared sidebar under /admin) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="approvals" element={<AdminPlaceholder title="Verify Advisors" />} />
        <Route path="users" element={<AdminPlaceholder title="Manage Users" />} />
        <Route path="activity" element={<AdminPlaceholder title="System Health Logs" />} />
        <Route path="settings" element={<AdminPlaceholder title="Platform Settings" />} />
      </Route>
      </Routes>
    </>
  );
};

export default App;
