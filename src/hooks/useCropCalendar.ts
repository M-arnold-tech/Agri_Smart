import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

interface CropTask {
    id: string;
    title: string;
    description: string;
    district: string;
    crop?: string;
    date: string;
    status: "PENDING" | "COMPLETED" | "CANCELLED";
}

export default function useCropCalendar(district?: string) {
    const [tasks, setTasks] = useState<CropTask[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async (distName?: string) => {
        setIsLoading(true);
        try {
            const url = (distName || district) ? `/crop-calendar/${distName || district}` : "/crop-calendar";
            const response = await axiosInstance.get(url);
            if (response.data.success) {
                setTasks(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch crop tasks");
        } finally {
            setIsLoading(false);
        }
    }, [district]);

    const createTask = useCallback(async (data: Partial<CropTask>) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/crop-calendar/task", data);
            if (response.data.success) {
                toast.success(response.data.message || "Task created");
                await fetchTasks();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to create task");
        } finally {
            setIsLoading(false);
        }
        return false;
    }, [fetchTasks]);

    const updateTask = useCallback(async (id: string, data: Partial<CropTask>) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.put(`/crop-calendar/${id}`, data);
            if (response.data.success) {
                toast.success(response.data.message || "Task updated");
                await fetchTasks();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    }, [fetchTasks]);

    const deleteTask = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/crop-calendar/${id}`);
            if (response.data.success) {
                toast.success(response.data.message || "Task deleted");
                await fetchTasks();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Deletion failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    }, [fetchTasks]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return {
        tasks,
        isLoading,
        error,
        createTask,
        updateTask,
        deleteTask,
        refreshTasks: fetchTasks
    };
}
