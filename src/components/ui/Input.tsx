import React, { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    const wrapperStyles = `flex flex-col gap-2 w-full ${className}`;
    const labelStyles = "text-xs font-medium text-text-main uppercase tracking-wider opacity-70";
    const inputStyles = `px-3 py-3 bg-surface border rounded-md text-xs text-text-main transition-all outline-none placeholder:text-text-light ${
      error
        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
        : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
    }`;
    const errorMsgStyles = "text-[10px] font-bold text-red-500 uppercase tracking-tight -mt-1";

    return (
      <div className={wrapperStyles}>
        {label && <label className={labelStyles}>{label}</label>}
        <div className="relative group w-full">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
              {icon}
            </div>
          )}
          <input 
            ref={ref} 
            className={`w-full ${inputStyles} ${icon ? "pl-10" : ""}`} 
            {...props} 
          />
        </div>
        {error && <span className={errorMsgStyles}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

