import * as React from "react";
import { cn } from "./utils";

interface ProgressStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number;
  currentStep: number;
  packColor?: string;
  variant?: "dots" | "bar" | "segments";
}

const ProgressSteps = React.forwardRef<HTMLDivElement, ProgressStepsProps>(
  ({ className, steps, currentStep, packColor = "#6366F1", variant = "segments", ...props }, ref) => {
    if (variant === "dots") {
      return (
        <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
          {Array.from({ length: steps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i < currentStep ? "opacity-100" : "bg-[#E2E8F0] opacity-50"
              }`}
              style={{
                backgroundColor: i < currentStep ? packColor : undefined
              }}
            />
          ))}
        </div>
      );
    }

    if (variant === "bar") {
      const percentage = (currentStep / steps) * 100;
      return (
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          <div className="w-full bg-[#E2E8F0] rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${percentage}%`,
                backgroundColor: packColor
              }}
            />
          </div>
          <div className="flex justify-between text-[13px] leading-[18px] text-[#475569]">
            <span>Step {currentStep} of {steps}</span>
            <span 
              className="px-2 py-1 rounded-full text-white text-[11px] font-medium"
              style={{ backgroundColor: packColor }}
            >
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      );
    }

    // Default segments variant
    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
              i < currentStep ? "opacity-100" : "bg-[#E2E8F0] opacity-50"
            }`}
            style={{
              backgroundColor: i < currentStep ? packColor : undefined
            }}
          />
        ))}
      </div>
    );
  }
);
ProgressSteps.displayName = "ProgressSteps";

export { ProgressSteps, type ProgressStepsProps };