import { ArrowLeft, CheckCircle, BarChart3, Plus, TrendingUp, Target, Clock, Award, Calendar, Brain, Lightbulb } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Page, AppState } from "../../src/types";
import { useState } from "react";

interface ReviewPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

// Mock progress data - in real app this would come from user's actual tracking
const mockWeeklyProgress = {
  weekNumber: 2,
  overallCompletion: 78,
  habits: [
    {
      name: "Walk 20 min",
      category: "fitness",
      completedDays: 5,
      targetDays: 7,
      streak: 3,
      trend: "up",
      insights: "Great consistency! Your longest streak this month."
    },
    {
      name: "Save ₹500",
      category: "money", 
      completedDays: 4,
      targetDays: 5,
      streak: 2,
      trend: "stable",
      insights: "Solid progress. Weekend spending stayed in check."
    },
    {
      name: "Read 10 pages",
      category: "learning",
      completedDays: 6,
      targetDays: 7,
      streak: 4,
      trend: "up",
      insights: "Fantastic! Reading before bed is becoming automatic."
    }
  ],
  weeklyStats: {
    totalActions: 21,
    completedActions: 15,
    longestStreak: 4,
    perfectDays: 2
  },
  insights: [
    {
      type: "win",
      title: "Momentum Building",
      description: "You've improved completion by 15% vs last week"
    },
    {
      type: "pattern",
      title: "Weekend Dip",
      description: "Saturdays are your toughest day - let's plan for this"
    },
    {
      type: "strength",
      title: "Morning Routine",
      description: "Your 7-9am habits have 90% success rate"
    }
  ]
};

const categoryColors = {
  fitness: "bg-accent-fitness",
  work: "bg-accent-work", 
  money: "bg-accent-money",
  relationships: "bg-accent-relationships",
  purpose: "bg-accent-purpose",
  learning: "bg-accent-learning"
};

