import { useState, useCallback, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

interface Task {
  id: string;
  title: string;
  description: string;
  crop: string;
  activity: string;
  district: string;
  date: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
}

export default function useCropCalendar(district?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/v1/crop-calendar");
      if (response.data.success) {
        setTasks(response.data.data || []);
      }
    } catch (err: any) {
      setError("Failed to fetch calendar");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDistrictTasks = useCallback(async (targetDistrict: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/v1/crop-calendar/${targetDistrict}`);
      if (response.data.success) {
        setTasks(response.data.data || []);
      }
    } catch (err: any) {
      setError(`Failed to fetch tasks for ${targetDistrict}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      const response = await axiosInstance.put(`/api/v1/crop-calendar/${id}`, data);
      if (response.data.success) {
          if (district) fetchDistrictTasks(district);
          else fetchAllTasks();
          return true;
      }
    } catch (err: any) {
      return false;
    }
    return false;
  };

  const createTask = async (data: any) => {
    try {
      const response = await axiosInstance.post("/api/v1/crop-calendar/task", data);
      if (response.data.success) {
          if (district) fetchDistrictTasks(district);
          else fetchAllTasks();
          return true;
      }
    } catch (err: any) {
      return false;
    }
    return false;
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/crop-calendar/${id}`);
      if (response.data.success) {
          if (district) fetchDistrictTasks(district);
          else fetchAllTasks();
          return true;
      }
    } catch (err: any) {
      return false;
    }
    return false;
  };

  useEffect(() => {
    if (district) {
      fetchDistrictTasks(district);
    } else {
      fetchAllTasks();
    }
  }, [district, fetchDistrictTasks, fetchAllTasks]);

  return {
    tasks: tasks || [],
    isLoading,
    error,
    refreshTasks: district ? () => fetchDistrictTasks(district) : fetchAllTasks,
    fetchAllTasks,
    fetchDistrictTasks,
    updateTask,
    createTask,
    deleteTask
  };
}
