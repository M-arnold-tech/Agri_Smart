import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axiosInstance";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "ADVISOR" | "FARMER";
  district?: string;
  avatarUrl?: string | null;
  isActive: boolean;
  phone: string;
}

interface JwtPayload {
  role?: "ADMIN" | "ADVISOR" | "FARMER";
  sub?: string;
  exp?: number;
  [key: string]: any;
}

export default function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsInitialLoading(false);
      return;
    }

    setIsInitialLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/api/v1/auth/me");
      const { success, data, message } = response.data;

      if (success) {
        setUser(data);
      } else {
        setError(message || "Failed to fetch profile");
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred");
      if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
      }
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  const login = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/api/v1/auth/login", data);
      const { success, message, data: responseData } = response.data;

      if (success === false) {
        throw new Error(message || "Login failed");
      }

      const { accessToken } = responseData;
      
      if (accessToken) {
        localStorage.setItem("token", accessToken);

        let role: string | undefined;
        try {
          const decoded = jwtDecode<JwtPayload>(accessToken);
          role = decoded.role;
        } catch (e) {
          console.error("Failed to decode token:", e);
        }

        toast.success(message || "Welcome to Agri_Smart!");
        await fetchProfile();

        if (role === "ADMIN") navigate("/admin");
        else if (role === "ADVISOR") navigate("/advisor");
        else if (role === "FARMER") navigate("/farmer");
        else navigate("/");
        
        return true;
      } else {
        toast.error("No access token received.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const register = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/api/v1/auth/register", data);
      const { success, message } = response.data;

      if (success === false) {
        throw new Error(message || "Registration failed");
      }

      toast.success(message || "Account created! Please login.");
      navigate("/login");
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    isLoading,
    isInitialLoading,
    error,
    login,
    register,
    logout,
    refreshProfile: fetchProfile,
    isAuthenticated: !!user && !!localStorage.getItem("token"),
  };
}
