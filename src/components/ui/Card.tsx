import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
}) => {
  const baseStyles =
    "bg-surface rounded-md border border-gray-200 p-6 transition-all duration-200";
  const hoverStyles = hoverable
    ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-primary-light"
    : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
