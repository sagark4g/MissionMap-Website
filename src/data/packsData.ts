export const packsData = {
  fitness: {
    id: 'fitness',
    title: 'Fitness & Health',
    color: '#10B981',
    icon: 'dumbbell',
    subpacks: [
      {
        id: 'fat-loss-sprint',
        title: 'Fat-Loss Sprint',
        description: 'Drop weight safely in 30 days.'
      },
      {
        id: 'strength-starter',
        title: 'Strength Starter', 
        description: 'Build basic strength with safe form.'
      },
      {
        id: 'walk-to-run-5k',
        title: 'Walk-to-Run 5K',
        description: 'Go from walking to a gentle 5K.'
      }
    ]
  },
  work: {
    id: 'work',
    title: 'Work & Productivity',
    color: '#6366F1',
    icon: 'target',
    subpacks: [
      {
        id: 'deep-work-builder',
        title: 'Deep-Work Builder',
        description: 'Protect focus and ship one thing.'
      },
      {
        id: 'meeting-diet',
        title: 'Meeting Diet',
        description: 'Cut useless meetings. Keep the good ones.'
      },
      {
        id: 'task-system-setup',
        title: 'Task System Setup',
        description: 'Simple system you will actually use.'
      }
    ]
  },
  money: {
    id: 'money',
    title: 'Money & Career',
    color: '#F59E0B',
    icon: 'wallet',
    subpacks: [
      {
        id: 'emergency-fund-start',
        title: 'Emergency Fund Start',
        description: 'Build a basic safety net.'
      },
      {
        id: 'job-hunt-sprint',
        title: 'Job Hunt Sprint',
        description: 'Focus search. Apply well. Land calls.'
      },
      {
        id: 'salary-raise-prep',
        title: 'Salary Raise Prep',
        description: 'Prove value. Ask well.'
      }
    ]
  },
  relationships: {
    id: 'relationships',
    title: 'Relationships & Social',
    color: '#F43F5E',
    icon: 'heart',
    subpacks: [
      {
        id: 'partner-connection',
        title: 'Partner Connection',
        description: 'Small daily acts. Weekly check-ins.'
      },
      {
        id: 'make-new-friends',
        title: 'Make New Friends',
        description: 'Meet people you like. Keep it light.'
      },
      {
        id: 'family-rhythm',
        title: 'Family Rhythm',
        description: 'Simple routines for a calm home.'
      }
    ]
  },
  purpose: {
    id: 'purpose',
    title: 'Purpose & Clarity',
    color: '#8B5CF6',
    icon: 'compass',
    subpacks: [
      {
        id: 'find-your-purpose',
        title: 'Find Your Purpose',
        description: 'Follow energy. Test small. Learn fast.'
      },
      {
        id: 'career-direction-check',
        title: 'Career Direction Check',
        description: 'Test roles fast without a career change.'
      },
      {
        id: 'creative-compass',
        title: 'Creative Compass',
        description: 'Pick a craft. Make and share weekly.'
      }
    ]
  },
  learning: {
    id: 'learning',
    title: 'Learning & Habits',
    color: '#3B82F6',
    icon: 'book',
    subpacks: [
      {
        id: 'habit-builder-101',
        title: 'Habit Builder 101',
        description: 'Start tiny. Win daily.'
      },
      {
        id: 'new-skill-30-days',
        title: 'New Skill in 30 Days',
        description: 'Learn one skill with a small project.'
      },
      {
        id: 'screen-time-reset',
        title: 'Screen Time Reset',
        description: 'Less doom scroll. More life.'
      }
    ]
  }
} as const;

export type PackId = keyof typeof packsData;
export type Pack = typeof packsData[PackId];
export type Subpack = Pack['subpacks'][number];