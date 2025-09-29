interface ShortTextProps {
  label: string;
  help?: string;
  value: string | null | undefined;
  onChange: (value: string) => void;
  packColor?: string;
  error?: string;
  questionId?: string;
}

export function ShortText({ label, help, value, onChange, packColor = "#6E59F0", error, questionId }: ShortTextProps) {
  // Ensure we always have a valid value for the controlled input
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
      
      <input
        type="text"
        data-qid={questionId}
        value={currentValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer..."
        className="w-full px-4 py-3 text-[var(--text-body)] border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors"
        style={{
          borderColor: '#E5E7EB'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = packColor;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#E5E7EB';
        }}
      />
      
      {error && (
        <p className="text-[var(--text-small)] text-red-600">{error}</p>
      )}
    </div>
  );
}