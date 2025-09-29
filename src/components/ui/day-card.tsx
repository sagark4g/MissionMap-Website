import * as React from "react";
import { cn } from "./utils";
import { Checkbox } from "./checkbox";

interface DayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "today" | "completed";
  day: {
    name: string;
    date: string;
    tasks: boolean[];
    mood?: string;
    note?: string;
  };
  onDayClick?: () => void;
  packColor?: string;
}

const DayCard = React.forwardRef<HTMLDivElement, DayCardProps>(
  ({ className, variant = "default", day, onDayClick, packColor, ...props }, ref) => {
    const completedTasks = day.tasks.filter(Boolean).length;
    const isToday = variant === "today";
    const isCompleted = variant === "completed";

    const baseClasses = "p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md bg-white";
    
    const variantClasses = {
      default: "border-[#E2E8F0] hover:border-[#C7D2FE]",
      today: "border-2 shadow-md",
      completed: "border-[#10B981] bg-gradient-to-br from-green-50 to-white"
    };

    const borderStyle = isToday && packColor ? {
      borderColor: packColor,
      boxShadow: `0 0 0 1px ${packColor}20`
    } : {};

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        style={borderStyle}
        onClick={onDayClick}
        {...props}
      >
        <div className="text-center mb-3">
          <div className="text-[14px] leading-[20px] font-medium text-[#0F172A]">
            {day.name}
          </div>
          <div className="text-[12px] leading-[16px] text-[#475569]">
            {day.date}
          </div>
          {isToday && packColor && (
            <div 
              className="text-[10px] leading-[12px] text-white px-2 py-1 rounded-full mt-1 font-medium inline-block"
              style={{ backgroundColor: packColor }}
            >
              TODAY
            </div>
          )}
        </div>
        
        <div className="space-y-2 mb-3">
          {day.tasks.map((completed, taskIndex) => (
            <div key={taskIndex} className="flex items-center gap-2">
              <div 
                className={`w-3 h-3 rounded border-2 ${
                  completed ? 'bg-current border-current' : 'border-gray-300'
                }`}
                style={{ color: completed && packColor ? packColor : undefined }}
              ></div>
              <div className="w-full h-1 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] leading-[16px] text-[#475569]">
            {completedTasks}/{day.tasks.length} done
          </span>
          <span className="text-lg">{day.mood}</span>
        </div>
        
        <button 
          className="w-full text-[12px] leading-[16px] text-[#475569] hover:text-[#0F172A] transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Handle add note
          }}
        >
          {day.note ? "View note" : "+ Add note"}
        </button>
      </div>
    );
  }
);
DayCard.displayName = "DayCard";

export { DayCard, type DayCardProps };