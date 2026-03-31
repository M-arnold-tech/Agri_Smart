import React from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import {
  Users,
  MapPin,
  Sprout,
  MessageSquare,
  Calendar,
  Search,
  UserCircle2,
  Loader2,
} from "lucide-react";
import useAdvisor from "../../../hooks/useAdvisor";
import { useNavigate } from "react-router-dom";

export const AdvisorFarmers: React.FC = () => {
  const { farmers, isLoading } = useAdvisor();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  if (isLoading && farmers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center min-h-[60vh]">
        <Loader2 className="text-primary animate-spin mb-4" size={48} />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Loading your assignments...
        </p>
      </div>
    );
  }

  const filteredFarmers = farmers.filter(
    (f) =>
      `${f.firstName} ${f.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      f.district.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-main mb-2 tracking-tight">
            My Assignments
          </h1>
          <p className="text-text-muted font-medium">
            Manage and support your assigned farmers across districts.
          </p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or district..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-xs focus:ring-4 focus:ring-primary/10 shadow-sm outline-none transition-all placeholder:text-gray-400 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {filteredFarmers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <Card
              key={farmer.id}
              className="group p-0 border-none shadow-sm bg-white overflow-hidden rounded-[32px] hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 border border-transparent hover:border-gray-100"
            >
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-[24px] bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <UserCircle2 size={32} />
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest border border-gray-100 italic">
                    Active
                  </div>
                </div>

                <h3 className="text-xl font-bold text-text-main mb-1 tracking-tight group-hover:text-primary transition-colors">
                  {farmer.firstName} {farmer.lastName}
                </h3>

                <div className="flex items-center gap-1.5 text-text-muted mb-4">
                  <MapPin size={14} className="text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {farmer.district} District
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary">
                        <Sprout size={14} />
                      </div>
                      <span className="text-xs font-bold text-text-main">
                        Managed Crops
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {farmer.crops.slice(0, 2).map((crop, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-gray-50 text-gray-500 font-black px-2 py-0.5 rounded-md border border-gray-100 uppercase tracking-tighter"
                        >
                          {crop}
                        </span>
                      ))}
                      {farmer.crops.length > 2 && (
                        <span className="text-[10px] text-gray-400 font-bold self-center">
                          +{farmer.crops.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50/50 flex gap-2 border-t border-gray-50">
                <Button
                  variant="secondary"
                  fullWidth
                  className="rounded-xl h-11 text-[10px] font-black uppercase tracking-widest shadow-none hover:shadow-md transition-all"
                  onClick={() => navigate("/advisor/chat")}
                >
                  <MessageSquare size={14} className="mr-2" />
                  Chat
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="rounded-xl h-11 text-[10px] font-black uppercase tracking-widest bg-white border-gray-200"
                >
                  <Calendar size={14} className="mr-2" />
                  Plan
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-lg border-2 border-dashed border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-sm flex items-center justify-center mb-6 text-gray-200">
            <Users size={40} />
          </div>
          <h3 className="text-xl font-bold text-text-main mb-2">
            No Farmers Found
          </h3>
          <p className="text-text-muted max-w-xs font-medium">
            Try adjusting your search or contact the admin for new assignments.
          </p>
        </div>
      )}
    </div>
  );
};
