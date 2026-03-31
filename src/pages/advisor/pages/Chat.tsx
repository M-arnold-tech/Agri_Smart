import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../../components/ui/Button";
import {
  UserCircle2,
  Loader2,
  Check,
  Clock,
  MoreVertical,
  Search,
  SendHorizonal,
  ArrowLeft,
} from "lucide-react";
import useChat, {
  type Conversation,
  useChatSocket,
} from "../../../hooks/useChat";
import useAuth from "../../../hooks/useAuth";

export const AdvisorChat: React.FC = () => {
  const { user } = useAuth();
  const {
    conversations,
    messages,
    isLoading,
    fetchConversations,
    fetchHistory,
    sendMessage,
    setMessages,
  } = useChat();

  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  const activeId = activeChat ? activeChat.id : null;
  const { sendWsMessage, emitTyping, typingUsers } = useChatSocket(
    activeId,
    setMessages,
  );

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (activeChat) {
      if (activeChat.type === "PRIVATE") {
        fetchHistory(activeChat.id);
      }
    }
  }, [activeChat, fetchHistory]);

  useEffect(() => {
    if (!activeChat && conversations.length > 0) {
      setActiveChat(conversations[0]);
    }
  }, [conversations, activeChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value) {
      emitTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = window.setTimeout(() => {
        emitTyping(false);
      }, 2000);
    } else {
      emitTyping(false);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeChat) return;

    const content = input;
    setInput("");
    emitTyping(false);

    sendWsMessage(content, activeChat.id);
    await sendMessage({ content, receiverId: activeChat.id });
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 animate-fade-in font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-[380px] border-r border-gray-50 flex flex-col bg-white shrink-0">
        <div className="p-6 pb-2">
          <h2 className="text-xl font-black text-text-main tracking-tight mb-6">
            Messages
          </h2>
          <div className="relative group mb-4">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search farmers..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border-none rounded-2xl text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6">
          {isLoading && conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center opacity-40">
              <Loader2 className="animate-spin text-primary mb-2" size={24} />
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Gathering chats...
              </p>
            </div>
          ) : (
            conversations
              .filter((c) =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`group flex items-center gap-4 p-4 rounded-[24px] cursor-pointer transition-all duration-300 relative ${
                    activeChat?.id === chat.id
                      ? "bg-primary/5 shadow-sm"
                      : "hover:bg-gray-50/80"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold text-xl border border-primary/10 shadow-sm overflow-hidden transition-transform group-hover:scale-105">
                      {chat.name[0]}
                    </div>
                    {chat.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-lg flex items-center justify-center border-2 border-white shadow-sm ring-2 ring-primary/20">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4
                        className={`text-xs font-bold truncate tracking-tight transition-colors ${activeChat?.id === chat.id ? "text-primary" : "text-text-main"}`}
                      >
                        {chat.name}
                      </h4>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        {chat.lastMessage
                          ? new Date(
                              chat.lastMessage.createdAt,
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate font-medium ${activeChat?.id === chat.id ? "text-primary/60" : "text-gray-400"}`}
                    >
                      {chat.lastMessage?.content || "Tap to start chatting"}
                    </p>
                  </div>
                  {activeChat?.id === chat.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(46,125,50,0.3)]" />
                  )}
                </div>
              ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {activeChat ? (
          <>
            <header className="px-6 py-4 border-b border-gray-50 flex items-center justify-between z-10 bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="md:hidden p-2 rounded-sm hover:bg-gray-100"
                >
                  <ArrowLeft size={20} />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-sm relative shrink-0">
                    <UserCircle2 size={24} />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-sm shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-text-main tracking-tight leading-none mb-1">
                      {activeChat.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                        Online
                      </span>
                      {typingUsers.size > 0 && (
                        <span className="text-[10px] text-primary-light font-medium italic animate-pulse">
                          • Typing...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-text-main transition-all">
                  <Search size={18} />
                </button>
                <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-text-main transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 bg-gray-50/30"
            >
              {isLoading && messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-50">
                  <Loader2 className="text-primary animate-spin" size={32} />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Loading history...
                  </p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
                  <div className="w-20 h-20 bg-gray-100 rounded-[32px] flex items-center justify-center mb-4">
                    <UserCircle2 size={40} className="text-gray-400" />
                  </div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest leading-relaxed max-w-[200px]">
                    No conversation history with {activeChat.name.split(" ")[0]}
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isMe =
                    msg.senderId === user?.id || msg.senderId === "me";
                  return (
                    <div
                      key={msg.id || index}
                      className={`flex w-full ${isMe ? "justify-end" : "justify-start"} animate-fade-in`}
                    >
                      <div
                        className={`flex flex-col max-w-[75%] ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`px-5 py-4 rounded-[28px] text-[15px] font-medium leading-relaxed shadow-sm transition-all hover:shadow-md ${
                            isMe
                              ? "bg-primary text-white rounded-tr-none shadow-primary/20"
                              : "bg-white text-text-main rounded-tl-none border border-gray-100 shadow-gray-200/50"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div
                          className={`flex items-center gap-1.5 mt-2 px-1 ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {isMe &&
                            (msg.isOptimistic ? (
                              <Clock size={10} className="text-gray-300" />
                            ) : (
                              <Check size={10} className="text-primary" />
                            ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <footer className="p-6 bg-white border-t border-gray-50 flex flex-col gap-4">
              <form
                onSubmit={handleSendMessage}
                className="relative flex items-center gap-4"
              >
                <input
                  type="text"
                  placeholder={`Reply to ${activeChat.name}...`}
                  className="flex-1 pl-6 pr-16 py-5 bg-gray-50/80 border-none rounded-[24px] outline-none text-[15px] font-medium focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
                  value={input}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2.5 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-lg shadow-primary/20"
                >
                  <SendHorizonal size={22} />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-gray-50/20">
            <div className="w-24 h-24 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-8 animate-bounce shadow-xl shadow-primary/5">
              <SendHorizonal size={40} />
            </div>
            <h3 className="text-xl font-black text-text-main mb-3 uppercase tracking-widest">
              Your Messaging Hub
            </h3>
            <p className="text-text-muted max-w-[280px] leading-relaxed text-xs font-medium opacity-70">
              Select a farmer from the inquiry list to provide guidance or
              answer questions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
