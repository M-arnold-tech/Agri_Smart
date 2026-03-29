import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center gap-2 text-xs cursor-pointer justify-center font-medium rounded-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-text-main hover:bg-[#6bb06e]",
    outline:
      "border border-primary text-primary bg-transparent hover:bg-primary-bg",
    ghost: "bg-transparent text-text-main hover:bg-surface-hover",
  };

  const sizes = {
    sm: "py-2.5 px-3 text-xs",
    md: "py-2.5 px-4 text-xs",
    lg: "py-2.5 px-6 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
