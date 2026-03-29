import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "ADVISOR" | "FARMER";
  district: string;
  avatar?: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/auth/me");
      const { success, data, message } = response.data;

      if (success) {
        setUser(data);
      } else {
        setError(message || "Failed to fetch profile");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    user,
    isLoading,
    error,
    refreshProfile: fetchProfile,
    isAuthenticated: !!user && !!localStorage.getItem("token"),
  };
}
