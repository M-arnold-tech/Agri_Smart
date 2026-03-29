import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

interface Message {
    id: string;
    content: string;
    senderId: string;
    senderName: string;
    receiverId?: string;
    groupId?: string;
    timestamp: string;
}

export default function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const fetchHistory = async (userId: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/chat/history/${userId}`);
            if (response.data.success) {
                setMessages(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch chat history");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchGroupHistory = async (groupId: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/chat/group/${groupId}`);
            if (response.data.success) {
                setMessages(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch group history");
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (payload: Partial<Message>) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/chat/send", payload);
            if (response.data.success) {
                // Manually add message to UI or refetch history
                const newMessage = response.data.data;
                setMessages((prev) => [...prev, newMessage]);
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send message");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    const useSocket = (roomId: string) => {
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token || !roomId) return;

            // Connect to WebSocket based on docs
            const ws = new WebSocket(`${import.meta.env.VITE_WS_URL || 'ws://localhost:3000'}/chat?token=${token}`);

            ws.onopen = () => {
                ws.send(JSON.stringify({ event: 'joinRoom', data: { roomId } }));
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.event === 'receiveMessage') {
                    setMessages(prev => [...prev, data.data]);
                }
            };

            setSocket(ws);

            return () => ws.close();
        }, [roomId]);

        const sendWsMessage = (content: string, receiverId?: string, groupId?: string) => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    event: 'sendMessage',
                    data: { content, receiverId, groupId }
                }));
            }
        };

        return { sendWsMessage, socket };
    };

    return {
        messages,
        isLoading,
        error,
        fetchHistory,
        fetchGroupHistory,
        sendMessage,
        useSocket
    };
}
