import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

interface Group {
    id: string;
    name: string;
    district: string;
    memberCount: number;
    description: string;
    members?: any[];
}

export default function useGroups(district?: string) {
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGroups = async (distName?: string) => {
        setIsLoading(true);
        try {
            const url = (distName || district) ? `/groups?district=${distName || district}` : "/groups";
            const response = await axiosInstance.get(url);
            if (response.data.success) {
                setGroups(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch groups");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchGroupDetails = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/groups/${id}`);
            if (response.data.success) {
                setCurrentGroup(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch group details");
        } finally {
            setIsLoading(false);
        }
    };

    const createGroup = async (data: Partial<Group>) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/groups/create", data);
            if (response.data.success) {
                toast.success(response.data.message || "Group created");
                await fetchGroups();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to create group");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    const joinGroup = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(`/groups/${id}/join`);
            if (response.data.success) {
                toast.success(response.data.message || "Joined successfully");
                await fetchGroups();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to join group");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    const leaveGroup = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/groups/${id}/leave`);
            if (response.data.success) {
                toast.success(response.data.message || "Left group");
                await fetchGroups();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Action failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    useEffect(() => {
        fetchGroups();
    }, [district]);

    return {
        groups,
        currentGroup,
        isLoading,
        error,
        fetchGroupDetails,
        createGroup,
        joinGroup,
        leaveGroup,
        refreshGroups: fetchGroups
    };
}