export function ReviewPage({ onNavigate, appState, updateAppState }: ReviewPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    biggestWin: '',
    challenges: '',
    smallChange: '',
    energy: 'okay',
    motivation: 'good',
    timeManagement: 'okay',
    nextWeekFocus: [],
    constraints: '',
    // New constraint fields
    constraintDays: ['Sa'], // Default preview: Saturday
    constraintTimes: ['late night'], // Default preview: late night
    constraintWindow: '10:00–11:30 pm', // Default preview: busy window
    constraintTypes: ['heavy work'], // Default preview: heavy work
    constraintNote: 'Travel on Sat, two late nights.' // Default preview note
  });

  const handleSaveAndStartWeek = () => {
    // Save review data and navigate back to tracker
    console.log('Review completed:', formData);
    onNavigate('tracker');
  };

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="w-4 h-4 text-green-500" /> : <BarChart3 className="w-4 h-4 text-gray-400" />;
  };

  // Helper functions for constraints
  const toggleConstraintDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      constraintDays: prev.constraintDays.includes(day)
        ? prev.constraintDays.filter(d => d !== day)
        : [...prev.constraintDays, day]
    }));
  };

  const toggleConstraintTime = (time: string) => {
    setFormData(prev => ({
      ...prev,
      constraintTimes: prev.constraintTimes.includes(time)
        ? prev.constraintTimes.filter(t => t !== time)
        : [...prev.constraintTimes, time]
    }));
  };

  const toggleConstraintType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      constraintTypes: prev.constraintTypes.includes(type)
        ? prev.constraintTypes.filter(t => t !== type)
        : [...prev.constraintTypes, type]
    }));
  };

  // Apply constraint rules for step 3
  const getAdjustedHabits = () => {
    return mockWeeklyProgress.habits.map(habit => {
      let adjustedHabit = { ...habit };
      
      // Reduce days based on constraint types
      if (formData.constraintTypes.includes('travel') || 
          formData.constraintTypes.includes('festival') || 
          formData.constraintTypes.includes('family event')) {
        adjustedHabit.targetDays = Math.max(3, habit.targetDays - 2);
      } else if (formData.constraintTypes.includes('heavy work') || 
                 formData.constraintTypes.includes('exam')) {
        adjustedHabit.targetDays = Math.max(4, habit.targetDays - 1);
      }

      // Add busy day swaps
      if (formData.constraintTypes.length > 0) {
        if (habit.name.includes('Walk')) {
          adjustedHabit.busySwap = 'Walk 5 min indoors';
        } else if (habit.name.includes('Save')) {
          adjustedHabit.busySwap = 'Sip 2 glasses water';
        } else if (habit.name.includes('Read')) {
          adjustedHabit.busySwap = 'Screen off at 10:30 pm';
        }
      }

      return adjustedHabit;
    });
  };

  const getDayAbbreviation = (day: string) => {
    const mapping: Record<string, string> = {
      'M': 'Monday', 'T': 'Tuesday', 'W': 'Wednesday', 'Th': 'Thursday',
      'F': 'Friday', 'Sa': 'Saturday', 'Su': 'Sunday'
    };
    return mapping[day] || day;
  };
  
  return (
    <div className="min-h-screen bg-[var(--surface-soft)]" data-page="review">
      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('tracker')}
              className="p-2 hover:bg-[var(--surface-base)] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-[var(--text-h2)] font-bold text-[var(--text-default)]">
                Review Your Week
              </h1>
              <p className="text-[var(--text-small)] text-[var(--text-muted)]">
                Week {mockWeeklyProgress.weekNumber} • {mockWeeklyProgress.overallCompletion}% completed
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            {mockWeeklyProgress.weeklyStats.perfectDays} perfect days
          </Badge>
        </div>

        {/* Progress Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentStep(1)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              currentStep === 1 ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--surface-base)] text-[var(--text-muted)] hover:bg-[var(--surface-soft)]'
            }`}
          >
            1 Summary
          </button>
          <button
            onClick={() => setCurrentStep(2)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              currentStep === 2 ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--surface-base)] text-[var(--text-muted)] hover:bg-[var(--surface-soft)]'
            }`}
          >
            2 Reflection
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              currentStep === 3 ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--surface-base)] text-[var(--text-muted)] hover:bg-[var(--surface-soft)]'
            }`}
          >
            3 Plan next week
          </button>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div id="mm_review_step1" className="space-y-6">
            {/* Overall Progress Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[var(--brand-primary)]" />
                  Weekly Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--text-default)]">
                      {mockWeeklyProgress.overallCompletion}%
                    </div>
                    <div className="text-[var(--text-small)] text-[var(--text-muted)]">Overall</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--text-default)]">
                      {mockWeeklyProgress.weeklyStats.completedActions}/{mockWeeklyProgress.weeklyStats.totalActions}
                    </div>
                    <div className="text-[var(--text-small)] text-[var(--text-muted)]">Actions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--text-default)]">
                      {mockWeeklyProgress.weeklyStats.longestStreak}
                    </div>
                    <div className="text-[var(--text-small)] text-[var(--text-muted)]">Best Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--text-default)]">
                      {mockWeeklyProgress.weeklyStats.perfectDays}
                    </div>
                    <div className="text-[var(--text-small)] text-[var(--text-muted)]">Perfect Days</div>
                  </div>
                </div>
                
                <Progress value={mockWeeklyProgress.overallCompletion} className="mb-4" />
                <p className="text-[var(--text-small)] text-[var(--text-muted)] text-center">
                  You finished {mockWeeklyProgress.overallCompletion}% of your week. {mockWeeklyProgress.overallCompletion >= 75 ? 'Great work!' : 'Keep building momentum!'}
                </p>
              </CardContent>
            </Card>

            {/* Habit Breakdown */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Habit Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWeeklyProgress.habits.map((habit, index) => (
                    <div key={index} className="border border-[var(--stroke-subtle)] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${categoryColors[habit.category as keyof typeof categoryColors]}`} />
                          <span className="font-medium">{habit.name}</span>
                          {getTrendIcon(habit.trend)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--text-small)] text-[var(--text-muted)]">
                            {habit.completedDays}/{habit.targetDays} days
                          </span>
                          <Badge variant={habit.completedDays >= habit.targetDays * 0.8 ? "default" : "secondary"}>
                            {Math.round((habit.completedDays / habit.targetDays) * 100)}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={(habit.completedDays / habit.targetDays) * 100} className="mb-2" />
                      <p className="text-[var(--text-small)] text-[var(--text-muted)]">{habit.insights}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[var(--brand-primary)]" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockWeeklyProgress.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-[var(--surface-soft)] rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        insight.type === 'win' ? 'bg-green-500' : 
                        insight.type === 'pattern' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <div className="font-medium text-[var(--text-body)]">{insight.title}</div>
                        <div className="text-[var(--text-small)] text-[var(--text-muted)]">{insight.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 2 && (
          <div id="mm_review_step2" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Weekly Reflection</CardTitle>
                <p className="text-[var(--text-small)] text-[var(--text-muted)]">
                  Help us understand your experience to make next week even better
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-[var(--text-body)] font-medium mb-3">
                    What was your biggest win this week? ✨
                  </label>
                  <textarea
                    id="mm_reflect_win"
                    value={formData.biggestWin}
                    onChange={(e) => updateFormData('biggestWin', e.target.value)}
                    className="w-full p-4 border border-[var(--stroke-subtle)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                    rows={3}
                    placeholder="Completed my first 5-day streak, saved more than planned, felt energized every morning..."
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-body)] font-medium mb-3">
                    What made things difficult? 🤔
                  </label>
                  <textarea
                    id="mm_reflect_hard"
                    value={formData.challenges}
                    onChange={(e) => updateFormData('challenges', e.target.value)}
                    className="w-full p-4 border border-[var(--stroke-subtle)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                    rows={3}
                    placeholder="Late work meetings, weekend social plans, rainy weather, low motivation..."
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-body)] font-medium mb-3">
                    Any constraints or challenges coming up next week? 📅
                  </label>
                  <textarea
                    id="mm_reflect_constraints"
                    value={formData.constraints}
                    onChange={(e) => updateFormData('constraints', e.target.value)}
                    className="w-full p-4 border border-[var(--stroke-subtle)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                    rows={3}
                    placeholder="Travel, late work meetings, family events, exams, busy season, recovery time..."
                  />
                  <p className="text-[var(--text-small)] text-[var(--text-muted)] mt-2">
                    This helps us adjust your plan to be realistic for next week
                  </p>
                </div>

                <div>
                  <label className="block text-[var(--text-body)] font-medium mb-3">
                    One small change for next week 🔄
                  </label>
                  <input
                    type="text"
                    id="mm_reflect_change"
                    value={formData.smallChange}
                    onChange={(e) => updateFormData('smallChange', e.target.value)}
                    className="w-full p-4 border border-[var(--stroke-subtle)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                    placeholder="Set phone alarm for walk, prep healthy snacks Sunday, read during lunch break..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Next-week Constraints Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Any constraints next week?</CardTitle>
                <p className="text-[var(--text-small)] text-[var(--text-muted)]">
                  We will fit your plan around these.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* A. Days to skip */}
                <div data-mm="constraint_days_section">
                  <label className="block text-[var(--text-body)] font-medium mb-3">
                    Days you cannot do the plan
                  </label>
                  <div className="flex gap-2 mb-2">
                    {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleConstraintDay(day)}
                        className={`constraint-day w-10 h-10 rounded-full border-2 text-sm font-medium transition-colors ${
                          formData.constraintDays.includes(day)
                            ? 'bg-red-500 border-red-500 text-white is-selected'
                            : 'border-[var(--stroke-subtle)] text-[var(--text-muted)] hover:border-red-300'
                        }`}
                        data-day={day === 'Th' ? 'Th' : day === 'Sa' ? 'Sa' : day === 'Su' ? 'Su' : day}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  <p className="text-[var(--text-small)] text-[var(--text-muted)]">
                    Example: travel on Sat, event on Sun
                  </p>
                </div>

                {/* B. Time to avoid */}
                <div data-mm="constraint_times">
                  <label className="block text-[var(--text-body)] font-medium mb-3">
                    Time to avoid
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {['early morning', 'lunch', 'evening', 'late night'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleConstraintTime(time)}
                        className={`constraint-time px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          formData.constraintTimes.includes(time)
                            ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white'
                            : 'border-[var(--stroke-subtle)] text-[var(--text-muted)] hover:border-[var(--brand-primary)]'
                        }`}
                        data-time={time.replace(' ', '')}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Busy window (optional): 7:30–9:00 pm"
                    value={formData.constraintWindow}
                    onChange={(e) => updateFormData('constraintWindow', e.target.value)}
                    className="w-full p-3 border border-[var(--stroke-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent text-sm"
                    data-mm="constraint_window"
                  />
                </div>

                {/* C. Type of constraint */}
                <div data-mm="constraint_types">
                  <label className="block text-[var(--text-body)] font-medium mb-3">
                    What is it?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['travel', 'festival', 'family event', 'heavy work', 'exam', 'visitors', 'health rest'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleConstraintType(type)}
                        className={`constraint-type px-3 py-2 rounded-full border text-sm font-medium transition-colors ${
                          formData.constraintTypes.includes(type)
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'border-[var(--stroke-subtle)] text-[var(--text-muted)] hover:border-orange-300'
                        }`}
                        data-type={type.replace(' ', '')}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* D. Note (optional) */}
                <div>
                  <label className="block text-[var(--text-body)] font-medium mb-3">
                    Anything to keep in mind?
                  </label>
                  <input
                    type="text"
                    placeholder="Example: two late nights Thu–Fri, short on sleep."
                    value={formData.constraintNote}
                    onChange={(e) => updateFormData('constraintNote', e.target.value)}
                    className="w-full p-4 border border-[var(--stroke-subtle)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                    data-mm="constraint_note"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 3 && (
          <div id="mm_review_step3" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--brand-primary)]" />
                  Week {mockWeeklyProgress.weekNumber + 1}: Build on Success
                </CardTitle>
                <p className="text-[var(--text-small)] text-[var(--text-muted)]">
                  Based on your progress and reflection, here's your personalized plan
                </p>
              </CardHeader>
              <CardContent>
                {/* Plan Rows with Constraint-aware Day Chips */}
                <div className="space-y-4 mb-6">
                  {getAdjustedHabits().map((habit, index) => {
                    const dayMapping = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
                    return (
                      <div key={index} className="border border-[var(--stroke-subtle)] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${categoryColors[habit.category as keyof typeof categoryColors]}`} />
                            <span className="font-medium">{habit.name}</span>
                            {habit.completedDays >= habit.targetDays * 0.8 && (
                              <Badge variant="secondary" className="text-xs">Keep going!</Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {dayMapping.map((day, i) => {
                              const isDisabled = formData.constraintDays.includes(day);
                              const isEnabled = i < habit.targetDays && !isDisabled;
                              return (
                                <div
                                  key={i}
                                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium relative group ${
                                    isDisabled
                                      ? 'bg-gray-200 border-gray-300 text-gray-400 is-disabled cursor-not-allowed'
                                      : isEnabled
                                      ? 'bg-green-500 border-green-500 text-white'
                                      : 'border-[var(--stroke-subtle)] text-[var(--text-muted)]'
                                  }`}
                                  title={isDisabled ? `Skipped because of your constraint for ${getDayAbbreviation(day)}` : undefined}
                                >
                                  {day}
                                  {isDisabled && (
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      Skipped because of your plan for {day}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Time hints based on constraints */}
                        {(formData.constraintTimes.includes('late night') || 
                          formData.constraintTimes.includes('evening') ||
                          formData.constraintWindow) && (
                          <p className="text-[var(--text-small)] text-blue-600 mb-2">
                            💡 Try before dinner
                          </p>
                        )}
                        {formData.constraintTimes.includes('early morning') && (
                          <p className="text-[var(--text-small)] text-blue-600 mb-2">
                            💡 Pick lunch/evening
                          </p>
                        )}
                        
                        {/* Busy day swap */}
                        {(habit as any).busySwap && (
                          <p className="text-[var(--text-small)] text-[var(--text-muted)]" data-mm="plan_swap">
                            <strong>Busy day option:</strong> {(habit as any).busySwap}
                          </p>
                        )}
                        
                        {/* Health rest safety note */}
                        {formData.constraintTypes.includes('health rest') && (
                          <p className="text-[var(--text-small)] text-orange-600 mt-2">
                            ⚠️ Stop if painful
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Why these picks?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-[var(--text-small)] text-[var(--text-muted)]">
                      <div><strong>Signals we used:</strong></div>
                      <p>• You had great success with morning habits - we're keeping those</p>
                      <p>• Weekend dips are normal - we've added flexibility for Saturdays</p>
                      <p>• Your {formData.energy} energy levels suggest maintaining current intensity</p>
                      <p>• Building on your streak momentum from reading habit</p>
                      {formData.constraintNote && (
                        <p>• You said: "{formData.constraintNote}"</p>
                      )}
                      
                      {/* Constraints used section */}
                      {(formData.constraintDays.length > 0 || formData.constraintTimes.length > 0 || formData.constraintTypes.length > 0) && (
                        <div className="mt-3 pt-3 border-t border-[var(--stroke-subtle)]">
                          <div><strong>Constraints used:</strong></div>
                          {formData.constraintDays.length > 0 && (
                            <p data-mm="used_days">• Skipped {formData.constraintDays.join(', ')}</p>
                          )}
                          {formData.constraintTimes.length > 0 && (
                            <p data-mm="used_times">• Avoided {formData.constraintTimes.join(', ')}</p>
                          )}
                          {formData.constraintTypes.length > 0 && (
                            <p data-mm="used_types">• Type: {formData.constraintTypes.join(', ')}</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Tips for success
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-[var(--text-small)] text-[var(--text-muted)]">
                      <p>• Use your 7-9am power window - it's your strongest time</p>
                      <p>• Plan Saturday alternatives when motivation is lower</p>
                      <p>• Keep building on your reading momentum - it's working!</p>
                      {formData.smallChange && <p>• Remember: {formData.smallChange}</p>}
                      {formData.constraintTypes.length > 0 && (
                        <p>• Have backup 10-minute options ready for busy periods</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Success target with adjusted goals */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <p className="text-[var(--text-small)] text-blue-700" data-mm="success_text">
                      🎯 <strong>Win target:</strong> {
                        formData.constraintDays.length > 0 
                          ? `${getAdjustedHabits().reduce((sum, h) => sum + h.targetDays, 0)} check-ins (we skipped ${formData.constraintDays.join(', ')})`
                          : `${getAdjustedHabits().reduce((sum, h) => sum + h.targetDays, 0)} check-ins this week`
                      }
                    </p>
                  </CardContent>
                </Card>

                {/* Constraint acknowledgment cards */}
                {(formData.constraintDays.length > 0 || formData.constraintTypes.length > 0) && (
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="pt-6">
                      <p className="text-[var(--text-small)] text-orange-700">
                        ⚠️ <strong>Planning around constraints:</strong> We've noted your {formData.constraintTypes.join(', ')} schedule - 
                        your plan includes flexible options and shorter alternatives for these challenging periods.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {formData.biggestWin && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <p className="text-[var(--text-small)] text-green-700">
                        💪 <strong>Keep the momentum:</strong> You mentioned "{formData.biggestWin}" - 
                        let's build on this success pattern next week!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            variant="outline"
            disabled={currentStep === 1}
            className="min-w-24"
          >
            Back
          </Button>
          
          {currentStep < 3 ? (
            <Button 
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              className="min-w-24"
              id={currentStep === 2 ? "mm_continue_to_plan" : undefined}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSaveAndStartWeek}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Save & start week
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}