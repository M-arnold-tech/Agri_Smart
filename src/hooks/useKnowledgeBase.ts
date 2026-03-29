import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

interface Resource {
    id: string;
    title: string;
    type: "PDF" | "IMAGE" | "GUIDE";
    url: string;
    description?: string;
    uploadedBy: string;
    createdAt: string;
}

export default function useKnowledgeBase() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [currentResource, setCurrentResource] = useState<Resource | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchResources = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/knowledge-base");
            if (response.data.success) {
                setResources(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch resources");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchResourceDetails = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/knowledge-base/${id}`);
            if (response.data.success) {
                setCurrentResource(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch resource details");
        } finally {
            setIsLoading(false);
        }
    };

    const uploadResource = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/knowledge-base/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.data.success) {
                toast.success(response.data.message || "Resource uploaded");
                await fetchResources();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Upload failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    const deleteResource = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/knowledge-base/${id}`);
            if (response.data.success) {
                toast.success(response.data.message || "Resource deleted");
                await fetchResources();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Deletion failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    useEffect(() => {
        fetchResources();
    }, []);

    return {
        resources,
        currentResource,
        isLoading,
        error,
        fetchResourceDetails,
        uploadResource,
        deleteResource,
        refreshResources: fetchResources
    };
}
