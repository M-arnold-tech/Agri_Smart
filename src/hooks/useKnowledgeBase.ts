import { useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

export interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  category: string;
  uploadedAt: string;
}

export default function useKnowledgeBase() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/v1/knowledge-base");
      if (response.data.success) {
        setResources(response.data.data || []);
      }
    } catch (err: any) {
      setError("Failed to load resources");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchResourceById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/v1/knowledge-base/${id}`);
      if (response.data.success) {
        setSelectedResource(response.data.data);
      }
    } catch (err: any) {
      setError("Failed to load resource");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadResource = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/api/v1/knowledge-base/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data.success;
    } catch (err: any) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResource = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/knowledge-base/${id}`);
      return response.data.success;
    } catch (err: any) {
      return false;
    }
  };

  return {
    resources: resources || [],
    selectedResource,
    isLoading,
    error,
    fetchResources,
    fetchResourceById,
    uploadResource,
    deleteResource
  };
}
