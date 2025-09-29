// Local preview generation - no external API calls required
export interface PreviewData {
  title: string;
  mission: string;
  hook: string;
  thisWeek: string[];
}

export function generateLocalPreview(packId: string, subpackId: string, answers: Record<string, any>): PreviewData {
  console.log('[PreviewGenerator] Generating local preview for:', { packId, subpackId, answerCount: Object.keys(answers).length });
  
  // Generate preview based on pack and subpack
  const packLabels: Record<string, string> = {
    fitness: 'Fitness',
    work: 'Work',
    money: 'Money',
    relationships: 'Relationships',
    purpose: 'Purpose',
    learning: 'Learning'
  };
  
  const subpackLabels: Record<string, Record<string, string>> = {
    fitness: {
      'weight-loss': 'Weight Loss',
      'muscle-gain': 'Muscle Gain',
      'endurance': 'Endurance',
      'flexibility': 'Flexibility'
    },
    work: {
      'productivity': 'Productivity',
      'career-growth': 'Career Growth',
      'leadership': 'Leadership',
      'work-life-balance': 'Work-Life Balance'
    },
    money: {
      'budgeting': 'Budgeting',
      'saving': 'Saving',
      'investing': 'Investing',
      'debt-reduction': 'Debt Reduction'
    },
    relationships: {
      'dating': 'Dating',
      'marriage': 'Marriage',
      'family': 'Family',
      'friendships': 'Friendships'
    },
    purpose: {
      'finding-purpose': 'Finding Purpose',
      'life-goals': 'Life Goals',
      'values': 'Values',
      'meaning': 'Meaning'
    },
    learning: {
      'new-skills': 'New Skills',
      'education': 'Education',
      'reading': 'Reading',
      'languages': 'Languages'
    }
  };
  
  const packLabel = packLabels[packId] || 'Personal';
  const subpackLabel = subpackLabels[packId]?.[subpackId] || 'Growth';
  
  // Create personalized content based on answers
  const personalizedActions = generatePersonalizedActions(packId, subpackId, answers);
  
  return {
    title: `Your ${subpackLabel} Plan`,
    mission: generateMission(packId, subpackId, answers),
    hook: generateHook(packId, subpackId, answers),
    thisWeek: personalizedActions
  };
}

function generateMission(packId: string, subpackId: string, answers: Record<string, any>): string {
  const missions: Record<string, Record<string, string>> = {
    fitness: {
      'weight-loss': 'A sustainable approach to losing weight while building healthy habits',
      'muscle-gain': 'A structured plan to build lean muscle through smart training and nutrition',
      'endurance': 'A progressive program to boost your cardiovascular fitness and stamina',
      'flexibility': 'A gentle routine to improve your mobility and prevent injury'
    },
    work: {
      'productivity': 'A focused strategy to maximize your output while reducing stress',
      'career-growth': 'A clear roadmap to advance your career and reach your professional goals',
      'leadership': 'A practical approach to developing your leadership skills and influence',
      'work-life-balance': 'A balanced framework to excel at work while protecting your personal time'
    },
    money: {
      'budgeting': 'A simple system to track your spending and take control of your finances',
      'saving': 'A proven method to build your savings steadily and consistently',
      'investing': 'A beginner-friendly approach to growing your wealth through smart investments',
      'debt-reduction': 'A strategic plan to eliminate debt and achieve financial freedom'
    },
    relationships: {
      'dating': 'A confident approach to meeting new people and building meaningful connections',
      'marriage': 'A strengthening plan to deepen your bond and improve communication',
      'family': 'A nurturing strategy to build stronger family relationships and create lasting memories',
      'friendships': 'A thoughtful approach to cultivating deeper, more fulfilling friendships'
    },
    purpose: {
      'finding-purpose': 'A journey of self-discovery to identify what truly matters to you',
      'life-goals': 'A clear framework to set and achieve meaningful life goals',
      'values': 'A reflective process to clarify your core values and live by them',
      'meaning': 'A purposeful approach to creating more meaning in your daily life'
    },
    learning: {
      'new-skills': 'A structured approach to mastering new skills that matter to you',
      'education': 'A focused plan to advance your education and knowledge',
      'reading': 'A consistent routine to read more and retain what you learn',
      'languages': 'A practical method to learn a new language step by step'
    }
  };
  
  return missions[packId]?.[subpackId] || 'A tailored approach based on your answers';
}

function generateHook(packId: string, subpackId: string, answers: Record<string, any>): string {
  const hooks = [
    'Time to turn your goals into progress you can actually feel.',
    'Ready to make real progress that sticks?',
    'Your transformation starts with small, consistent steps.',
    'Let\'s build momentum that carries you forward.',
    'Progress you can see, feel, and be proud of.',
    'Small changes, big results - starting now.',
    'Your future self will thank you for starting today.'
  ];
  
  // Pick a hook based on pack (for consistency)
  const hookIndex = packId.length % hooks.length;
  return hooks[hookIndex];
}

function generatePersonalizedActions(packId: string, subpackId: string, answers: Record<string, any>): string[] {
  const baseActions: Record<string, Record<string, string[]>> = {
    fitness: {
      'weight-loss': [
        'Track your daily food intake to understand your eating patterns',
        'Take a 15-minute walk after each meal to boost metabolism',
        'Replace one sugary drink per day with water',
        'Plan your meals the night before to avoid impulsive choices'
      ],
      'muscle-gain': [
        'Do bodyweight exercises for 20 minutes every other day',
        'Eat a protein-rich snack within 30 minutes after exercising',
        'Track your workout progress to see strength improvements',
        'Get 7-8 hours of sleep to support muscle recovery'
      ]
    },
    work: {
      'productivity': [
        'Start each day by identifying your top 3 priorities',
        'Use the Pomodoro Technique for focused work sessions',
        'Turn off notifications during deep work time',
        'Review and plan tomorrow before ending your workday'
      ],
      'career-growth': [
        'Spend 30 minutes daily learning a skill relevant to your field',
        'Reach out to one professional contact each week',
        'Document your achievements and contributions weekly',
        'Set up a monthly one-on-one with your manager or mentor'
      ]
    },
    money: {
      'budgeting': [
        'Track every expense for one week to understand spending patterns',
        'Set up automatic transfers to savings on payday',
        'Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings',
        'Review and categorize expenses weekly'
      ],
      'saving': [
        'Start with saving just $1 per day and gradually increase',
        'Open a separate high-yield savings account for your goals',
        'Automate your savings so it happens without thinking',
        'Challenge yourself to find one expense to cut each week'
      ]
    }
  };
  
  const defaultActions = [
    'Start with small, manageable changes to build momentum',
    'Focus on consistency over perfection in your daily routine',
    'Track your progress to stay motivated and accountable',
    'Celebrate small wins to maintain positive momentum'
  ];
  
  return baseActions[packId]?.[subpackId] || defaultActions;
}