import { useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

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
    fetchGroupById,
    joinGroup,
    leaveGroup,
    createGroup
  };
}
