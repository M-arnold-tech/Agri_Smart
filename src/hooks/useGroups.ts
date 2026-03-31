import { useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

export interface Group {
  id: string;
  name: string;
  description: string;
  district: string;
  memberCount: number;
  members?: string[];
}

export default function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async (district?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = district ? `/api/v1/groups?district=${district}` : "/api/v1/groups";
      const response = await axiosInstance.get(url);
      if (response.data.success) {
        setGroups(response.data.data || []);
      }
    } catch (err: any) {
      setError("Failed to load groups");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchGroupById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/v1/groups/${id}`);
      if (response.data.success) {
        setSelectedGroup(response.data.data);
      }
    } catch (err: any) {
      setError("Failed to load group");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const joinGroup = async (id: string) => {
    try {
      const response = await axiosInstance.post(`/api/v1/groups/${id}/join`);
      return response.data.success;
    } catch (err: any) {
      return false;
    }
  };

  const leaveGroup = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/groups/${id}/leave`);
      return response.data.success;
    } catch (err: any) {
      return false;
    }
  };

  const createGroup = async (data: any) => {
    try {
      const response = await axiosInstance.post("/api/v1/groups/create", data);
      return response.data.success;
    } catch (err: any) {
      return false;
    }
  };

  return {
    groups: groups || [],
    selectedGroup,
    isLoading,
    error,
    fetchGroups,
    refreshGroups: fetchGroups,
    fetchGroupById,
    joinGroup,
    leaveGroup,
    createGroup
  };
}

const createGroupSchema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Required"),
  district: yup.string().required("Required"),
  description: yup.string().min(10, "Provide more details about the group").required("Required"),
});

export function useCreateGroup(onSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(createGroupSchema),
    defaultValues: {
      name: "",
      district: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/groups/create", data);
      if (response.data.success) {
        toast.success("Group created successfully!");
        reset();
        if (onSuccess) onSuccess();
      } else {
        toast.error(response.data.message || "Failed to create group");
      }
    } catch (err: any) {
      toast.error("An error occurred while creating the group");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    setValue,
  };
}
