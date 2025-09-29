import { LIBRARY } from "../../data/library";
import { getSubpackSampleAnswers } from "../../data/sampleAnswers";
import { QuestionField } from "../QuestionField";
import { QuestionProgressTracker } from "../QuestionProgressTracker";
import { ErrorToast } from "../ErrorToast";
import { DebugLibrary } from "../DebugLibrary";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState, useMemo } from "react";
import type { Page, AppState } from "../../src/types";
import { toast } from "sonner@2.0.3";
import { generatePreview } from "../../src/lib/api";

interface QuizPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

// Pack colors for styling
const packColors: Record<string, string> = {
  fitness: 'var(--accent-fitness)',
  work: 'var(--accent-work)',
  money: 'var(--accent-money)',
  relationships: 'var(--accent-relationships)',
  purpose: 'var(--accent-purpose)',
  learning: 'var(--accent-learning)'
};

export function QuizPage({ onNavigate, appState, updateAppState }: QuizPageProps) {
  const { selectedPackId, selectedSubpackId, packId, subpackId, answers, currentQuestionIndex, loading } = appState;
  const [error, setError] = useState<string | null>(null);
  
  // Component mount effect for navigation guard
  useEffect(() => {
    console.log('[QuizPage] Component mounted, using API preview generation');
  }, []);
  
  // Use new variables as primary, fall back to legacy for compatibility
  const currentPackId = packId || selectedPackId;
  const currentSubpackId = subpackId || selectedSubpackId;
  
  // Ensure answers is always an object
  const safeAnswers = answers || {};
  
  // Find current pack and subpack (memoized to prevent re-calculations)
  const { pack, subpack, questions } = useMemo(() => {
    const foundPack = LIBRARY.packs.find(p => p.id === currentPackId);
    const foundSubpack = foundPack?.subpacks.find(s => s.id === currentSubpackId);
    const foundQuestions = foundSubpack?.questions || [];
    
    return {
      pack: foundPack,
      subpack: foundSubpack,
      questions: foundQuestions
    };
  }, [currentPackId, currentSubpackId]);
  
  // Guard for direct access - less aggressive to prevent loops
  useEffect(() => {
    // Use a timeout to prevent immediate redirects that could cause loops
    const timeoutId = setTimeout(() => {
      if ((!currentPackId || !currentSubpackId || !subpack || questions.length === 0)) {
        console.log('[QuizPage] Missing required data, redirecting to packs');
        console.log('[QuizPage] Data:', { currentPackId, currentSubpackId, hasSubpack: !!subpack, questionsLength: questions.length });
        onNavigate('packs');
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [currentPackId, currentSubpackId, subpack, questions.length, onNavigate]);

  // Generate preview using the deployed API
  async function submitAnswers(packId: string, subpackId: string, answers: Record<string, any>) {
    // Validate required parameters
    if (!packId || !subpackId || typeof answers !== 'object') {
      toast.error("Missing required data. Please ensure pack and subpack are selected.");
      return;
    }

    updateAppState({ loading: true, errorText: "" });
    
    try {
      console.log('[QuizPage] Calling API to generate preview for:', { packId, subpackId, answers });
      
      // Call the deployed API
      const previewData = await generatePreview(packId, subpackId, answers);
      
      console.log("[QuizPage] API response:", previewData);
      
      // Save preview data into state and navigate to the Preview page
      updateAppState({ 
        previewJSON: previewData,
        loading: false,
        errorText: ""
      });
      onNavigate("preview");
      toast.success("Preview generated successfully!");
      
    } catch (error: any) {
      console.error("[QuizPage] API call error:", error);
      
      updateAppState({ 
        loading: false,
        errorText: error.message || "Unknown error occurred"
      });
      
      toast.error(error.message || "Unable to generate preview. Please try again.");
    }
  }
  
  // Simple stub preview for debugging
  const handleDebugStub = async () => {
    if (!isCurrentStepValid()) return;
    
    console.log('[QuizPage] Using debug stub preview');
    
    const debugPreviewData = {
      title: `Debug ${pack?.label} Plan`,
      mission: "This is a debug preview with sample data for testing.",
      hook: "Debug mode: Testing the preview generation flow.",
      thisWeek: [
        "Debug Action 1: Test the preview display",
        "Debug Action 2: Verify the navigation works",
        "Debug Action 3: Check the data structure",
        "Debug Action 4: Confirm the styling is correct"
      ]
    };
    
    updateAppState({ 
      previewJSON: debugPreviewData,
      loading: false,
      errorText: ""
    });
    onNavigate("preview");
    toast.info("Using debug stub data");
  };



  if (!subpack || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--surface-soft)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-4">
            Quiz not found
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Selected Pack: {selectedPackId} | Selected Subpack: {selectedSubpackId}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Pack found: {pack ? 'Yes' : 'No'} | Subpack found: {subpack ? 'Yes' : 'No'} | Questions: {questions.length}
          </p>
          <DebugLibrary />
          <Button onClick={() => onNavigate('subpacks')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subpacks
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastStep = currentQuestionIndex === questions.length - 1;
  const progress = (currentQuestionIndex + 1) / questions.length;

  // Determine pack color (use the current pack ID with fallback)
  const packColor = packColors[currentPackId] || packColors[selectedPackId] || 'var(--brand-primary)';

  // Validation: Check if current question is answered
  const isCurrentStepValid = () => {
    if (!currentQuestion.required) return true;
    
    const answer = safeAnswers[currentQuestion.id];
    
    if (currentQuestion.type === 'multiselect') {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    if (currentQuestion.type === 'time_window') {
      return answer && answer.start && answer.end;
    }
    
    if (currentQuestion.type === 'number') {
      return answer !== null && answer !== undefined && answer !== '';
    }
    
    return answer && answer.toString().trim() !== '';
  };

  const handleAnswerChange = (value: any) => {
    updateAppState({
      answers: {
        ...safeAnswers,
        [currentQuestion.id]: value
      }
    });
  };

  const handleNext = async () => {
    if (!isCurrentStepValid()) return;
    
    if (isLastStep) {
      await submitAnswers(currentPackId, currentSubpackId, safeAnswers);
    } else {
      updateAppState({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  };



  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      onNavigate('subpacks');
    } else {
      updateAppState({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  };

  const handleAutoFillAll = () => {
    if (!selectedPackId || !selectedSubpackId) return;
    
    const sampleAnswers = getSubpackSampleAnswers(selectedPackId, selectedSubpackId);
    updateAppState({
      answers: {
        ...safeAnswers,
        ...sampleAnswers
      }
    });
  };

  return (
    <div className="min-h-screen bg-[var(--surface-soft)]" data-page="quiz">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={handleBack}
              id="quiz-back"
              variant="ghost" 
              className="text-[var(--text-muted)] hover:text-[var(--text-default)]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentQuestionIndex === 0 ? 'Back to Selection' : 'Back'}
            </Button>
            
            <Button
              onClick={handleAutoFillAll}
              variant="outline"
              size="sm"
              className="text-xs opacity-60 hover:opacity-100"
            >
              <Zap className="w-3 h-3 mr-1" />
              Auto-fill All
            </Button>
          </div>
          
          <h1 className="text-[var(--text-h2)] font-bold text-[var(--text-default)] mb-2">
            <span id="quiz-pack-label">{pack?.label}</span>
            <span className="text-[var(--text-muted)] mx-2">•</span>
            <span id="quiz-subpack-label">{subpack.label}</span>
          </h1>
          <p className="text-[var(--text-small)] text-[var(--text-muted)]">
            Question <span id="quiz-qnum">{currentQuestionIndex + 1}</span> of <span id="quiz-qtotal">{questions.length}</span>
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div id="quiz-progress" className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              id="quiz-progress-bar"
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: packColor,
                width: `${progress * 100}%`
              }}
            ></div>
          </div>
        </div>

        {/* Error Toast */}
        <ErrorToast error={error} onDismiss={() => setError(null)} />

        {/* Question Card */}
        <div id="quiz-form" className="bg-white rounded-xl shadow-card p-8 mb-8">
          <div className="mb-6">
            <h2 id="quiz-question-label" className="text-[var(--text-h3)] font-medium text-[var(--text-default)] mb-4">
              {currentQuestion.label}
            </h2>
            {currentQuestion.help && (
              <p id="quiz-question-help" className="text-[var(--text-small)] text-[var(--text-muted)]">
                {currentQuestion.help}
              </p>
            )}
          </div>
          
          <div id="quiz-answer-area">
            <QuestionField
              question={currentQuestion}
              value={safeAnswers[currentQuestion.id] ?? null}
              onChange={handleAnswerChange}
              packColor={packColor}
              packId={selectedPackId}
              subpackId={selectedSubpackId}
              showSampleButton={true}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            id="quiz-back"
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentQuestionIndex === 0 ? 'Back to Selection' : 'Back'}
          </Button>
          
          <div className="flex gap-2">
            {/* Debug stub checkbox */}
            <div className="flex items-center gap-2 mr-4">
              <input 
                type="checkbox" 
                id="debug-stub" 
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label htmlFor="debug-stub" className="text-xs text-gray-600">
                Use demo data
              </label>
            </div>
            
            {isLastStep && (
              <>
                <Button
                  onClick={() => {
                    console.log('[QuizPage] Manual debug info:');
                    console.log('Pack ID:', currentPackId);
                    console.log('Subpack ID:', currentSubpackId);
                    console.log('Answers:', safeAnswers);
                    console.log('Current URL:', window.location.href);
                    toast.info("Debug info logged to console");
                  }}
                  variant="outline"
                  className="px-4 text-xs"
                  title="Log debug information to console"
                >
                  Debug Info
                </Button>
                
                <Button
                  onClick={handleDebugStub}
                  disabled={!isCurrentStepValid()}
                  variant="outline"
                  className="px-4 text-xs"
                  title="Generate preview with debug stub data"
                >
                  Debug Stub
                </Button>
              </>
            )}
            
            {!isLastStep && (
              <Button
                id="quiz-next"
                onClick={handleNext}
                disabled={!isCurrentStepValid() || loading}
                className="px-6 text-white fixed bottom-8 right-8 z-50 shadow-lg"
                style={{ backgroundColor: isCurrentStepValid() ? packColor : '#CBD5E1' }}
              >
                {loading ? 'Generating...' : 'Next'}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            )}
            
            {isLastStep && (
              <Button
                id="quiz-submit"
                onClick={handleNext}
                disabled={!isCurrentStepValid() || loading}
                className="px-6 text-white"
                style={{ backgroundColor: isCurrentStepValid() ? packColor : '#CBD5E1' }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Preview
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}