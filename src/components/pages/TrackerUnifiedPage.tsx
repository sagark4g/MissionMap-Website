import { useState } from 'react';
import { Plus, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { Page, AppState } from '../../src/types';

interface TrackerUnifiedPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

// Task component for unified tracker
interface TaskCardProps {
  task: any;
  onLog: (taskId: string, amount: number) => void;
  onCheck: (taskId: string) => void;
}

function TaskCard({ task, onLog, onCheck }: TaskCardProps) {
  const progressPercent = Math.min(100, Math.round((task.progress / task.target) * 100));
  const isComplete = progressPercent >= 100;

  return (
    <div 
      className="mm-task border border-[var(--stroke-subtle)] rounded-lg p-4 hover:bg-[var(--surface-soft)] transition-colors"
      data-task-id={task.id}
      data-pack-id={task.packId}
      data-subpack-id={task.subpackId}
      data-time-of-day={task.timeOfDay}
      data-due-slot={task.dueSlot}
      data-unit={task.unit}
      data-target={task.target}
      data-days={task.days}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-3 h-3 rounded-full pack-dot ${task.packId}`} style={{
            backgroundColor: task.packId === 'fitness' ? 'var(--accent-fitness)' :
                           task.packId === 'work' ? 'var(--accent-work)' :
                           task.packId === 'money' ? 'var(--accent-money)' :
                           task.packId === 'relationships' ? 'var(--accent-relationships)' :
                           task.packId === 'purpose' ? 'var(--accent-purpose)' :
                           'var(--accent-learning)'
          }} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-[var(--text-default)] truncate">{task.title}</div>
            <div className="text-[var(--text-small)] text-[var(--text-muted)] flex items-center gap-2 mt-1">
              <span>{task.dueSlot}</span>
              <span>•</span>
              <div className="flex gap-1">
                {task.days.split('').map((day: string, i: number) => {
                  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                  const isActive = day === dayLabels[i];
                  const isToday = i === new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
                  return (
                    <span 
                      key={i} 
                      className={`w-5 h-5 text-xs rounded-full flex items-center justify-center ${
                        isActive && isToday 
                          ? 'bg-[var(--brand-primary)] text-white' 
                          : isActive 
                          ? 'bg-[var(--surface-soft)] text-[var(--text-default)]' 
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {dayLabels[i]}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="progress-chip">
            {task.progress}/{task.target} {task.unit}
          </Badge>
          
          {!isComplete && task.unit === 'min' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="mm-log" 
              data-id={task.id}
              onClick={() => onLog(task.id, 5)}
            >
              +5
            </Button>
          )}
          
          {!isComplete && task.unit !== 'min' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="mm-log" 
              data-id={task.id}
              onClick={() => onLog(task.id, 1)}
            >
              +1
            </Button>
          )}
          
          <Button 
            size="sm" 
            className="mm-check" 
            data-id={task.id}
            disabled={isComplete}
            onClick={() => onCheck(task.id)}
          >
            {isComplete ? 'Done' : 'Mark'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function TrackerUnifiedPage({ onNavigate, appState, updateAppState }: TrackerUnifiedPageProps) {
  const [currentView, setCurrentView] = useState<'today' | 'week'>('today');
  const [sortBy, setSortBy] = useState<'time' | 'progress' | 'subpack'>('time');
  const [selectedPack, setSelectedPack] = useState<string>('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string[]>([]);

  // Get current date
  const today = new Date();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const todayLabel = `${weekdays[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]}`;

  // Handle task logging
  const handleLog = (taskId: string, amount: number) => {
    console.log(`Logging ${amount} for task ${taskId}`);
    // This will be handled by the stub script
  };

  // Handle task check
  const handleCheck = (taskId: string) => {
    console.log(`Checking task ${taskId}`);
    // This will be handled by the stub script
  };

  // Toggle time filter
  const toggleTimeFilter = (time: string) => {
    setSelectedTimeFilter(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  return (
    <div className="min-h-screen bg-[var(--surface-soft)]" id="mm-tracker">
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[var(--text-h2)] font-bold text-[var(--text-default)]">Today</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-[var(--text-small)]">
              {todayLabel}
            </Badge>
            <div className="flex bg-[var(--surface-base)] rounded-lg p-1 border border-[var(--stroke-subtle)]">
              <button
                onClick={() => setCurrentView('today')}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  currentView === 'today'
                    ? 'bg-[var(--brand-primary)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-default)]'
                }`}
                data-view="today"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentView('week')}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  currentView === 'week'
                    ? 'bg-[var(--brand-primary)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-default)]'
                }`}
                data-view="week"
              >
                Week view
              </button>
            </div>
          </div>
        </div>

        {/* Week Summary Card */}
        <Card className="shadow-card mb-6" id="mm-week-summary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-[var(--text-default)] mb-2">
                  Week <span className="mm-week-number">2</span>: Summary
                </h2>
                <p className="text-[var(--text-small)] text-[var(--text-muted)] mm-helper">
                  Review opens on Sunday or after 7 days.
                </p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--text-default)]">78%</div>
                  <div className="text-[var(--text-small)] text-[var(--text-muted)]">Met</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--text-default)]">15</div>
                  <div className="text-[var(--text-small)] text-[var(--text-muted)]">Tasks done</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-[var(--text-small)] text-[var(--text-muted)]">Best streak</div>
                </div>
                <Button 
                  id="mm-start-review"
                  onClick={() => onNavigate('review')}
                  disabled={false}
                >
                  Review week
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Bar (Sticky) */}
        <div className="sticky top-0 bg-[var(--surface-soft)] z-10 pb-4" id="mm-tracker-filter">
          <div className="flex flex-wrap items-center gap-4 p-4 bg-[var(--surface-base)] rounded-lg border border-[var(--stroke-subtle)]">
            
            {/* Pack Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-small)] font-medium">Show:</span>
              <Select value={selectedPack} onValueChange={setSelectedPack}>
                <SelectTrigger className="w-40" id="mm-pack-filter">
                  <SelectValue placeholder="All packs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All packs</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="money">Money</SelectItem>
                  <SelectItem value="relationships">Relationships</SelectItem>
                  <SelectItem value="purpose">Purpose</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-small)] font-medium">Sort by:</span>
              <div className="flex bg-[var(--surface-soft)] rounded-lg p-1">
                {['time', 'progress', 'subpack'].map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort as any)}
                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                      sortBy === sort ? 'bg-[var(--surface-base)] text-[var(--text-default)] shadow-sm is-active' : 'text-[var(--text-muted)] hover:text-[var(--text-default)]'
                    }`}
                    data-sort={sort}
                  >
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time of Day Pills */}
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-small)] font-medium">Time:</span>
              <div className="flex gap-2">
                {['Morning', 'Afternoon', 'Evening', 'Anytime'].map((time) => (
                  <button
                    key={time}
                    onClick={() => toggleTimeFilter(time.toLowerCase())}
                    className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${
                      selectedTimeFilter.includes(time.toLowerCase())
                        ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                        : 'border-[var(--stroke-subtle)] text-[var(--text-muted)] hover:text-[var(--text-default)]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Task List (Today View) */}
        {currentView === 'today' && (
          <div className="space-y-3" id="mm-task-list">
            {/* Tasks will be rendered by the stub script */}
          </div>
        )}

        {/* Week View (Grid) */}
        {currentView === 'week' && (
          <div id="mm-week-grid">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="text-center text-[var(--text-muted)] py-12">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Week view grid will show your 7-day progress here</p>
                  <p className="text-[var(--text-small)] mt-2">Switch to Today view to see your tasks</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State for Today View */}
        <div className="hidden" id="mm-empty-state">
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--surface-soft)] rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-[var(--text-muted)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-default)] mb-2">No tasks for today</h3>
              <p className="text-[var(--text-muted)] mb-6">Add one from your packs to get started.</p>
              <Button onClick={() => onNavigate('packs')}>
                Browse Packs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Floating Add Button */}
        <button 
          className="fixed bottom-6 right-6 w-14 h-14 bg-[var(--brand-primary)] text-white rounded-full shadow-lg hover:bg-[var(--brand-primary-deep)] transition-colors flex items-center justify-center z-20"
          onClick={() => onNavigate('packs')}
          title="Add task from pack"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Sticky Footer CTA */}
        <div 
          id="mm-review-footer-cta" 
          className="fixed bottom-0 left-0 right-0 bg-[var(--surface-base)] border-t border-[var(--stroke-subtle)] p-4 shadow-lg z-30 hidden"
          style={{ display: 'none' }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--text-default)]">You're ready to review this week</p>
              <p className="text-[var(--text-small)] text-[var(--text-muted)]">Reflect on your progress and plan next week</p>
            </div>
            <Button 
              id="mm-start-review-footer"
              onClick={() => onNavigate('review')}
            >
              Review now →
            </Button>
          </div>
        </div>

      </main>
    </div>
  );
}