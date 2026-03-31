import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

interface AdminStats {
    totalUsers: number;
    activeFarmers: number;
    verifiedAdvisors: number;
    pendingApprovals: number;
    systemHealth: string;
}

interface Advisor {
    id: string;
    firstName: string;
    lastName: string;
    district: string;
    isVerified: boolean;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "ADMIN" | "ADVISOR" | "FARMER";
}

export default function useAdmin() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [pendingAdvisors, setPendingAdvisors] = useState<Advisor[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [statsRes, pendingRes, usersRes] = await Promise.all([
                axiosInstance.get("/api/v1/admin/stats"),
                axiosInstance.get("/api/v1/admin/advisors/pending"),
                axiosInstance.get("/api/v1/admin/users")
            ]);

            if (statsRes.data.success) setStats(statsRes.data.data);
            if (pendingRes.data.success) setPendingAdvisors(pendingRes.data.data);
            if (usersRes.data.success) setUsers(usersRes.data.data);

        } catch (err: any) {
            console.error("Admin data fetch error:", err);
            setError(err.response?.data?.message || "Failed to fetch dashboard data");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/api/v1/admin/stats");
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to refresh stats");
        }
    }, []);

    const fetchPendingAdvisors = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/api/v1/admin/advisors/pending");
            if (response.data.success) {
                setPendingAdvisors(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to refresh pending advisors");
        }
    }, []);

    const fetchUsers = useCallback(async (role?: string) => {
        try {
            const url = role ? `/api/v1/admin/users?role=${role}` : "/api/v1/admin/users";
            const response = await axiosInstance.get(url);
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to refresh users");
        }
    }, []);

    const approveAdvisor = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.patch(`/api/v1/admin/approve-advisor/${id}`);
            if (response.data.success) {
                toast.success(response.data.message || "Advisor approved");
                await Promise.all([fetchPendingAdvisors(), fetchStats()]);
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Approval failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    const deleteUser = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/api/v1/admin/users/${id}`);
            if (response.data.success) {
                toast.success(response.data.message || "User deactivated");
                await Promise.all([fetchUsers(), fetchStats()]);
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Deactivation failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return {
        stats,
        pendingAdvisors,
        users,
        isLoading,
        error,
        approveAdvisor,
        deleteUser,
        refreshStats: fetchStats,
        refreshPending: fetchPendingAdvisors,
        refreshUsers: fetchUsers
    };
}
