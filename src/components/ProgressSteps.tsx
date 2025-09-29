interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressSteps({ currentStep, totalSteps, className = "" }: ProgressStepsProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-label text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-label text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}