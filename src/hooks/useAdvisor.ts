import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

interface AdvisorStats {
  farmerCount: number;
  resourcesUploaded: number;
  pendingRequests: number;
  performanceScore: number;
}

interface Farmer {
  id: string;
  firstName: string;
  lastName: string;
  district: string;
  crops: string[];
}

export default function useAdvisor() {
  const [stats, setStats] = useState<AdvisorStats | null>(null);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/advisor/stats");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch advisor stats");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFarmers = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/advisor/assigned-farmers");
      if (response.data.success) {
        setFarmers(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch farmers");
    }
  }, []);

  const assignFarmer = useCallback(async (farmerId: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/advisor/assign-farmer/${farmerId}`);
      if (response.data.success) {
        toast.success(response.data.message || "Farmer assigned");
        await fetchFarmers(); // Refresh the list
        return true;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Assignment failed");
    } finally {
      setIsLoading(false);
    }
    return false;
  }, [fetchFarmers]);

  const updateProfile = useCallback(async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put("/advisor/profile", data);
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
  }, []);

  useEffect(() => {
    fetchStats();
    fetchFarmers();
  }, [fetchStats, fetchFarmers]);

  return {
    stats,
    farmers,
    isLoading,
    error,
    assignFarmer,
    updateProfile,
    refreshStats: fetchStats,
    refreshFarmers: fetchFarmers
  };
}
