interface SliderProps {
  label: string;
  help?: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  packColor?: string;
  error?: string;
  questionId?: string;
}

export function Slider({ label, help, min, max, value, onChange, packColor = "#6E59F0", error, questionId }: SliderProps) {
  // Ensure we always have a valid number value
  const currentValue = value;
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-2">
          {label}
        </h3>
        {help && (
          <p className="text-[var(--text-small)] text-[var(--text-muted)]">
            {help}
          </p>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <span 
            className="inline-block px-4 py-2 rounded-full text-white font-bold text-[var(--text-h3)]"
            style={{ backgroundColor: packColor }}
          >
            {currentValue}
          </span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            data-qid={questionId}
            min={min}
            max={max}
            value={currentValue}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${packColor} 0%, ${packColor} ${((currentValue - min) / (max - min)) * 100}%, #E5E7EB ${((currentValue - min) / (max - min)) * 100}%, #E5E7EB 100%)`
            }}
          />
        </div>
        
        <div className="flex justify-between text-[var(--text-small)] text-[var(--text-muted)]">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
      
      {error && (
        <p className="text-[var(--text-small)] text-red-600">{error}</p>
      )}
    </div>
  );
}