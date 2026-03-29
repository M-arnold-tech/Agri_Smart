import { useState, useEffect, useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

export interface Group {
    id: string;
    name: string;
    district: string;
    memberCount: number;
    description: string;
    members?: any[];
    isMember?: boolean;
}

// Group Creation Schema
const groupSchema = yup.object().shape({
    name: yup.string().required("Group name is required").min(3, "Name is too short"),
    district: yup.string().required("District is required"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
});

export type GroupFormData = yup.InferType<typeof groupSchema>;

// Hook for fetching and managing groups list
export default function useGroups(district?: string) {
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGroups = useCallback(async (distName?: string) => {
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
    }, [district]);

    const fetchGroupDetails = useCallback(async (id: string) => {
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
    }, []);

    const joinGroup = useCallback(async (id: string) => {
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
    }, [fetchGroups]);

    const leaveGroup = useCallback(async (id: string) => {
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
    }, [fetchGroups]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    return {
        groups,
        currentGroup,
        isLoading,
        error,
        fetchGroupDetails,
        joinGroup,
        leaveGroup,
        refreshGroups: fetchGroups
    };
}

// Hook for managing group creation form
export function useCreateGroup(onSuccess?: () => void) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<GroupFormData>({
        resolver: yupResolver(groupSchema) as any,
    });

    const onSubmit: SubmitHandler<GroupFormData> = async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/groups/create", data);
            if (response.data.success) {
                toast.success(response.data.message || "Cooperative group created!");
                reset();
                if (onSuccess) onSuccess();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Creation failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        reset,
        setValue,
    };
}
