import React from "react";
import { AlertCircle } from "lucide-react";

interface PlaceholderProps {
  title: string;
}

export const FarmerPlaceholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center p-20 text-center bg-surface border border-gray-200 rounded-3xl min-h-[400px]">
      <div className="w-20 h-20 bg-primary/10 rounded-sm flex items-center justify-center text-primary mb-6">
        <AlertCircle size={40} />
      </div>
      <h1 className="text-3xl font-bold text-text-main mb-2 tracking-tight uppercase leading-none">
        {title}
      </h1>
      <p className="text-text-muted max-w-sm leading-relaxed font-medium">
        This feature is currently under active development. Our agronomists and
        engineers are working to bring this to your farm soon!
      </p>
      <div className="mt-8 flex gap-3">
        <div className="w-2.5 h-2.5 rounded-sm bg-primary animate-bounce " />
        <div className="w-2.5 h-2.5 rounded-sm bg-primary animate-bounce delay-100 " />
        <div className="w-2.5 h-2.5 rounded-sm bg-primary animate-bounce delay-200 " />
      </div>
    </div>
  );
};
