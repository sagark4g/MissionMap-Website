import { Question } from "../data/library";
import { getRandomSampleAnswer } from "../data/sampleAnswers";
import { RadioGroup } from "./quiz/RadioGroup";
import { MultiSelectChips } from "./quiz/MultiSelectChips";
import { Slider } from "./quiz/Slider";
import { NumberField } from "./quiz/NumberField";
import { TimeWindow } from "./quiz/TimeWindow";
import { ShortText } from "./quiz/ShortText";
import { LongText } from "./quiz/LongText";
import { Button } from "./ui/button";
import { Shuffle } from "lucide-react";

interface QuestionFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  packColor?: string;
  error?: string;
  packId?: string;
  subpackId?: string;
  showSampleButton?: boolean;
}

export function QuestionField({ question, value, onChange, packColor = "#6E59F0", error, packId, subpackId, showSampleButton = false }: QuestionFieldProps) {
  
  const handleSampleAnswer = () => {
    if (!packId || !subpackId) return;
    
    const sampleAnswer = getRandomSampleAnswer(packId, subpackId, question.id);
    if (sampleAnswer !== null) {
      onChange(sampleAnswer);
    }
  };
  
  // Ensure we have proper default values based on question type
  const getDefaultValue = () => {
    if (value !== undefined && value !== null) return value;
    
    switch (question.type) {
      case 'radio':
        return '';
      case 'multiselect':
        return [];
      case 'slider':
        return question.min || 0;
      case 'number':
        return '';
      case 'time_window':
        return { start: '', end: '' };
      case 'short_text':
      case 'long_text':
        return '';
      default:
        return '';
    }
  };
  
  const currentValue = getDefaultValue();
  
  const renderInput = () => {
    switch (question.type) {
      case 'radio':
        return (
          <RadioGroup
            label={question.label}
            help={question.help}
            options={question.options || []}
            value={currentValue}
            onChange={onChange}
            packColor={packColor}
            error={error}
            questionId={question.id}
          />
        );
        
      case 'multiselect':
        return (
          <MultiSelectChips
            label={question.label}
            help={question.help}
            options={question.options || []}
            value={currentValue}
            onChange={onChange}
            packColor={packColor}
            error={error}
            questionId={question.id}
          />
        );
        
      case 'slider':
        return (
          <Slider
            label={question.label}
            help={question.help}
            min={question.min || 0}
            max={question.max || 10}
            value={currentValue}
            onChange={onChange}
            packColor={packColor}
            error={error}
            questionId={question.id}
          />
        );
        
      case 'number':
        return (
          <NumberField
            label={question.label}
            help={question.help}
            value={currentValue}
            onChange={onChange}
            packColor={packColor}
            error={error}
            questionId={question.id}
          />
        );
        
      case 'time_window':
        return (
          <TimeWindow
            label={question.label}
            help={question.help}
            value={currentValue}
            onChange={onChange}
            packColor={packColor}
            error={error}
            questionId={question.id}
          />
        );
        
      case 'short_text':
        return (
          <ShortText
            label={question.label}
            help={question.help}
            value={currentValue}
            onChange={onChange}
            packColor={packColor}
            error={error}
            questionId={question.id}
          />
        );
        
      case 'long_text':
        return (
          <LongText
            label={question.label}
            help={question.help}
            value={currentValue}
            onChange={onChange}
            packColor={packColor}
            error={error}
            questionId={question.id}
          />
        );
        
      default:
        return <div>Unknown question type: {question.type}</div>;
    }
  };

  return (
    <div className="space-y-4">
      {renderInput()}
      {showSampleButton && packId && subpackId && (
        <Button
          onClick={handleSampleAnswer}
          variant="outline"
          size="sm"
          className="text-xs opacity-60 hover:opacity-100"
        >
          <Shuffle className="w-3 h-3 mr-1" />
          Sample Answer
        </Button>
      )}
    </div>
  );
}