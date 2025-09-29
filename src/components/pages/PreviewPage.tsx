import { ArrowLeft, ArrowRight, CheckCircle, Clock, Target, Shield, Calendar, Zap } from "lucide-react";
import { Button } from "../ui/button";
import type { Page, AppState } from "../../src/types";
import { useEffect } from 'react';

interface PreviewPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  onStartTracker?: () => void;
}

type PreviewData = {
  title: string;
  mission: string;
  thisWeek: string[];
  hook?: string;
  purpose?: string;
  insights?: { finding: string; why: string; action: string }[];
  missionMap?: { week: number; focus: string; actions: string[] }[];
  weekly_plan?: { week: number; focus: string; actions: string[] }[]; // New field
  rhythm?: { schedule?: string[]; rules?: string[]; non_negotiables?: string[] };
  daily_rhythm?: { schedule?: string[]; rules?: string[]; non_negotiables?: string[] }; // New field
  constraints?: string[];
  safety?: string[];
  constraints_safety?: string[]; // New field
  quickWins?: { day7?: string; day30?: string };
  quick_wins?: { day7?: string; day30?: string }; // New field
}

export function PreviewPage({ onNavigate, appState, updateAppState, onStartTracker }: PreviewPageProps) {
  const { previewJSON, selectedPackId, selectedSubpackId, loading } = appState;

  // Safe data coercion with fallbacks
  const data = (previewJSON || {}) as PreviewData;
  const title = data.title || "Your Personalized Plan Preview";
  const mission = data.mission || "";
  const thisWeek = Array.isArray(data.thisWeek) ? data.thisWeek : [];

  // Set up global MM object for script access and trigger enhanced rendering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize global MM object
      (window as any).MM = (window as any).MM || {};
      (window as any).MM.preview = previewJSON;
      (window as any).MM.selectedPack = selectedPackId;
      (window as any).MM.selectedSubpack = selectedSubpackId;
      
      // Trigger enhanced rendering if script is available
      if (typeof (window as any).renderPreview === 'function') {
        (window as any).renderPreview();
      }
    }
  }, [previewJSON, selectedPackId, selectedSubpackId]);
  
  // Guard: if no preview data, show fallback
  if (!previewJSON) {
    return (
      <div className="min-h-screen bg-[var(--surface-soft)]" data-page="preview">
        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-[var(--surface-base)] rounded-xl p-6 text-center" style={{ 
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h2 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-4">
              No preview available
            </h2>
            <p className="text-[var(--text-body)] text-[var(--text-muted)] mb-6">
              Please complete the quiz to generate your personalized plan.
            </p>
            <Button
              onClick={() => onNavigate('quiz')}
              className="btn-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz
            </Button>
          </div>
        </main>
      </div>
    );
  }

  function startTracker() {
    if (onStartTracker) {
      onStartTracker();
    } else {
      // Build weekJSON exactly as before - keep existing CTA working
      const items = thisWeek || [];
      updateAppState({ 
        weekJSON: { weekNumber: 1, items }
      });
      onNavigate("tracker", { selectedPackId, selectedSubpackId });
    }
  }

  return (
    <div className="min-h-screen bg-[var(--surface-soft)]" data-page="preview">
      <main id="preview-root" className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Hero Card - Always Visible */}
        <div className="bg-[var(--surface-base)] rounded-xl mb-6 p-6" style={{ 
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div className="text-center mb-6">
            <h1 id="preview-title" className="text-[var(--text-h2)] font-bold text-[var(--text-default)] mb-2">
              {title}
            </h1>
            
            {/* Purpose text under H1 */}
            <div id="preview-purpose" className="text-[var(--text-small)] text-[var(--text-muted)] mb-4">
            </div>

            <p id="preview-mission" className="text-[var(--text-body)] text-[var(--text-muted)] max-w-3xl mx-auto">
              {mission || "Your personalized mission will be displayed here based on your quiz answers."}
            </p>
          </div>

          {/* Action Buttons - Primary CTA + Back to quiz */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button
              id="btn-start-tracker"
              onClick={startTracker}
              disabled={!previewJSON}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Start Weekly Tracker
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <button
              id="btn-back-to-quiz"
              onClick={() => onNavigate('quiz')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to quiz
            </button>
          </div>
          
          {/* Trust Note */}
          <p className="text-[var(--text-small)] text-[var(--text-muted)] text-center" style={{ marginTop: '12px' }}>
            You can change your plan anytime.
          </p>
        </div>

        {/* Enhanced Insights Section */}
        <div className="bg-[var(--surface-base)] shadow-card rounded-xl p-6 mb-6">
          <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
            What we noticed
          </h3>
          <div id="preview-insights" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Enhanced insights will be populated by renderPreview script */}
          </div>
        </div>

        {/* Enhanced Mission Map Section */}
        <div className="bg-[var(--surface-base)] shadow-card rounded-xl p-6 mb-6">
          <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
            Your Mission Map (30 days)
          </h3>
          <div id="preview-map-weeks" className="space-y-6">
            {/* Enhanced mission map will be populated by renderPreview script */}
          </div>
        </div>

        {/* Enhanced Schedule Section */}
        <div className="bg-[var(--surface-base)] shadow-card rounded-xl p-6 mb-6">
          <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
            Schedule
          </h3>
          <div id="preview-schedule" className="flex flex-wrap gap-3">
            {/* Enhanced schedule chips will be populated by renderPreview script */}
          </div>
        </div>

        {/* Enhanced Rules Section */}
        <div className="bg-[var(--surface-base)] shadow-card rounded-xl p-6 mb-6">
          <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
            Rules & Guidelines
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-[var(--text-body)] font-semibold text-[var(--text-default)] mb-3">Daily Rules</h4>
              <ul id="preview-rules-daily" className="space-y-3">
                {/* Enhanced daily rules will be populated by renderPreview script */}
              </ul>
            </div>
            <div>
              <h4 className="text-[var(--text-body)] font-semibold text-[var(--text-default)] mb-3">Weekly Rules</h4>
              <ul id="preview-rules-weekly" className="space-y-3">
                {/* Enhanced weekly rules will be populated by renderPreview script */}
              </ul>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <h4 className="text-[var(--text-body)] font-semibold text-red-800 mb-3">
              Non-negotiables
            </h4>
            <ul id="preview-rules-nonneg" className="space-y-3">
              {/* Enhanced non-negotiables will be populated by renderPreview script */}
            </ul>
          </div>
        </div>

        {/* Enhanced Constraints & Safety Section */}
        <div className="bg-[var(--surface-base)] shadow-card rounded-xl p-6 mb-6">
          <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
            Constraints & Safety
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[var(--text-body)] font-semibold text-[var(--text-default)] mb-3">Constraints</h4>
              <ul id="preview-constraints" className="space-y-3">
                {/* Enhanced constraints will be populated by renderPreview script */}
              </ul>
            </div>
            <div>
              <h4 className="text-[var(--text-body)] font-semibold text-[var(--text-default)] mb-3">Safety</h4>
              <ul id="preview-safety" className="space-y-3">
                {/* Enhanced safety guidelines will be populated by renderPreview script */}
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Wins Section */}
        <div className="bg-[var(--surface-base)] shadow-card rounded-xl p-6 mb-6">
          <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
            Quick Wins
          </h3>
          <div id="preview-quickwins">
            {/* Enhanced quick wins will be populated by renderPreview script */}
          </div>
        </div>

        {/* Section 1: Optional "Your Hook" */}
        {(data.hook || data.quickWins?.day7) && (
          <div className="bg-[var(--surface-base)] rounded-xl p-6 mb-6" style={{ 
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-4 text-center">
              Your Hook
            </h3>
            <p id="preview-hook" className="text-[var(--text-body)] text-[var(--brand-primary)] text-center font-medium">
              {data.hook || data.quickWins?.day7}
            </p>
          </div>
        )}

        {/* Section 2: Always "This Week You Will" */}
        {thisWeek.length > 0 && (
          <div className="bg-[var(--surface-base)] rounded-xl p-6 mb-6" style={{ 
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-4">
              This Week You Will
            </h3>
            <ol id="preview-thisweek-list" className="space-y-3">
              {thisWeek.map((item: string, index: number) => (
                <li key={index} className="text-[var(--text-body)] text-[var(--text-default)] flex items-start gap-3">
                  <div className="w-6 h-6 bg-[var(--brand-primary)] text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Section 3: Optional "What We Noticed" */}
        {data.insights && Array.isArray(data.insights) && data.insights.length > 0 && (
          <div className="bg-[var(--surface-base)] rounded-xl p-6 mb-6" style={{ 
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)'
          }} data-mm-section="insights">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)]">
                What We Noticed
              </h3>
              <span className="inline-flex items-center px-2 py-1 text-xs text-[var(--brand-primary)] bg-blue-50 rounded-full border border-blue-200">
                From your answers
              </span>
            </div>
            
            <div id="preview-insights" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.insights.map((insight, index: number) => {
                // Simple icon mapping based on common topics
                const getInsightIcon = (finding: string) => {
                  const lower = finding.toLowerCase();
                  if (lower.includes('money') || lower.includes('budget') || lower.includes('finance')) return '💧';
                  if (lower.includes('diet') || lower.includes('food') || lower.includes('eat')) return '🍪';
                  if (lower.includes('time') || lower.includes('work') || lower.includes('schedule')) return '⏱️';
                  return '💡'; // default
                };
                
                return (
                  <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="text-[var(--text-body)] font-bold text-[var(--text-default)] mb-2 flex items-center gap-2">
                      <span className="text-lg">{getInsightIcon(insight.finding)}</span>
                      {insight.finding}
                    </div>
                    <div className="text-[var(--text-small)] text-[var(--text-muted)] mb-3">
                      <span className="font-medium">Why it matters:</span> {insight.why}
                    </div>
                    <div className="text-[var(--text-small)] text-[var(--brand-primary)] font-medium bg-white px-3 py-2 rounded-md">
                      <span className="font-semibold">What we'll change:</span> {insight.action}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 4: Optional "Your Mission Map (30 days)" */}
        {(data.missionMap || data.weekly_plan) && Array.isArray(data.missionMap || data.weekly_plan) && (data.missionMap || data.weekly_plan)!.length > 0 && (
          <div className="bg-[var(--surface-base)] rounded-xl p-6 mb-6" style={{ 
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
              Your Mission Map (30 days)
            </h3>
            
            {/* Week Tabs */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[1, 2, 3, 4].map((weekNum) => (
                  <button
                    key={weekNum}
                    onClick={() => {
                      // Toggle visibility of week cards
                      const weekCards = document.querySelectorAll(`[data-week="${weekNum}"]`);
                      const allCards = document.querySelectorAll('[data-week]');
                      
                      // Hide all weeks
                      allCards.forEach(card => {
                        (card as HTMLElement).style.display = 'none';
                      });
                      
                      // Show selected week
                      weekCards.forEach(card => {
                        (card as HTMLElement).style.display = 'block';
                      });
                      
                      // Update tab active state
                      document.querySelectorAll('[data-week-tab]').forEach(tab => {
                        tab.classList.remove('bg-white', 'text-[var(--brand-primary)]');
                        tab.classList.add('text-gray-600');
                      });
                      
                      const activeTab = document.querySelector(`[data-week-tab="${weekNum}"]`);
                      if (activeTab) {
                        activeTab.classList.add('bg-white', 'text-[var(--brand-primary)]');
                        activeTab.classList.remove('text-gray-600');
                      }
                    }}
                    data-week-tab={weekNum}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      weekNum === 1 
                        ? 'bg-white text-[var(--brand-primary)] shadow-sm' 
                        : 'text-gray-600 hover:text-[var(--brand-primary)]'
                    }`}
                  >
                    Week {weekNum}
                  </button>
                ))}
              </div>
            </div>
            
            <div id="preview-map-weeks" className="space-y-4">
              {(data.missionMap || data.weekly_plan)!.map((week, index: number) => (
                <div 
                  key={index} 
                  data-week={week.week}
                  className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
                  style={{ display: week.week === 1 ? 'block' : 'none' }}
                >
                  <div className="text-[var(--text-body)] font-bold text-[var(--text-default)] mb-4">
                    Week {week.week}: {week.focus}
                  </div>
                  
                  {week.actions && Array.isArray(week.actions) && (
                    <ul className="space-y-3">
                      {week.actions.map((action: string, actionIndex: number) => (
                        <li key={actionIndex} className="text-[var(--text-small)] text-[var(--text-default)] flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{action}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Optional "Daily Rhythm & Guardrails" */}
        {(data.rhythm || data.daily_rhythm) && ((data.rhythm || data.daily_rhythm)!.schedule || (data.rhythm || data.daily_rhythm)!.rules || (data.rhythm || data.daily_rhythm)!.non_negotiables) && (
          <div className="bg-[var(--surface-base)] rounded-xl p-6 mb-6" style={{ 
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
              Daily Rhythm & Guardrails
            </h3>
            
            {/* Schedule as badges */}
            {(data.rhythm?.schedule || data.daily_rhythm?.schedule) && Array.isArray(data.rhythm?.schedule || data.daily_rhythm?.schedule) && (
              <div className="mb-6">
                <h4 className="text-[var(--text-body)] font-semibold text-[var(--text-default)] mb-3">Schedule</h4>
                <div className="flex flex-wrap gap-2">
                  {(data.rhythm?.schedule || data.daily_rhythm?.schedule)!.map((time: string, index: number) => (
                    <span key={index} className="inline-flex items-center px-4 py-2 text-[var(--text-small)] bg-[var(--brand-primary)] text-white rounded-full font-medium shadow-sm">
                      <Clock className="w-3 h-3 mr-1.5" />
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rules with check bullets */}
            {(data.rhythm?.rules || data.daily_rhythm?.rules) && Array.isArray(data.rhythm?.rules || data.daily_rhythm?.rules) && (
              <div className="mb-6">
                <h4 className="text-[var(--text-body)] font-semibold text-[var(--text-default)] mb-3">Rules</h4>
                <ul className="space-y-3">
                  {(data.rhythm?.rules || data.daily_rhythm?.rules)!.map((rule: string, index: number) => (
                    <li key={index} className="text-[var(--text-small)] text-[var(--text-default)] flex items-start gap-3">
                      <span className="text-green-500 text-base mt-0.5 flex-shrink-0">✅</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Non-negotiables with check bullets */}
            {(data.rhythm?.non_negotiables || data.daily_rhythm?.non_negotiables) && Array.isArray(data.rhythm?.non_negotiables || data.daily_rhythm?.non_negotiables) && (
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="text-[var(--text-body)] font-semibold text-red-800 mb-3">
                  Non-negotiables (keep even on busy days)
                </h4>
                <ul className="space-y-3">
                  {(data.rhythm?.non_negotiables || data.daily_rhythm?.non_negotiables)!.map((item: string, index: number) => (
                    <li key={index} className="text-[var(--text-small)] text-red-700 flex items-start gap-3">
                      <span className="text-red-500 text-base mt-0.5 flex-shrink-0">✅</span>
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Section 6: Optional "Constraints & Safety" */}
        {(data.constraints || data.safety || data.constraints_safety) && (
          <div className="bg-[var(--surface-base)] rounded-xl p-6 mb-6" style={{ 
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
              Constraints & Safety
            </h3>
            
            {/* Combined constraints_safety or separate constraints/safety */}
            {data.constraints_safety && Array.isArray(data.constraints_safety) ? (
              <ul className="space-y-2">
                {data.constraints_safety.map((item: string, index: number) => (
                  <li key={index} className="text-[var(--text-small)] text-[var(--text-muted)] flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-yellow-600 mt-0.5 flex-shrink-0">⚠️</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Constraints */}
                {data.constraints && Array.isArray(data.constraints) && (
                  <div>
                    <h4 className="text-[var(--text-body)] font-semibold text-[var(--text-default)] mb-3">Constraints</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.constraints.map((constraint: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 text-[var(--text-small)] bg-orange-100 text-orange-800 rounded-full border border-orange-200">
                          {constraint}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safety */}
                {data.safety && Array.isArray(data.safety) && (
                  <div>
                    <h4 className="text-[var(--text-body)] font-semibold text-[var(--text-default)] mb-3">Safety</h4>
                    <ul className="space-y-2">
                      {data.safety.map((guideline: string, index: number) => (
                        <li key={index} className="text-[var(--text-small)] text-[var(--text-default)] flex items-start gap-2">
                          <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {guideline}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Section 7: Optional "Quick wins" */}
        {(data.quickWins || data.quick_wins) && ((data.quickWins || data.quick_wins)!.day7 || (data.quickWins || data.quick_wins)!.day30) && (
          <div className="bg-[var(--surface-base)] rounded-xl p-6 mb-6" style={{ 
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6 text-center">
              Quick Wins
            </h3>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {(data.quickWins?.day7 || data.quick_wins?.day7) && (
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full border border-green-200">
                  <span className="font-semibold mr-2">Day 7:</span>
                  <span className="text-[var(--text-small)]">{data.quickWins?.day7 || data.quick_wins?.day7}</span>
                </div>
              )}
              
              {(data.quickWins?.day30 || data.quick_wins?.day30) && (
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full border border-purple-200">
                  <span className="font-semibold mr-2">Day 30:</span>
                  <span className="text-[var(--text-small)]">{data.quickWins?.day30 || data.quick_wins?.day30}</span>
                </div>
              )}
            </div>
          </div>
        )}



      </main>
    </div>
  );
}