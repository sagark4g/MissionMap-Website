interface NumberFieldProps {
  label: string;
  help?: string;
  value: number | string | null | undefined;
  onChange: (value: number | string) => void;
  packColor?: string;
  error?: string;
  questionId?: string;
}

export function NumberField({ label, help, value, onChange, packColor = "#6E59F0", error, questionId }: NumberFieldProps) {
  // Ensure we always have a valid value for the controlled input
  const currentValue = value ?? '';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(numValue);
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
      
      <input
        type="number"
        data-qid={questionId}
        value={currentValue}
        onChange={handleChange}
        className="w-full px-4 py-3 text-[var(--text-body)] border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors"
        style={{
          borderColor: '#E5E7EB',
          '--focus-border-color': packColor
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