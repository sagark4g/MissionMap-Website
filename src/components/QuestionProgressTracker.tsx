import { Check } from "lucide-react";

interface QuestionProgressTrackerProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  packColor: string;
  className?: string;
}

export function QuestionProgressTracker({ 
  currentQuestionIndex, 
  totalQuestions, 
  packColor,
  className = "" 
}: QuestionProgressTrackerProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <span className="text-[var(--text-small)] text-[var(--text-muted)] font-medium">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <div 
          className="px-3 py-1 rounded-full text-white text-[var(--text-label)] font-bold"
          style={{ backgroundColor: packColor }}
        >
          {Math.round(progress)}%
        </div>
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ 
              width: `${progress}%`,
              backgroundColor: packColor
            }}
          >
            {/* Subtle shine effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>
      </div>
      
      {/* Question Dots Indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isCompleted = index < currentQuestionIndex;
          const isCurrent = index === currentQuestionIndex;
          
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isCompleted || isCurrent ? 'scale-110' : 'scale-100'
              }`}
              style={{
                backgroundColor: isCompleted 
                  ? packColor 
                  : isCurrent 
                    ? `${packColor}80` // 50% opacity
                    : '#E5E7EB'
              }}
            />
          );
        })}
      </div>
      
      {/* Milestone Indicator */}
      {currentQuestionIndex >= Math.floor(totalQuestions / 2) && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: packColor }}
          >
            <Check className="w-3 h-3 text-white" />
          </div>
          <span 
            className="text-[var(--text-small)] font-medium"
            style={{ color: packColor }}
          >
            Halfway there!
          </span>
        </div>
      )}
    </div>
  );
}