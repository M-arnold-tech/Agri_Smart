import { useState, useEffect } from "react";
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

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/admin/stats");
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch admin stats");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPendingAdvisors = async () => {
        try {
            const response = await axiosInstance.get("/admin/advisors/pending");
            if (response.data.success) {
                setPendingAdvisors(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch pending advisors");
        }
    };

    const fetchUsers = async (role?: string) => {
        try {
            const url = role ? `/admin/users?role=${role}` : "/admin/users";
            const response = await axiosInstance.get(url);
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch users");
        }
    };

    const approveAdvisor = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.patch(`/admin/approve-advisor/${id}`);
            if (response.data.success) {
                toast.success(response.data.message || "Advisor approved");
                await fetchPendingAdvisors(); // Refresh the list
                await fetchStats(); // Refresh the counts
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
            const response = await axiosInstance.delete(`/admin/users/${id}`);
            if (response.data.success) {
                toast.success(response.data.message || "User deactivated");
                await fetchUsers(); // Refresh users list
                await fetchStats(); // Refresh the counts
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
        fetchStats();
        fetchPendingAdvisors();
        fetchUsers();
    }, []);

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
