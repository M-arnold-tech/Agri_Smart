import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  variant = "rectangular" 
}) => {
  const baseStyles = "animate-pulse bg-gray-200";
  
  const variantStyles = {
    text: "h-3 w-full rounded-sm",
    circular: "rounded-full",
    rectangular: "rounded-sm",
  };

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`} 
      aria-hidden="true"
    />
  );
};
