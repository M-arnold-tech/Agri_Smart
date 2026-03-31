import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/DashboardLayout";
import { FarmerLayout } from "./pages/farmer/layout/FarmerLayout";
import { FarmerCalendar } from "./pages/farmer/pages/Calendar";
import { FarmerGroups } from "./pages/farmer/pages/Groups";
import { FarmerGroupChat } from "./pages/farmer/pages/GroupChat";
import { AdvisorLayout } from "./pages/advisor/layout/AdvisorLayout";
import { AdminLayout } from "./pages/admin/layout/AdminLayout";

import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

// Farmer Module
import { FarmerDashboard } from "./pages/farmer/pages/Dashboard";
import { FarmerChat } from "./pages/farmer/pages/Chat";
import { FarmerKnowledge } from "./pages/farmer/pages/Knowledge";
import { FarmerSettings } from "./pages/farmer/pages/Settings";
import { FarmerPlaceholder } from "./pages/farmer/pages/Placeholder";

// Advisor Module
import { AdvisorDashboard } from "./pages/advisor/pages/Dashboard";
import { AdvisorChat } from "./pages/advisor/pages/Chat";
import { AdvisorKnowledge } from "./pages/advisor/pages/Knowledge";
import { AdvisorFarmers } from "./pages/advisor/pages/Farmers";
import { AdvisorPlaceholder } from "./pages/advisor/pages/Placeholder";

import { AdminDashboard } from "./pages/admin/pages/Dashboard";
import { AdminAdvisors } from "./pages/admin/pages/Advisors";
import { AdminFarmers } from "./pages/admin/pages/Farmers";
import { AdminGroups } from "./pages/admin/pages/Groups";
import { AdminProfile } from "./pages/admin/pages/Profile";
import { AdminSettings } from "./pages/admin/pages/Settings";

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
        <Route path="calendar" element={<FarmerCalendar />} />
        <Route path="groups" element={<FarmerGroups />} />
        <Route path="groups/:id" element={<FarmerGroupChat />} />
        <Route path="weather" element={<FarmerPlaceholder title="Local Weather" />} />
        <Route path="settings" element={<FarmerSettings />} />
      </Route>

      {/* Advisor Dashboard Layout (Shared sidebar under /advisor) */}
      <Route path="/advisor" element={<AdvisorLayout />}>
        <Route index element={<AdvisorDashboard />} />
        <Route path="chat" element={<AdvisorChat />} />
        <Route path="knowledge" element={<AdvisorKnowledge />} />
        <Route path="farmers" element={<AdvisorFarmers />} />
        <Route path="settings" element={<AdvisorPlaceholder title="Advisor Profile" />} />
      </Route>

      {/* System Admin Layout (Shared sidebar under /admin) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="advisors" element={<AdminAdvisors />} />
        <Route path="farmers" element={<AdminFarmers />} />
        <Route path="groups" element={<AdminGroups />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      </Routes>
    </>
  );
};

export default App;
