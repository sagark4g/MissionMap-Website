import { useState } from 'react';
import { ArrowLeft, CheckCircle, TrendingUp, Target, Calendar, Brain, Award, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import type { Page, AppState } from '../../src/types';

interface WeeklyReviewUnifiedPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

// Mock data for the review
const mockWeeklyData = {
  weekNumber: 2,
  overallPercent: 78,
  totalTasks: 21,
  completedTasks: 15,
  bestStreak: 4,
  consistentDays: 2,
  packs: [
    { id: 'fitness', name: 'Fitness', progress: 85, color: 'var(--accent-fitness)' },
    { id: 'work', name: 'Work', progress: 72, color: 'var(--accent-work)' },
    { id: 'money', name: 'Money', progress: 60, color: 'var(--accent-money)' }
  ]
};

export function WeeklyReviewUnifiedPage({ onNavigate, appState, updateAppState }: WeeklyReviewUnifiedPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [reflectionData, setReflectionData] = useState({
    biggestWin: '',
    challenges: '',
    energy: 'okay' as 'low' | 'okay' | 'high',
    timeBlocks: [] as string[],
    outDays: [] as string[],
    specialNotes: ''
  });

  const [nextWeekPlan, setNextWeekPlan] = useState([
    {
      id: 't1',
      title: 'Walk 20 min',
      subpack: 'Fitness Starter',
      defaultDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      dueWindow: '07:00–08:00',
      target: '20 min',
      packColor: 'var(--accent-fitness)'
    },
    {
      id: 't2',
      title: 'Deep work 90 min',
      subpack: 'Work Builder',
      defaultDays: ['M', 'T', 'W', 'T', 'F'],
      dueWindow: '09:00–10:30',
      target: '90 min',
      packColor: 'var(--accent-work)'
    },
    {
      id: 't3',
      title: 'Log spend (₹)',
      subpack: 'Money Tracker',
      defaultDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      dueWindow: 'Anytime',
      target: '1 entry',
      packColor: 'var(--accent-money)'
    }
  ]);

  const updateReflectionData = (field: string, value: any) => {
    setReflectionData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: 'timeBlocks' | 'outDays', value: string) => {
    setReflectionData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSaveAndStart = () => {
    console.log('Saving weekly review and starting new week');
    // Navigate back to tracker
    onNavigate('tracker');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center gap-4 mb-8" id="mm-review-steps">
      {[1, 2, 3].map((step) => (
        <button
          key={step}
          onClick={() => setCurrentStep(step)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentStep === step 
              ? 'bg-[var(--brand-primary)] text-white' 
              : currentStep > step
              ? 'bg-green-500 text-white'
              : 'bg-[var(--surface-base)] text-[var(--text-muted)] hover:bg-[var(--surface-soft)]'
          }`}
        >
          {step === 1 ? '1 Summary' : step === 2 ? '2 Reflection' : '3 Plan next week'}
        </button>
      ))}
    </div>
  );

  const renderSummaryStep = () => (
    <div className="space-y-6">
      {/* Hero Card */}
      <Card className="shadow-card bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-8 text-center">
          <h2 className="text-[var(--text-h2)] font-bold text-[var(--text-default)] mb-2">
            Week {mockWeeklyData.weekNumber} Summary
          </h2>
          <p className="text-[var(--text-muted)] mb-6">Combined across all your active packs</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-[var(--brand-primary)]">
                {mockWeeklyData.overallPercent}%
              </div>
              <div className="text-[var(--text-small)] text-[var(--text-muted)]">Met</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--text-default)]">
                {mockWeeklyData.completedTasks}
              </div>
              <div className="text-[var(--text-small)] text-[var(--text-muted)]">Total tasks done</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {mockWeeklyData.bestStreak}
              </div>
              <div className="text-[var(--text-small)] text-[var(--text-muted)]">Best streak</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {mockWeeklyData.consistentDays}
              </div>
              <div className="text-[var(--text-small)] text-[var(--text-muted)]">Consistent days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* By Pack Mini Cards */}
      <div>
        <h3 className="font-semibold text-[var(--text-default)] mb-4">By pack</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockWeeklyData.packs.map((pack) => (
            <Card key={pack.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: pack.color }}
                    />
                    <span className="font-medium text-[var(--text-default)]">{pack.name}</span>
                  </div>
                  <Badge variant="secondary">{pack.progress}%</Badge>
                </div>
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="var(--stroke-subtle)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke={pack.color}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${(pack.progress / 100) * 175.92} 175.92`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium">{pack.progress}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setCurrentStep(2)}>
          Next → Reflection
        </Button>
      </div>
    </div>
  );

  const renderReflectionStep = () => (
    <div className="space-y-6" id="mm-reflection-form">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Weekly Reflection</CardTitle>
          <p className="text-[var(--text-muted)]">Tell us about your proudest moment and what made it challenging</p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Biggest Win */}
          <div>
            <Label className="block text-[var(--text-body)] font-medium mb-3">
              Biggest win? ✨
            </Label>
            <Textarea
              value={reflectionData.biggestWin}
              onChange={(e) => updateReflectionData('biggestWin', e.target.value)}
              placeholder="Tell us about your proudest moment this week..."
              className="min-h-[100px]"
            />
          </div>

          {/* What Made It Hard */}
          <div>
            <Label className="block text-[var(--text-body)] font-medium mb-3">
              What made it hard? 🤔
            </Label>
            <Textarea
              value={reflectionData.challenges}
              onChange={(e) => updateReflectionData('challenges', e.target.value)}
              placeholder="Examples: late nights, travel, festivals, work pressure..."
              className="min-h-[100px]"
            />
          </div>

          {/* Energy Level */}
          <div>
            <Label className="block text-[var(--text-body)] font-medium mb-3">
              Energy level this week ⚡
            </Label>
            <RadioGroup 
              value={reflectionData.energy} 
              onValueChange={(value) => updateReflectionData('energy', value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="energy-low" />
                <Label htmlFor="energy-low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="okay" id="energy-okay" />
                <Label htmlFor="energy-okay">Okay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="energy-high" />
                <Label htmlFor="energy-high">High</Label>
              </div>
            </RadioGroup>
          </div>

        </CardContent>
      </Card>

      {/* Constraints for Next Week */}
      <Card className="shadow-card" id="mm-nextweek-constraints">
        <CardHeader>
          <CardTitle>Constraints for next week</CardTitle>
          <p className="text-[var(--text-muted)]">Help us plan around your schedule</p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Days you're out? 📅 */}
          <div>
            <Label className="block text-[var(--text-body)] font-medium mb-3">
              Days you're out? 📅
            </Label>
            <div className="flex gap-2" id="mm-nw-outdays">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <button
                  key={day}
                  onClick={() => toggleArrayValue('outDays', day)}
                  className={`w-10 h-10 text-sm font-medium rounded-full border transition-colors ${
                    reflectionData.outDays.includes(day)
                      ? 'bg-red-500 text-white border-red-500'
                      : 'border-[var(--stroke-subtle)] text-[var(--text-muted)] hover:text-[var(--text-default)]'
                  }`}
                >
                  {day.charAt(0)}
                </button>
              ))}
            </div>
          </div>

          {/* Time Blocks */}
          <div id="mm-nw-blocks">
            <Label className="block text-[var(--text-body)] font-medium mb-3">
              Time blocks to avoid 🚫
            </Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Early morning', 'Lunch', 'Evening', 'Late night'].map((time) => (
                <button
                  key={time}
                  onClick={() => toggleArrayValue('timeBlocks', time)}
                  className={`px-3 py-2 text-sm font-medium rounded-full border transition-colors ${
                    reflectionData.timeBlocks.includes(time)
                      ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                      : 'border-[var(--stroke-subtle)] text-[var(--text-muted)] hover:text-[var(--text-default)]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <Input 
              placeholder="Specific time window (optional): 7:30–9:00 pm"
              className="text-sm"
            />
          </div>

          {/* Special Notes */}
          <div id="mm-nw-notes">
            <Label className="block text-[var(--text-body)] font-medium mb-3">
              Anything else we should know? 📝
            </Label>
            <Textarea
              value={reflectionData.specialNotes}
              onChange={(e) => updateReflectionData('specialNotes', e.target.value)}
              placeholder="Examples: late nights, travel, festivals, exams, family visiting..."
              className="min-h-[80px]"
            />
          </div>

        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep(3)}>
          Next → Plan
        </Button>
      </div>
    </div>
  );

  const renderPlanStep = () => (
    <div className="space-y-6">
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--brand-primary)]" />
            Week {mockWeeklyData.weekNumber + 1}: Your plan
          </CardTitle>
          <p className="text-[var(--text-muted)]">Personalized based on your reflection and constraints</p>
        </CardHeader>
        <CardContent>
          
          {/* AI Rationale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-[var(--text-default)] mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Why these picks?
                </h4>
                <ul className="text-[var(--text-small)] text-[var(--text-muted)] space-y-1">
                  <li>• Your {reflectionData.energy} energy suggests keeping current intensity</li>
                  <li>• Avoiding {reflectionData.timeBlocks.join(', ') || 'no specific'} time blocks</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-[var(--text-default)] mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Tips for the week
                </h4>
                <ul className="text-[var(--text-small)] text-[var(--text-muted)] space-y-1">
                  <li>• Keep small and daily. Missed a day? Start today.</li>
                  <li>• Plan backup options for constrained days</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Editable Plan List */}
          <div className="space-y-4" id="mm-nextweek-plan">
            <h4 className="font-semibold text-[var(--text-default)]">Your tasks</h4>
            
            {nextWeekPlan.map((task) => (
              <Card key={task.id} className="border border-[var(--stroke-subtle)]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: task.packColor }}
                      />
                      <div>
                        <div className="font-medium text-[var(--text-default)]">{task.title}</div>
                        <div className="text-[var(--text-small)] text-[var(--text-muted)]">{task.subpack}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Days */}
                    <div>
                      <Label className="text-[var(--text-small)] font-medium mb-2 block">Days</Label>
                      <div className="flex gap-1">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                          const isActive = task.defaultDays.includes(day);
                          const isBlocked = reflectionData.outDays.includes(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]);
                          return (
                            <div
                              key={i}
                              className={`w-8 h-8 text-xs font-medium rounded-full flex items-center justify-center ${
                                isBlocked
                                  ? 'bg-red-100 text-red-400 cursor-not-allowed'
                                  : isActive
                                  ? 'bg-green-500 text-white'
                                  : 'bg-[var(--surface-soft)] text-[var(--text-muted)]'
                              }`}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Time */}
                    <div>
                      <Label className="text-[var(--text-small)] font-medium mb-2 block">Time</Label>
                      <Badge variant="outline">{task.dueWindow}</Badge>
                    </div>
                    
                    {/* Target */}
                    <div>
                      <Label className="text-[var(--text-small)] font-medium mb-2 block">Target</Label>
                      <Badge variant="secondary">{task.target}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* Bottom Bar */}
      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => setCurrentStep(2)}>
          Back to Reflection
        </Button>
        <Button 
          onClick={handleSaveAndStart}
          className="flex items-center gap-2"
          id="mm-save-nextweek"
        >
          <CheckCircle className="w-4 h-4" />
          Save & start week
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--surface-soft)]" id="mm-review">
      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => onNavigate('tracker')}
            className="p-2 hover:bg-[var(--surface-base)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[var(--text-h2)] font-bold text-[var(--text-default)]">
              Weekly Review
            </h1>
            <p className="text-[var(--text-muted)]">
              Reflect on your progress and plan the week ahead
            </p>
          </div>
        </div>

        {renderStepIndicator()}

        {currentStep === 1 && renderSummaryStep()}
        {currentStep === 2 && renderReflectionStep()}
        {currentStep === 3 && renderPlanStep()}

      </main>
    </div>
  );
}