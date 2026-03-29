import React, { useEffect } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Users, AlertCircle, FileText, CheckCircle2, Loader2, MessageSquare, ArrowRight } from "lucide-react";
import useAdvisor from "../../../hooks/useAdvisor";
import useChat from "../../../hooks/useChat";
import { Link } from "react-router-dom";

export const AdvisorDashboard: React.FC = () => {
  const { stats, isLoading: advisorLoading } = useAdvisor();
  const { conversations, fetchConversations, isLoading: chatLoading } = useChat();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const isLoading = advisorLoading || chatLoading;

  if (isLoading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center min-h-[60vh]">
        <Loader2 className="text-primary animate-spin mb-4" size={48} />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Preparing your workspace...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1 tracking-tight">
            Advisor Dashboard
          </h1>
          <p className="text-text-muted text-lg">
            Manage your assigned farmers and pending consultations.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <CheckCircle2 size={16} /> Verified Advisor
        </div>
      </header>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-5 p-6 border-none shadow-sm bg-white hover:shadow-md transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <Users size={28} />
          </div>
          <div>
            <div className="text-3xl font-bold text-text-main leading-tight">{stats?.farmerCount || 0}</div>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Assigned Farmers</div>
          </div>
        </Card>
        
        <Card className="flex items-center gap-5 p-6 border-none shadow-sm bg-white hover:shadow-md transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
            <MessageSquare size={28} />
          </div>
          <div>
            <div className="text-3xl font-bold text-text-main leading-tight">{stats?.pendingRequests || 0}</div>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Pending Inquiries</div>
          </div>
        </Card>

        <Card className="flex items-center gap-5 p-6 border-none shadow-sm bg-white hover:shadow-md transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
            <FileText size={28} />
          </div>
          <div>
            <div className="text-3xl font-bold text-text-main leading-tight">{stats?.resourcesUploaded || 0}</div>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Knowledge Assets</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest">
              Recent Farmer Inquiries
            </h2>
            <Link to="/advisor/chat" className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <Card className="flex flex-col gap-0 p-0 overflow-hidden divide-y divide-gray-50 border-none shadow-sm bg-white rounded-3xl">
            {conversations.length > 0 ? (
              conversations.slice(0, 5).map((chat) => (
                <div key={chat.id} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center font-bold text-lg border border-primary/10 shadow-sm">
                      {chat.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main text-base uppercase tracking-tight">
                        {chat.name}
                      </h4>
                      <p className="text-xs text-text-muted line-clamp-1 max-w-[200px] md:max-w-xs">
                        {chat.lastMessage?.content || "No messages yet"}
                      </p>
                    </div>
                  </div>
                  <Link to="/advisor/chat">
                    <Button size="sm" variant="outline" className="rounded-xl font-bold uppercase tracking-widest text-[10px] px-4">
                      Respond
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <AlertCircle size={32} />
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No active inquiries</p>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="bg-[#2E7D32] text-white p-8 border-none shadow-xl shadow-primary/20 flex flex-col items-start gap-4 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-10 group-hover:scale-110 transition-transform">
               <FileText size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Publish Knowledge</h3>
              <p className="text-sm opacity-90 leading-relaxed font-medium">
                Support your farmers by uploading updated agronomy guides and market trends.
              </p>
              <Link to="/advisor/knowledge">
                <Button variant="secondary" fullWidth className="mt-8 rounded-2xl py-6 font-bold uppercase tracking-widest shadow-lg shadow-black/10">
                  Upload Resource
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="bg-white p-6 border-none shadow-sm rounded-3xl flex flex-col gap-4">
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">Performance Score</h4>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-[#2E7D32] tracking-tighter">{stats?.performanceScore || 0}%</span>
              <span className="text-[10px] font-bold text-[#2E7D32]/60 uppercase tracking-widest pb-1.5">Advisor Rating</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-[#2E7D32] h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${stats?.performanceScore || 0}%` }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
