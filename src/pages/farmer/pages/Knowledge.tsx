import React from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { BookOpen, Download, Search, FileText } from "lucide-react";

export const FarmerKnowledge: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            Resource Library
          </h1>
          <p className="text-text-muted text-lg">
            Browse guides, manuals, and best practices available offline.
          </p>
        </div>
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-12 pr-4 py-3 bg-surface border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="flex flex-col gap-4 p-8 group" hoverable>
          <div className="w-14 h-14 rounded-xl bg-primary-bg flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
            <BookOpen size={28} className="text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text-main">
            Maize Cultivation Guide 2026
          </h3>
          <p className="text-xs text-text-muted leading-relaxed flex-1">
            Complete handbook for optimal maize yield in Northern Province.
            Includes soil prep and timing.
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-2">
            <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">
              PDF • 2.4 MB
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary-bg text-primary"
            >
              <Download size={20} />
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 p-8 group" hoverable>
          <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
            <FileText size={28} className="text-accent" />
          </div>
          <h3 className="text-xl font-bold text-text-main">
            Pest Management: Fall Armyworm
          </h3>
          <p className="text-xs text-text-muted leading-relaxed flex-1">
            Identification signs and organic treatments for common pests found
            in Rwanda.
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-2">
            <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">
              PDF • 1.1 MB
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary-bg text-primary"
            >
              <Download size={20} />
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 p-8 group" hoverable>
          <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
            <BookOpen size={28} className="text-secondary" />
          </div>
          <h3 className="text-xl font-bold text-text-main">
            Irrigation Best Practices
          </h3>
          <p className="text-xs text-text-muted leading-relaxed flex-1">
            Water conservation techniques and solar irrigation setup for dry
            seasons.
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-2">
            <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">
              PDF • 3.0 MB
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary-bg text-primary"
            >
              <Download size={20} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
