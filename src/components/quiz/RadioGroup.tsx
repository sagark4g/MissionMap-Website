interface RadioGroupProps {
  label: string;
  help?: string;
  options: string[];
  value: string | null | undefined;
  onChange: (value: string) => void;
  packColor?: string;
  error?: string;
  questionId?: string;
}

export function RadioGroup({ label, help, options, value, onChange, packColor = "#6E59F0", error, questionId }: RadioGroupProps) {
  // Ensure we always have a valid value
  const currentValue = value ?? '';
  
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
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
            style={{
              borderColor: currentValue === option ? packColor : '#E5E7EB',
              backgroundColor: currentValue === option ? `${packColor}10` : 'transparent'
            }}
          >
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name={questionId ? `question-${questionId}` : label}
                data-qid={questionId}
                value={option}
                checked={currentValue === option}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div 
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                style={{
                  borderColor: currentValue === option ? packColor : '#9CA3AF',
                  backgroundColor: currentValue === option ? packColor : 'transparent'
                }}
              >
                {currentValue === option && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
            <span className="text-[var(--text-body)] text-[var(--text-default)] flex-1">
              {option}
            </span>
          </label>
        ))}
      </div>
      
      {error && (
        <p className="text-[var(--text-small)] text-red-600">{error}</p>
      )}
    </div>
  );
}