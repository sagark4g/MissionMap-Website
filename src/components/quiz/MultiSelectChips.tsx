interface MultiSelectChipsProps {
  label: string;
  help?: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  packColor?: string;
  error?: string;
  questionId?: string;
}

export function MultiSelectChips({ label, help, options, value, onChange, packColor = "#6E59F0", error, questionId }: MultiSelectChipsProps) {
  // Ensure we always have a valid array
  const currentValue = value ?? [];
  
  const handleToggle = (option: string) => {
    const newValue = currentValue.includes(option)
      ? currentValue.filter(v => v !== option)
      : [...currentValue, option];
    onChange(newValue);
  };

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
      
      <div className="flex flex-wrap gap-3">
        {/* Hidden input for form data capture */}
        {questionId && (
          <input
            type="hidden"
            data-qid={questionId}
            value={JSON.stringify(currentValue)}
            readOnly
          />
        )}
        
        {options.map((option, index) => {
          const isSelected = currentValue.includes(option);
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleToggle(option)}
              className="px-4 py-2 rounded-full text-[var(--text-body)] font-medium transition-all border-2"
              style={{
                borderColor: isSelected ? packColor : '#E5E7EB',
                backgroundColor: isSelected ? packColor : 'transparent',
                color: isSelected ? 'white' : '#374151'
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
      
      {error && (
        <p className="text-[var(--text-small)] text-red-600">{error}</p>
      )}
    </div>
  );
}