interface TimeWindowProps {
  label: string;
  help?: string;
  value: { start: string; end: string } | null | undefined;
  onChange: (value: { start: string; end: string }) => void;
  packColor?: string;
  error?: string;
  questionId?: string;
}

export function TimeWindow({ label, help, value, onChange, packColor = "#6E59F0", error, questionId }: TimeWindowProps) {
  // Ensure we always have a valid value object with string values
  const currentValue = {
    start: value?.start || '',
    end: value?.end || ''
  };
  
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...currentValue, start: e.target.value });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...currentValue, end: e.target.value });
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
      
      <div className="flex items-center gap-4">
        {/* Hidden input for form data capture */}
        {questionId && (
          <input
            type="hidden"
            data-qid={questionId}
            value={JSON.stringify(currentValue)}
            readOnly
          />
        )}
        
        <div className="flex-1">
          <label className="block text-[var(--text-label)] text-[var(--text-muted)] mb-2">
            Start Time
          </label>
          <input
            type="text"
            value={currentValue.start}
            onChange={handleStartChange}
            placeholder="e.g., 7:30 AM"
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
        </div>
        
        <div className="text-[var(--text-muted)] font-medium">to</div>
        
        <div className="flex-1">
          <label className="block text-[var(--text-label)] text-[var(--text-muted)] mb-2">
            End Time
          </label>
          <input
            type="text"
            value={currentValue.end}
            onChange={handleEndChange}
            placeholder="e.g., 9:00 PM"
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
        </div>
      </div>
      
      {error && (
        <p className="text-[var(--text-small)] text-red-600">{error}</p>
      )}
    </div>
  );
}