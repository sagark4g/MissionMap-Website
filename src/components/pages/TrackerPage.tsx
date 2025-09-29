import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowLeft, Calendar, CheckCircle, Flame, Star, TrendingUp, Target, Award, Zap, X, MoreHorizontal, Plus, BarChart3 } from "lucide-react";
import type { Page, AppState } from "../../src/types";
import { useEffect, useState } from "react";

interface TrackerPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

export function TrackerPage({ onNavigate, appState, updateAppState }: TrackerPageProps) {
  const { weekJSON } = appState;
  const [selectedDay, setSelectedDay] = useState('mon');
  const [notes, setNotes] = useState('');

  // Load from local storage on page load
  useEffect(() => {
    const stored = localStorage.getItem("mm_week");
    if (stored && !weekJSON) {
      try {
        const parsedWeekJSON = JSON.parse(stored);
        updateAppState({ weekJSON: parsedWeekJSON });
      } catch (e) {
        console.error("Failed to parse stored week data:", e);
      }
    }
  }, [weekJSON, updateAppState]);

  // Save to local storage whenever weekJSON changes
  useEffect(() => {
    if (weekJSON) {
      localStorage.setItem("mm_week", JSON.stringify(weekJSON));
    }
  }, [weekJSON]);

  // Auto-save notes
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`mm_notes_${selectedDay}`, notes);
    }, 500);
    return () => clearTimeout(timer);
  }, [notes, selectedDay]);

  // Load notes for selected day
  useEffect(() => {
    const savedNotes = localStorage.getItem(`mm_notes_${selectedDay}`) || '';
    setNotes(savedNotes);
  }, [selectedDay]);

  if (!weekJSON) {
    return (
      <div className="min-h-screen bg-[var(--surface-soft)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-4">
            No tracker data found
          </h2>
          <p className="text-[var(--text-body)] text-[var(--text-muted)] mb-6">
            Go back to the preview to start your tracker.
          </p>
          <Button onClick={() => onNavigate('preview')}>
            Back to Preview
          </Button>
        </div>
      </div>
    );
  }

  const items = weekJSON.items || [];
  const progress = weekJSON.progress || {};
  
  // Calculate progress metrics
  const completedTasks = Object.values(progress).filter(Boolean).length;
  const totalTasks = items.length;
  const todayCompleted = 2;
  const todayTotal = Math.max(items.length, 3);
  const weekProgress = Math.round((completedTasks / Math.max(totalTasks, 1)) * 100);
  const currentStreak = 5;

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayValues = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayChips = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const today = new Date();
  const todayName = today.toLocaleDateString('en-IN', { weekday: 'long' });

  const handleItemToggle = (itemText: string, checked: boolean) => {
    const updatedWeekJSON = {
      ...weekJSON,
      progress: {
        ...weekJSON.progress,
        [itemText]: checked
      }
    };
    updateAppState({ weekJSON: updatedWeekJSON });
  };

  const markAllDoneToday = () => {
    const updatedProgress = { ...progress };
    items.forEach(item => {
      updatedProgress[item] = true;
    });
    const updatedWeekJSON = {
      ...weekJSON,
      progress: updatedProgress
    };
    updateAppState({ weekJSON: updatedWeekJSON });
  };

  // Habit Row Component with correct data attributes and classes
  const HabitRow = ({ habit, index, isLast = false }: { habit: string; index: number; isLast?: boolean }) => {
    const planned = 5; // Mock data
    const done = 3; // Mock data
    
    return (
      <div className="mm_HabitRow" data-mm="mm_HabitRow">
        <div className="flex items-center justify-between py-4">
          <div className="flex-1">
            <div className="habit-label text-[var(--text-body)] font-medium text-[var(--text-default)] mb-1" data-mm="habit_label">
              {habit}
            </div>
            <div className="text-[var(--text-small)] text-[var(--text-muted)]">
              Planned: {planned} days • Done: {done}
            </div>
          </div>
          
          <div className="flex gap-2">
            {dayChips.map((day, dayIndex) => (
              <button
                key={dayIndex}
                className={`weekday-chip w-7 h-7 rounded-lg border text-xs font-medium transition-colors ${
                  dayIndex < done 
                    ? 'active bg-[var(--success)] border-[var(--success)] text-white' 
                    : 'bg-white border-[var(--stroke-subtle)] text-[var(--text-muted)] hover:border-[var(--brand-primary)]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        {!isLast && <div className="border-b border-[var(--stroke-subtle)]"></div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--surface-soft)]" data-page="tracker">
      <main id="tracker-root" className="max-w-5xl mx-auto px-6 py-8">

        {/* Header Strip */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl px-6 py-4 shadow-card">
          <div className="text-[var(--text-body)] font-medium text-[var(--text-default)]">
            Week 1 • 3 of 4 habits done
          </div>
          
          <div id="mm_progress_ring" className="flex items-center justify-center w-14 h-14 rounded-full" style={{
            background: `conic-gradient(var(--success) ${weekProgress * 3.6}deg, var(--stroke-subtle) 0deg)`
          }}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-[var(--text-default)]">{weekProgress}%</span>
            </div>
          </div>
          
          <div id="mm_streak_chip" className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-2 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-[var(--text-small)] font-medium text-orange-700">
              Streak: {currentStreak} days
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today Panel */}
          <div id="mm_today_panel" className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6">
              Today • {todayName}
            </h2>
            
            {items.length > 0 ? (
              <div className="space-y-4 mb-6">
                {items.map((item: string, index: number) => {
                  const isCompleted = !!progress[item];
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-xl border border-[var(--stroke-subtle)] hover:border-[var(--brand-primary)] transition-colors">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={(checked) => handleItemToggle(item, !!checked)}
                        className="scale-110"
                      />
                      <span className={`flex-1 text-[var(--text-body)] ${
                        isCompleted ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-default)]'
                      }`}>
                        {item}
                      </span>
                      <button className="mm-more-btn p-2 hover:bg-[var(--surface-soft)] rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-[var(--text-muted)]" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div id="mm_empty_today" className="text-center py-8 mb-6">
                <div className="w-12 h-12 bg-[var(--surface-soft)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-[var(--text-muted)]" />
                </div>
                <div className="text-[var(--text-body)] text-[var(--text-muted)]">
                  Nothing for today. Rest or review your week.
                </div>
              </div>
            )}
            
            <Button 
              id="mm_mark_all_today"
              onClick={markAllDoneToday}
              className="w-full btn-primary"
              disabled={items.length === 0}
            >
              Mark all done for today
            </Button>
          </div>

          {/* This Week Panel */}
          <div id="mm_week_panel" className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-6">
              This week
            </h2>
            
            <div className="space-y-0">
              {items.length > 0 ? (
                items.map((item: string, index: number) => (
                  <HabitRow 
                    key={index} 
                    habit={item} 
                    index={index} 
                    isLast={index === items.length - 1}
                  />
                ))
              ) : (
                <>
                  <HabitRow habit="Your first habit will appear here" index={0} />
                  <HabitRow habit="Your second habit will appear here" index={1} />
                  <HabitRow habit="Your third habit will appear here" index={2} />
                  <HabitRow habit="Your fourth habit will appear here" index={3} isLast={true} />
                </>
              )}
            </div>
            
            {/* Buttons Strip */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--stroke-subtle)]">
              <button id="mm_add_habit_btn" className="btn-secondary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add habit
              </button>
            </div>
          </div>
        </div>

        {/* Floating Review Week Button */}
        <button 
          id="mm_open_review"
          onClick={() => onNavigate('review')}
          className="fixed bottom-6 right-6 z-50 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-deep)] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-colors font-medium"
        >
          <BarChart3 className="w-4 h-4" />
          Review week
        </button>

        {/* Backward Compatibility Elements - Hidden but keeping IDs */}
        <div className="hidden">
          <div id="tracker-week-title">Week 1 • 2–8 Oct</div>
          <div id="tracker-progress-bar">
            <div id="tracker-progress-fill"></div>
          </div>
          <div id="tracker-today-chip">Today: 0 / 3</div>
          <div id="tracker-day-tabs">
            {dayLabels.map((day, index) => (
              <button key={dayValues[index]} data-day={dayValues[index]}>
                {day}
              </button>
            ))}
          </div>
          <ul id="tracker-list">
            {items.map((item: string, index: number) => (
              <li key={index}>
                <Checkbox
                  checked={!!progress[item]}
                  onCheckedChange={(checked) => handleItemToggle(item, !!checked)}
                />
                <span>{item}</span>
                <button onClick={() => handleItemToggle(item, !progress[item])}>
                  {progress[item] ? 'Undo' : 'Mark done'}
                </button>
              </li>
            ))}
          </ul>
          <textarea
            id="tracker-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes for today (auto-save)"
          />
          <button id="tracker-week-grid-link">See all week</button>
          <button id="btn-review-week">Review week</button>
          <button id="btn-reset-week">Reset week</button>
          <button id="btn-done-today">Mark all done for today</button>
        </div>
      </main>
    </div>
  );
}