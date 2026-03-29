import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Send, UserCircle2 } from 'lucide-react';
import './ChatHub.css';

export const ChatHub: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'advisor', text: 'Hello John! Have you applied the fertilizer yet?', time: '09:00 AM' },
    { id: 2, sender: 'farmer', text: 'Hi Sarah. Yes, I applied it yesterday as advised.', time: '10:30 AM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'farmer', text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setInput('');
  };

  return (
    <div className="chat-hub animate-fade-in">
      <div className="chat-sidebar">
        <h2 className="chat-title">Messages</h2>
        <div className="chat-list">
          <div className="chat-list-item active">
            <UserCircle2 size={40} className="text-primary" />
            <div className="chat-list-info">
              <h4>Sarah Advisor</h4>
              <p>Hi Sarah. Yes, I applied...</p>
            </div>
            <span className="chat-time">10:30 AM</span>
          </div>
          <div className="chat-list-item">
            <UserCircle2 size={40} className="text-muted" />
            <div className="chat-list-info">
              <h4>Musanze Coop Group</h4>
              <p>Meeting tomorrow at 10...</p>
            </div>
            <span className="chat-time">Yesterday</span>
          </div>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-info">
            <UserCircle2 size={40} className="text-primary" />
            <div>
              <h3>Sarah Advisor</h3>
              <span className="status online">Online</span>
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender === 'farmer' ? 'sent' : 'received'}`}>
              <div className="chat-bubble">
                <p>{msg.text}</p>
                <span className="chat-bubble-time">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="md">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};
