import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../../components/ui/Button";
import {
  Send,
  UserCircle2,
  Loader2,
  Users,
  Check,
  Clock,
  MoreVertical,
  Search,
  SendHorizonal,
} from "lucide-react";
import useChat, {
  type Conversation,
  type DirectoryUser,
  useChatSocket,
} from "../../../hooks/useChat";
import useAuth from "../../../hooks/useAuth";
import useFarmer from "../../../hooks/useFarmer";
import useGroups, { type Group } from "../../../hooks/useGroups";
import { Input } from "../../../components/ui/Input";
import { Drawer } from "../../../components/ui/Drawer";

export const FarmerChat: React.FC = () => {
  const { user } = useAuth();
  const {} = useFarmer(); // Hook kept to preserve logic structure if needed later
  const {
    conversations,
    directoryUsers,
    messages,
    isLoading,
    fetchConversations,
    searchUsers,
    fetchHistory,
    fetchGroupHistory,
    sendMessage,
    setMessages,
  } = useChat();

  const { groups, joinGroup } = useGroups();

  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarTab, setSidebarTab] = useState<"messages" | "directory">(
    "messages",
  );
  const [directoryTab, setDirectoryTab] = useState<"farmers" | "groups">(
    "farmers",
  );
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  // Active target ID (Advisor ID or Group ID)
  // If no chat is actively selected, default to the first one available or fallback safely
  const activeId = activeChat ? activeChat.id : null;

  // WebSocket setup
  const { sendWsMessage, emitTyping, typingUsers } = useChatSocket(
    activeId,
    setMessages,
  );

  // Initial load
  useEffect(() => {
    fetchConversations();
    searchUsers("");
  }, []);

  // Fetch history when active chat changes
  useEffect(() => {
    if (activeChat) {
      if (activeChat.type === "PRIVATE") {
        fetchHistory(activeChat.id);
      } else if (activeChat.type === "GROUP") {
        fetchGroupHistory(activeChat.id);
      }
    }
  }, [activeChat]);

  // Set default active chat
  useEffect(() => {
    if (!activeChat && conversations.length > 0) {
      setActiveChat(conversations[0]);
    }
  }, [conversations, activeChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    // Typing indicator logic
    if (e.target.value) {
      emitTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        emitTyping(false);
      }, 2000);
    } else {
      emitTyping(false);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  };

  const startDirectChat = (dirUser: DirectoryUser) => {
    const existingChat = conversations.find(
      (c) => c.type === "PRIVATE" && c.id === dirUser.id,
    );
    if (existingChat) {
      setActiveChat(existingChat);
    } else {
      setActiveChat({
        id: dirUser.id,
        type: "PRIVATE",
        name: `${dirUser.firstName} ${dirUser.lastName}`,
        unreadCount: 0,
      });
    }
    setSidebarTab("messages");
  };

  const handleGroupClick = (group: Group) => {
    const existingChat = conversations.find(
      (c) => c.type === "GROUP" && c.id === group.id,
    );
    if (existingChat) {
      setActiveChat(existingChat);
    } else {
      setActiveChat({
        id: group.id,
        type: "GROUP",
        name: group.name,
        unreadCount: 0,
      });
    }
    setSidebarTab("messages");
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeChat) return;

    const payload = {
      content: input,
      [activeChat.type === "PRIVATE" ? "receiverId" : "groupId"]: activeChat.id,
    };

    // Try WS first, fallback to REST
    sendWsMessage(
      input,
      activeChat.type === "PRIVATE" ? activeChat.id : undefined,
      activeChat.type === "GROUP" ? activeChat.id : undefined,
    );

    emitTyping(false);

    // Also send via REST for persistence/fallback
    const sent = await sendMessage(payload as any);
    if (sent) setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-64px-3rem)] bg-surface rounded-xl  border border-gray-200 overflow-hidden animate-fade-in font-sans">
      {/* Sidebar - Dynamic Conversations & Directory */}
      <div className="hidden md:flex w-80 border-r border-gray-200 flex-col bg-background relative z-20">
        <div className="px-5 pt-5 pb-3 border-b border-gray-200 bg-surface">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-semibold text-text-main tracking-tight">
              Messages
            </h2>
            <button
              onClick={() => setIsDiscoveryOpen(true)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-primary hover:bg-primary/10 transition-all hover:scale-110"
              title="New Message"
            >
              <Send size={16} />
            </button>
          </div>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
            <button
              onClick={() => setSidebarTab("messages")}
              className={`flex-1 text-[11px] font-semibold uppercase tracking-wider py-2 rounded-lg transition-all ${
                sidebarTab === "messages"
                  ? "bg-white text-primary "
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Inbox
            </button>
            <button
              onClick={() => setSidebarTab("directory")}
              className={`flex-1 text-[11px] font-semibold uppercase tracking-wider py-2 rounded-lg transition-all ${
                sidebarTab === "directory"
                  ? "bg-white text-primary "
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Public
            </button>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              type="text"
              placeholder={
                sidebarTab === "messages"
                  ? "Search inbox..."
                  : "Search groups..."
              }
              className="w-full bg-background border border-gray-100 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sidebarTab === "messages" &&
            (isLoading && conversations.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center opacity-50">
                <Loader2 className="animate-spin text-primary mb-2" size={24} />
                <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
                  Loading...
                </p>
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center opacity-50">
                <p className="text-xs font-bold text-text-muted">
                  No conversations found.
                </p>
              </div>
            ) : (
              conversations.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer transition-all ${
                    activeChat?.id === chat.id
                      ? "bg-gray-50"
                      : "hover:bg-gray-50/50"
                  }`}
                >
                  <div className="relative shrink-0">
                    {chat.type === "PRIVATE" ? (
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border border-gray-100 overflow-hidden">
                        <UserCircle2 size={56} className="text-gray-400" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-[18px] bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/5">
                        <Users size={28} />
                      </div>
                    )}
                    {chat.type === "PRIVATE" && (
                      <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4
                        className={`text-[13px] font-bold truncate ${activeChat?.id === chat.id ? "text-text-main" : "text-text-main"}`}
                      >
                        {chat.name}
                      </h4>
                      {chat.lastMessage && (
                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                          {new Date(
                            chat.lastMessage.createdAt,
                          ).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      <p
                        className={`text-[12px] truncate ${chat.unreadCount > 0 ? "text-text-main font-bold" : "text-gray-500 font-medium"}`}
                      >
                        {chat.lastMessage?.content || "No messages yet"}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-[#2E7D32] text-white text-[10px] font-semibold h-5 w-5 flex items-center justify-center rounded-full shrink-0">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ))}

          {sidebarTab === "directory" && (
            <div className="flex flex-col h-full">
              <div className="px-5 py-2 border-b border-gray-100 flex gap-4 text-xs font-bold text-gray-500 bg-surface z-10 sticky top-0">
                <button
                  onClick={() => setDirectoryTab("farmers")}
                  className={
                    directoryTab === "farmers"
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "hover:text-gray-700 pb-1"
                  }
                >
                  Farmers & Advisors
                </button>
                <button
                  onClick={() => setDirectoryTab("groups")}
                  className={
                    directoryTab === "groups"
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "hover:text-gray-700 pb-1"
                  }
                >
                  Groups
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {directoryTab === "farmers" &&
                  (directoryUsers.length === 0 ? (
                    <div className="p-8 text-center opacity-50">
                      <p className="text-xs font-bold text-text-muted">
                        No users found.
                      </p>
                    </div>
                  ) : (
                    directoryUsers.map((dirUser) => (
                      <div
                        key={dirUser.id}
                        onClick={() => startDirectChat(dirUser)}
                        className="flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer hover:bg-surface-hover transition-colors"
                      >
                        {dirUser.avatarUrl ? (
                          <img
                            src={dirUser.avatarUrl}
                            alt={dirUser.firstName}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {dirUser.firstName?.[0] || "?"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-text-main truncate">
                            {dirUser.firstName} {dirUser.lastName}
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                            {dirUser.role}
                          </span>
                        </div>
                      </div>
                    ))
                  ))}
                {directoryTab === "groups" &&
                  (groups.length === 0 ? (
                    <div className="p-8 text-center opacity-50">
                      <p className="text-xs font-bold text-text-muted">
                        No groups found.
                      </p>
                    </div>
                  ) : (
                    groups.map((group) => (
                      <div
                        key={group.id}
                        onClick={() => handleGroupClick(group)}
                        className="flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer hover:bg-surface-hover transition-colors"
                      >
                        <div className="w-10 h-10 rounded-[14px] bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                          <Users size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-text-main truncate">
                            {group.name}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-medium truncate">
                            {group.memberCount} members
                          </span>
                        </div>
                      </div>
                    ))
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative z-10">
        {/* Header */}
        <div className="p-4 px-6 border-b border-gray-200 flex items-center justify-between bg-surface  sticky top-0 z-20">
          {activeChat ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                {activeChat.type === "PRIVATE" ? (
                  <UserCircle2 size={40} className="text-primary" />
                ) : (
                  <div className="w-10 h-10 rounded-[14px] bg-secondary text-white flex items-center justify-center  shadow-secondary/20">
                    <Users size={22} />
                  </div>
                )}
                {activeChat.type === "PRIVATE" && (
                  <span className="absolute bottom-1 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-main uppercase tracking-tight flex items-center gap-2">
                  {activeChat.name}
                </h3>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1">
                  {activeChat.type === "PRIVATE"
                    ? "Private Discussion"
                    : "Community Group"}
                  {typingUsers.size > 0 && (
                    <span className="text-secondary-dark lowercase italic flex items-center gap-1 animate-pulse ml-2 before:content-['•'] before:text-gray-300 before:mr-1">
                      Someone is typing...
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-text-muted">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Connecting...
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
              <Search size={18} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Message List */}
        <div
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 bg-[url('/textures/noise.png')] bg-gray-50/50 object-cover"
        >
          {isLoading && messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-pulse">
              <Loader2 className="text-primary animate-spin" size={32} />
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
                Loading Conversation...
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Send size={32} className="text-text-muted" />
              </div>
              <h4 className="text-xs font-bold text-text-main mb-2">
                No messages yet
              </h4>
              <p className="text-xs text-text-muted max-w-[200px]">
                Send your first message to start the conversation!
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === user?.id || msg.senderId === "me";
              return (
                <div
                  key={msg.id}
                  className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex flex-col gap-1 max-w-[75%] ${isMe ? "items-end" : "items-start"}`}
                  >
                    {!isMe && (
                      <div className="flex items-center gap-2 mb-1 px-1">
                        {msg.sender?.avatarUrl ? (
                          <img
                            src={msg.sender.avatarUrl}
                            alt={msg.sender.firstName}
                            className="w-5 h-5 rounded-full object-cover "
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-[9px] font-semibold text-secondary uppercase ">
                            {msg.sender?.firstName?.[0] || "?"}
                          </div>
                        )}
                        <span className="text-[10px] font-bold text-gray-500 tracking-tight">
                          {msg.sender?.firstName
                            ? `${msg.sender.firstName} ${msg.sender.lastName}`
                            : "Unknown"}
                        </span>
                      </div>
                    )}
                    <div
                      className={`p-3 px-5 rounded-[22px] relative border ${
                        isMe
                          ? "bg-[#2E7D32] text-white border-[#2E7D32] rounded-tr-[4px]  font-medium"
                          : "bg-[#efefef] border-transparent text-text-main rounded-tl-[4px] shadow-none font-medium"
                      } ${msg.isOptimistic ? "opacity-70 animate-pulse" : "opacity-100"}`}
                    >
                      <p className="text-[14px] leading-snug">{msg.content}</p>
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-0.5 ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <span className="text-[9px] text-gray-400 font-bold tracking-wider">
                        {msg.isOptimistic
                          ? "Sending..."
                          : new Date(
                              msg.createdAt || Date.now(),
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                      </span>
                      {isMe && !msg.isOptimistic && (
                        <Check size={10} className="text-[#2E7D32]" />
                      )}
                      {isMe && msg.isOptimistic && (
                        <Clock size={10} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {/* Subtle typing indicator in chat stream */}
          {typingUsers.size > 0 && (
            <div className="flex w-full justify-start animate-fade-in">
              <div className="bg-surface border border-gray-200 rounded-2xl rounded-tl-none p-3 px-4  flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        {(() => {
          const activeGroup = groups.find((g) => g.id === activeChat?.id);
          const isGroupJoined =
            activeChat?.type === "GROUP"
              ? activeGroup && activeGroup.isMember !== false
              : true;

          if (!isGroupJoined && activeGroup) {
            return (
              <div className="p-6 border-t border-gray-200 flex flex-col items-center justify-center bg-surface/80 backdrop-blur-md">
                <p className="text-[13px] font-bold text-gray-500 mb-3">
                  You must join this community to see history and post messages.
                </p>
                <Button
                  onClick={async () => {
                    const joined = await joinGroup(activeGroup.id);
                    if (joined) {
                      // Trigger a re-fetch of group history if they just joined
                      fetchGroupHistory(activeGroup.id);
                    }
                  }}
                  className="rounded-full  hover:scale-105 transition-all"
                >
                  Join Community Group
                </Button>
              </div>
            );
          }

          return (
            <form
              className="p-5 px-6 border-t border-gray-200 flex items-center gap-4 bg-surface/80 backdrop-blur-md"
              onSubmit={handleSend}
            >
              <Input
                type="text"
                placeholder={
                  activeChat?.type === "PRIVATE"
                    ? "Type your message..."
                    : "Message the group..."
                }
                value={input}
                onChange={handleInputChange}
                disabled={!activeChat || (isLoading && !input)}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="rounded-full min-w-10 min-h-10 bg-[#2E7D32] text-white flex items-center justify-center hover:scale-105 transition-all"
              >
                {isLoading && !input ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <SendHorizonal size={16} />
                )}
              </button>
            </form>
          );
        })()}
      </div>

      <Drawer
        isOpen={isDiscoveryOpen}
        onClose={() => setIsDiscoveryOpen(false)}
        title="New Message"
        description="Search for farmers, advisors or admins"
      >
        <div className="flex flex-col h-full">
          <div className="relative mb-6">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchUsers(e.target.value);
              }}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-xs font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="animate-spin text-primary" size={24} />
              </div>
            ) : directoryUsers.length === 0 ? (
              <div className="text-center p-8 opacity-50">
                <p className="text-xs font-bold text-text-muted">
                  No users found matching your search.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {directoryUsers.map((dirUser) => (
                  <div
                    key={dirUser.id}
                    onClick={() => {
                      startDirectChat(dirUser);
                      setIsDiscoveryOpen(false);
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all border border-transparent hover:border-gray-100 group"
                  >
                    <div className="relative">
                      {dirUser.avatarUrl ? (
                        <img
                          src={dirUser.avatarUrl}
                          alt={dirUser.firstName}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold uppercase text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                          {dirUser.firstName?.[0] || "?"}
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors">
                        {dirUser.firstName} {dirUser.lastName}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-semibold truncate uppercase tracking-wider">
                        {dirUser.role} • {dirUser.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};
