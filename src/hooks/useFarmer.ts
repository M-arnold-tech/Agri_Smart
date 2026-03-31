import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

interface FarmerStats {
  assignedAdvisor: string | null;
  activeGroups: number;
  upcomingTasks: number;
}

interface ProfileData {
  landSizeHectares: number;
  crops: string[];
  district: string;
}

export default function useFarmer() {
  const [stats, setStats] = useState<FarmerStats | null>(null);
  const [advisor, setAdvisor] = useState<any>(null);
  const [directory, setDirectory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/farmer/my-stats");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch stats");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAdvisor = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/farmer/my-advisor");
      if (response.data.success) {
        setAdvisor(response.data.data);
      }
    } catch (err: any) {
      console.error("No advisor found");
    }
  }, []);

  const fetchDirectory = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/farmer/directory");
      if (response.data.success) {
        setDirectory(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch directory");
    }
  }, []);

  const updateProfile = async (data: ProfileData) => {
    setIsLoading(true);
    try {
      await axiosInstance.put("/api/v1/farmer/profile", data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchAdvisor();
  }, [fetchStats, fetchAdvisor]);

  return {
    stats,
    advisor,
    directory,
    isLoading,
    error,
    updateProfile,
    fetchDirectory,
    refreshStats: fetchStats
  };
}
