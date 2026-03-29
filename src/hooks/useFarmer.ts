import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

interface FarmerStats {
  landSize: number;
  cropCount: number;
  advisorCount: number;
  activeTasks: number;
}

interface Advisor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string[];
}

export default function useFarmer() {
  const [stats, setStats] = useState<FarmerStats | null>(null);
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/farmer/my-stats");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch stats");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdvisor = async () => {
    try {
      const response = await axiosInstance.get("/farmer/my-advisor");
      if (response.data.success) {
        setAdvisor(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch advisor");
    }
  };

  const updateProfile = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put("/farmer/profile", data);
      if (response.data.success) {
        toast.success(response.data.message || "Profile updated");
        return true;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  useEffect(() => {
    fetchStats();
    fetchAdvisor();
  }, []);

  return {
    stats,
    advisor,
    isLoading,
    error,
    updateProfile,
    refreshStats: fetchStats,
    refreshAdvisor: fetchAdvisor
  };
}
