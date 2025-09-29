interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  color?: string; // Pack-specific color
}

export function ProgressBar({ value, className = "", color = "var(--brand-primary)" }: ProgressBarProps) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="h-2 rounded-full transition-all duration-300 ease-out"
        style={{ 
          width: `${Math.min(100, Math.max(0, value))}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
}