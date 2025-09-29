import * as React from "react";
import { cn } from "./utils";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "insight" | "constraint" | "success";
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  onToggle?: () => void;
  packColor?: string;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant = "default", size = "md", selected = false, onToggle, packColor, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer";
    
    const sizeClasses = {
      sm: "px-3 py-1 text-[12px] leading-[16px]",
      md: "px-4 py-2 text-[14px] leading-[20px]", 
      lg: "px-6 py-3 text-[16px] leading-[24px]"
    };

    const variantClasses = {
      default: selected 
        ? "text-white shadow-md transform scale-102" 
        : "bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-[#00000014] hover:shadow-sm",
      insight: "bg-gradient-to-r from-blue-50 to-transparent border border-blue-200 text-blue-800",
      constraint: "bg-gradient-to-r from-green-50 to-transparent border border-green-200 text-green-800", 
      success: "bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-200 text-emerald-800"
    };

    const dynamicStyle = selected && packColor ? {
      backgroundColor: packColor,
      borderColor: packColor
    } : {};

    return (
      <div
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        style={dynamicStyle}
        onClick={onToggle}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, type ChipProps };