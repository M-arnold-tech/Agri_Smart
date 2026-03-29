import { useState, useEffect, useCallback, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

export interface Message {
    id: string;
    content: string;
    senderId: string;
    receiverId?: string | null;
    groupId?: string | null;
    type?: "TEXT" | "IMAGE" | "FILE";
    createdAt: string;
    sender?: {
        firstName: string;
        lastName: string;
        avatarUrl?: string | null;
    };
    isOptimistic?: boolean; // For UI state
}

export interface DirectoryUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "FARMER" | "ADVISOR" | "ADMIN";
    avatarUrl?: string | null;
}

export interface Conversation {
    id: string;
    type: "GROUP" | "PRIVATE";
    name: string;
    lastMessage?: {
        content: string;
        createdAt: string;
        senderId: string;
    } | null;
    unreadCount: number;
}

export default function useChat() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [directoryUsers, setDirectoryUsers] = useState<DirectoryUser[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchUsers = useCallback(async (query?: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/chat/users/search', {
                params: { q: query }
            });
            if (response.data.success) {
                setDirectoryUsers(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to search users");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchConversations = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/chat/conversations');
            if (response.data.success) {
                setConversations(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch conversations");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchHistory = useCallback(async (userId: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/chat/history/${userId}`);
            if (response.data.success) {
                setMessages([...response.data.data].reverse());
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch chat history");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchGroupHistory = useCallback(async (groupId: string, offset: number = 0) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/chat/group/${groupId}`, {
                params: { limit: 50, offset }
            });
            if (response.data.success) {
                const newMessages = [...response.data.data].reverse();
                if (offset === 0) {
                    setMessages(newMessages);
                } else {
                    setMessages((prev) => [...newMessages, ...prev]);
                }
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch group history");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const sendMessage = useCallback(async (payload: { content: string; receiverId?: string; groupId?: string }) => {
        // Optimistic update
        const tempId = `temp-${Date.now()}`;
        const optimisticMsg: Message = {
            id: tempId,
            content: payload.content,
            senderId: "me",
            receiverId: payload.receiverId,
            groupId: payload.groupId,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
            sender: { firstName: "You", lastName: "" }
        };

        setMessages((prev) => [...prev, optimisticMsg]);
        
        try {
            const response = await axiosInstance.post("/chat/send", payload);
            if (response.data.success) {
                const realMessage = response.data.data;
                setMessages((prev) => 
                    prev.map(msg => msg.id === tempId ? realMessage : msg)
                );
                return true;
            }
        } catch (err: any) {
            setMessages((prev) => prev.filter(msg => msg.id !== tempId));
            toast.error(err.response?.data?.message || "Failed to send message");
        }
        return false;
    }, []);

    return {
        conversations,
        directoryUsers,
        messages,
        isLoading,
        error,
        searchUsers,
        fetchConversations,
        fetchHistory,
        fetchGroupHistory,
        sendMessage,
        setMessages
    };
}

// Separate, stable hook for WebSocket functionality
export function useChatSocket(activeRoomId: string | null, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio
    useEffect(() => {
        audioRef.current = new Audio('/sounds/pop.mp3');
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';
        const ws = new WebSocket(`${wsUrl}/chat?token=${token}`);

        ws.onopen = () => {
            if (activeRoomId) {
                ws.send(JSON.stringify({ event: 'joinRoom', data: { roomId: activeRoomId } }));
            }
        };

        ws.onmessage = (event) => {
            const payload = JSON.parse(event.data);
            
            switch(payload.event) {
                case 'receiveMessage':
                    setMessages(prev => [...prev, payload.data]);
                    if (document.hidden && audioRef.current) {
                        audioRef.current.play().catch(() => console.log('Audio overlap ignored'));
                    }
                    break;
                case 'userTyping':
                    if (payload.data.isTyping) {
                        setTypingUsers(prev => new Set(prev).add(payload.data.userId));
                    } else {
                        setTypingUsers(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(payload.data.userId);
                            return newSet;
                        });
                    }
                    break;
                case 'joinedRoom':
                    console.log('Joined room:', payload.data.roomId);
                    break;
            }
        };

        setSocket(ws);

        return () => {
            if (activeRoomId && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ event: 'leaveRoom', data: { roomId: activeRoomId } }));
            }
            ws.close();
        };
    }, []); // Still once per mount of the component using this hook

    // Handle Active Room Switching
    useEffect(() => {
        if (socket?.readyState === WebSocket.OPEN && activeRoomId) {
            socket.send(JSON.stringify({ event: 'joinRoom', data: { roomId: activeRoomId } }));
        }
    }, [activeRoomId, socket]);

    const sendWsMessage = useCallback((content: string, receiverId?: string | null, groupId?: string | null) => {
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                event: 'sendMessage',
                data: { content, receiverId, groupId }
            }));
        }
    }, [socket]);

    const emitTyping = useCallback((isTyping: boolean) => {
        if (socket?.readyState === WebSocket.OPEN && activeRoomId) {
            socket.send(JSON.stringify({
                event: 'typing',
                data: { roomId: activeRoomId, isTyping }
            }));
        }
    }, [socket, activeRoomId]);

    return { sendWsMessage, emitTyping, typingUsers, socket };
}
