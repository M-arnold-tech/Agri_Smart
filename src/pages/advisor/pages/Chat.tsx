import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Send, UserCircle2 } from "lucide-react";

export const AdvisorChat: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "advisor",
      text: "Hello John! Have you applied the fertilizer yet?",
      time: "09:00 AM",
    },
    {
      id: 2,
      sender: "farmer",
      text: "Hi Sarah. Yes, I applied it yesterday as advised.",
      time: "10:30 AM",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "advisor",
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-64px-3rem)] bg-surface rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
      <div className="hidden md:flex w-80 border-r border-gray-200 flex-col bg-background">
        <h2 className="p-6 border-b border-gray-200 uppercase tracking-tight text-text-muted text-[11px] font-bold">
          Farmer Inquiries
        </h2>
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-4 p-4 pl-6 cursor-pointer transition-colors border-b border-gray-200 bg-surface border-l-4 border-primary">
            <UserCircle2 size={40} className="text-primary" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-text-main mb-1">
                John Farmer
              </h4>
              <p className="text-xs text-text-muted truncate">
                Hi Sarah. Yes, I applied...
              </p>
            </div>
            <span className="text-[10px] text-text-light">10:30 AM</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 px-6 border-b border-gray-200 flex items-center justify-between bg-surface">
          <div className="flex items-center gap-4">
            <UserCircle2 size={40} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-text-main">
                John Farmer
              </h3>
              <span className="text-xs text-primary-light font-medium">
                Musanze • Maize Field
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-background/50">
          {messages.map((msg: any) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.sender === "advisor" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 px-4 rounded-2xl relative ${
                  msg.sender === "advisor"
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-surface border border-gray-200 text-text-main rounded-tl-none shadow-sm"
                }`}
              >
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                <span
                  className={`block text-[10px] mt-2 text-right ${msg.sender === "advisor" ? "text-white/80" : "text-text-muted"}`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form
          className="p-4 px-6 border-t border-gray-200 flex gap-4 bg-surface"
          onSubmit={handleSend}
        >
          <input
            type="text"
            placeholder="Type your reply..."
            className="flex-1 px-6 py-3 rounded-full border border-gray-200 outline-none text-[15px] bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            size="md"
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center shrink-0"
          >
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
};
