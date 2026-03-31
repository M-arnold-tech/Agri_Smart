import { useState, useCallback, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  timestamp: string;
  createdAt: string;
  isOptimistic?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  lastMessageTime: string;
  type: "PRIVATE" | "GROUP";
  unreadCount: number;
}

export default function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/v1/chat/conversations");
      if (response.data.success) {
        setConversations(response.data.data || []);
      }
    } catch (err: any) {
      setError("Failed to load conversations");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/v1/chat/history/${userId}`);
      if (response.data.success) {
        setMessages(response.data.data || []);
      }
    } catch (err: any) {
      setError("Failed to load chat history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchGroupChat = useCallback(async (groupId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/v1/chat/group/${groupId}`);
      if (response.data.success) {
        setMessages(response.data.data || []);
      }
    } catch (err: any) {
      setError("Failed to load group history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = async (payload: { 
    content: string; 
    receiverId?: string; 
    groupId?: string; 
  }) => {
    try {
      const response = await axiosInstance.post("/api/v1/chat/send", payload);
      return response.data.success;
    } catch (err: any) {
      return false;
    }
  };

  const searchUsers = async (query: string) => {
     try {
       const response = await axiosInstance.get(`/api/v1/chat/users/search?q=${query}`);
       return response.data.data || [];
     } catch (err: any) {
       return [];
     }
  };

  return {
    conversations: conversations || [],
    messages: messages || [],
    isLoading,
    error,
    fetchConversations,
    fetchHistory,
    fetchGroupChat,
    sendMessage,
    searchUsers,
    setMessages,
  };
}

// Mock socket for now to keep components running
export function useChatSocket(activeId: string | null, setMessages: any) {
    return {
        sendWsMessage: (content: string, id: string) => {},
        emitTyping: (isTyping: boolean) => {},
        typingUsers: new Set<string>(),
    };
}
