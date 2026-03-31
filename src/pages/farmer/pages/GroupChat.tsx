import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  SendHorizonal,
  Loader2,
  Check,
  Clock,
  MoreVertical,
  Info,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import useChat, { useChatSocket } from "../../../hooks/useChat";
import useGroups from "../../../hooks/useGroups";
import useAuth from "../../../hooks/useAuth";

export const FarmerGroupChat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { groups, isLoading: groupsLoading } = useGroups(user?.district);
  const activeGroup = groups.find((g) => g.id === id);

  const {
    messages,
    isLoading: chatLoading,
    sendMessage,
    fetchGroupHistory,
    setMessages,
  } = useChat();

  const [localInput, setLocalInput] = useState("");
  const { sendWsMessage, emitTyping, typingUsers, socket } = useChatSocket(
    id || null,
    setMessages,
  );
  const isConnected = socket?.readyState === WebSocket.OPEN;

  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize group chat
  useEffect(() => {
    if (id) {
      fetchGroupHistory(id);
    }
  }, [id, fetchGroupHistory]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || !id) return;

    // Send via WebSocket for real-time
    sendWsMessage(localInput, undefined, id);

    // Persist via REST
    await sendMessage({ content: localInput, groupId: id });

    setLocalInput("");
    emitTyping(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
    if (e.target.value) {
      emitTyping(true);
    } else {
      emitTyping(false);
    }
  };

  if (groupsLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center flex-1 animate-fade-in h-screen">
        <Loader2 className="text-primary animate-spin mb-4" size={48} />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Loading community details...
        </p>
      </div>
    );
  }

  if (!activeGroup && !groupsLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center animate-fade-in">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-sm flex items-center justify-center mb-6">
          <Info size={32} />
        </div>
        <h3 className="text-xl font-bold text-text-main mb-2">
          Group Not Found
        </h3>
        <p className="text-text-muted max-w-xs mb-8">
          This group may have been disbanded or you are no longer a member.
        </p>
        <Button onClick={() => navigate("/farmer/groups")}>
          Back to Communities
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-[32px] overflow-hidden  border border-gray-100 animate-fade-in">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link
            to="/farmer/groups"
            className="w-10 h-10 rounded-sm flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-primary transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-main uppercase tracking-tight leading-none mb-1">
                {activeGroup?.name || "Community Discussion"}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                  {activeGroup?.memberCount} Active Members
                </span>
                {typingUsers.size > 0 && (
                  <span className="text-[10px] text-secondary font-medium italic animate-pulse">
                    • Someone is typing...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isConnected && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-amber-50 text-amber-600 border border-amber-100 animate-pulse">
              <Loader2 size={12} className="animate-spin" />
              <span className="text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">
                Connecting...
              </span>
            </div>
          )}
          <button className="w-10 h-10 rounded-sm flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto bg-[url('/textures/noise.png')] bg-gray-50/50 flex flex-col gap-6"
      >
        {chatLoading && messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <Loader2 className="text-primary animate-spin" size={32} />
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Loading history...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-50">
            <div className="w-16 h-16 bg-primary/5 text-primary/30 rounded-sm flex items-center justify-center mb-4">
              <Users size={32} />
            </div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest leading-relaxed max-w-[200px]">
              No messages yet. Be the first to start the discussion!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === user?.id;
            return (
              <div
                key={msg.id || index}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}
                >
                  {!isMe && (
                    <div className="flex items-center gap-2 mb-1 px-1">
                      {msg.sender?.avatarUrl ? (
                        <img
                          src={msg.sender.avatarUrl}
                          alt={msg.sender.firstName}
                          className="w-5 h-5 rounded-sm object-cover"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-sm bg-secondary/10 flex items-center justify-center text-[9px] font-bold text-secondary">
                          {msg.sender?.firstName?.[0] || "?"}
                        </div>
                      )}
                      <span className="text-[10px] font-bold text-gray-500">
                        {msg.sender?.firstName} {msg.sender?.lastName}
                      </span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-[20px] text-xs wrap-break-word  ${
                      isMe
                        ? "bg-[#2E7D32] text-white rounded-tr-none"
                        : "bg-white text-text-main rounded-tl-none border border-gray-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 mt-1 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <span className="text-[9px] text-gray-400 font-bold tracking-tight">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {isMe &&
                      (msg.isOptimistic ? (
                        <Clock size={10} className="text-gray-300" />
                      ) : (
                        <Check size={10} className="text-[#2E7D32]" />
                      ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <footer className="p-4 bg-white border-t border-gray-100">
        <form
          onSubmit={handleSendMessage}
          className="relative flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Share an update or ask a question..."
            className="flex-1 bg-gray-50 border border-transparent rounded-2xl py-4 px-6 pr-12 text-xs font-medium outline-none focus:bg-white focus:border-primary/20 transition-all placeholder:text-gray-400"
            value={localInput}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={!localInput.trim()}
            className="absolute right-3 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all  shadow-primary/20"
          >
            <SendHorizonal size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};
