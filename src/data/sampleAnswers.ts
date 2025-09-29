// Sample answers for testing and development
// Structure: {pack}.{subpack}.{question_id}: [sample_answer_1, sample_answer_2, ...]

export const SAMPLE_ANSWERS: Record<string, any[]> = {
  // FITNESS PACK
  "fitness.fat-loss-sprint.target_delta_kg": [2, 3],
  "fitness.fat-loss-sprint.walk_time": ["early morning", "evening"],
  "fitness.fat-loss-sprint.meal_context": ["office canteen", "home"],
  "fitness.fat-loss-sprint.veg_nonveg": ["yes", "no"],
  "fitness.fat-loss-sprint.go_to_proteins": [["curd", "eggs", "chicken"], ["paneer", "lentils", "milk"]],
  "fitness.fat-loss-sprint.snack_time": ["late night", "late afternoon"],
  "fitness.fat-loss-sprint.pain_flag": ["some", "no"],
  "fitness.fat-loss-sprint.non_negotiables": [["10-min walk", "2 liters water"], ["1 palm protein", "sleep by 12"]],
  "fitness.fat-loss-sprint.planned_treat": ["one small chocolate on Sunday", "masala chai with two biscuits"],
  "fitness.fat-loss-sprint.weighin_freq": ["once a week", "2-3 times a week"],

  "fitness.strength-starter.goal_zone": ["gain muscle", "stay strong for health"],
  "fitness.strength-starter.equip": [["dumbbells"], ["resistance bands", "gym access"]],
  "fitness.strength-starter.time_slot": ["early morning", "evening"],
  "fitness.strength-starter.days_per_week": [3, 5],
  "fitness.strength-starter.experience": ["new", "some practice"],
  "fitness.strength-starter.focus_areas": [["back", "core"], ["legs", "glutes"]],
  "fitness.strength-starter.pain_limit": ["old knee pain on stairs", "stiff right shoulder"],
  "fitness.strength-starter.protein_sources": [["eggs", "curd"], ["paneer", "lentils"]],
  "fitness.strength-starter.recovery_ritual": ["stretch 10 min", "light yoga"],
  "fitness.strength-starter.proof_of_progress": ["5 more push‑ups", "lift 2 kg more in rows"],

  "fitness.walk-to-run-5k.current_walk": ["20 min", "30 min"],
  "fitness.walk-to-run-5k.run_intervals": ["30 seconds", "no"],
  "fitness.walk-to-run-5k.days_week": [3, 5],
  "fitness.walk-to-run-5k.best_time": ["early morning", "evening"],
  "fitness.walk-to-run-5k.surface": ["park path", "treadmill"],
  "fitness.walk-to-run-5k.foot_knee_status": ["no", "some"],
  "fitness.walk-to-run-5k.shoes_age": ["under 6 months", "older"],
  "fitness.walk-to-run-5k.cross_train": ["yoga", "bodyweight moves"],
  "fitness.walk-to-run-5k.race_date": ["no", "15-12"],
  "fitness.walk-to-run-5k.pace_rule": ["jog easy; I can talk", "walk if breath gets heavy"],

  // WORK PACK
  "work.deep-work-builder.deliverable": ["finish landing page copy", "ship v1 of mobile app"],
  "work.deep-work-builder.deep_work_window": ["7:30–9:00 am", "9:00–10:30 pm"],
  "work.deep-work-builder.top_interrupt": ["phone", "chat apps"],
  "work.deep-work-builder.work_spot": ["home", "office"],
  "work.deep-work-builder.timer_style": ["75/15", "50/10"],
  "work.deep-work-builder.blocks_per_week": [5, 7],
  "work.deep-work-builder.accountability": ["mentor Riya", "team Slack channel"],
  "work.deep-work-builder.milestones": ["write outline, draft, final", "set up DB, API, UI"],
  "work.deep-work-builder.first_blocker_fix": ["phone away", "auto‑mute chat"],
  "work.deep-work-builder.end_ritual": ["note next 3 steps", "log progress in Notion"],

  "work.meeting-diet.current_hours": [18, 12],
  "work.meeting-diet.worst_type": ["status updates", "large group"],
  "work.meeting-diet.recurring_count": [8, 5],
  "work.meeting-diet.no_doc_rule": ["yes", "no"],
  "work.meeting-diet.async_tools": [["shared doc", "kanban board"], ["loom video", "Slack updates"]],
  "work.meeting-diet.hard_block": ["2:00–3:00 pm", "10:00–11:30 am"],
  "work.meeting-diet.delegate_rule": ["send teammate if no decisions", "skip if only update"],
  "work.meeting-diet.decline_script": ["No doc, so I'll pass and read update.", "Send notes; I'll comment async."],
  "work.meeting-diet.review_day": ["Fri", "Sun"],
  "work.meeting-diet.success_signal": ["-5 hrs/week", "-30% meetings"],

  "work.task-system-setup.tool_pick": ["Notion", "paper"],
  "work.task-system-setup.capture_inbox": ["inbox list", "email flag"],
  "work.task-system-setup.daily_top3": ["morning", "night before"],
  "work.task-system-setup.project_list": ["launch MissionMap website", "close Q4 invoices"],
  "work.task-system-setup.weekly_review": ["5:00–5:45 pm Sun", "7:30–8:15 pm Fri"],
  "work.task-system-setup.contexts": [["deep work", "quick wins"], ["office", "errands"]],
  "work.task-system-setup.deadline_style": ["sprints", "hard dates"],
  "work.task-system-setup.blockers": ["unclear scope", "too many pings"],
  "work.task-system-setup.visibility": ["share with product channel", "manager only"],
  "work.task-system-setup.success_mark": ["ship Top 3 daily for 2 weeks", "inbox at zero weekly"],

  // MONEY PACK
  "money.emergency-fund-start.one_month_target": [35000, 60000],
  "money.emergency-fund-start.weekly_autosave": [2000, 1500],
  "money.emergency-fund-start.paydays": [["1st", "15th"], ["end of month"]],
  "money.emergency-fund-start.expense_leak": ["food delivery", "shopping"],
  "money.emergency-fund-start.nospend_days_goal": ["3 days", "2 days"],
  "money.emergency-fund-start.fund_location": ["separate bank", "savings account"],
  "money.emergency-fund-start.emergency_rule": ["Only job loss or medical.", "Not for shopping or trips."],
  "money.emergency-fund-start.money_buddy": ["cousin Neha", "none"],
  "money.emergency-fund-start.impulse_rule": ["24‑hour wait rule", "delete saved cards on apps"],
  "money.emergency-fund-start.first_milestone_amount": [10000, 25000],

  "money.job-hunt-sprint.target_role": ["frontend developer", "product manager"],
  "money.job-hunt-sprint.target_industry": ["fintech", "health tech"],
  "money.job-hunt-sprint.location_mode": ["hybrid", "remote"],
  "money.job-hunt-sprint.salary_range": ["10–14 LPA", "6–8 LPA"],
  "money.job-hunt-sprint.top_companies": ["Razorpay, Zomato, Swiggy, CRED, PhonePe", "TCS, Infosys, Wipro, HCL, LTIM"],
  "money.job-hunt-sprint.resume_status": ["needs rewrite", "okay"],
  "money.job-hunt-sprint.weekly_apps": [5, 8],
  "money.job-hunt-sprint.referral_paths": ["college seniors, ex‑manager", "meetups, LinkedIn groups"],
  "money.job-hunt-sprint.interview_blocker": ["technical", "storytelling"],
  "money.job-hunt-sprint.practice_plan": ["daily DSA for 30 min", "STAR stories in a doc"],

  "money.salary-raise-prep.role_tenure": ["1-2 years", "2+ years"],
  "money.salary-raise-prep.wins": ["cut support tickets by 30%", "shipped billing revamp"],
  "money.salary-raise-prep.metrics": ["revenue +12%", "release time −25%"],
  "money.salary-raise-prep.market_check": ["rough idea", "yes, with data"],
  "money.salary-raise-prep.timing": ["performance review", "after big delivery"],
  "money.salary-raise-prep.manager_signal": ["lead Q3 feature end‑to‑end", "mentor 2 juniors"],
  "money.salary-raise-prep.backup_benefits": [["learning budget", "title"], ["bonus", "remote day"]],
  "money.salary-raise-prep.case_doc": ["Notion", "Google Doc"],
  "money.salary-raise-prep.ally": ["team lead Arun", "HR partner"],
  "money.salary-raise-prep.ask_script": ["Based on impact, I'm asking for 12% raise.", "Can we discuss comp adjustment this cycle?"],

  // RELATIONSHIPS PACK
  "relationships.partner-connection.connection_goal": ["talk daily without phones", "plan one fun outing weekly"],
  "relationships.partner-connection.love_langs": [["time", "help"], ["words", "touch"]],
  "relationships.partner-connection.ritual_slot": ["9:30–9:50 pm", "7:30–7:50 am"],
  "relationships.partner-connection.conflict_trigger": ["tone", "chores"],
  "relationships.partner-connection.repair_style": ["short walk", "time‑out"],
  "relationships.partner-connection.device_free_window": ["at dinner", "9–10 pm"],
  "relationships.partner-connection.micro_dates": [["cafe walk", "cook together"], ["board game", "music time"]],
  "relationships.partner-connection.appreciation_mode": ["note", "hug"],
  "relationships.partner-connection.boundary": ["no work talk after 9 pm", "no shouting during fights"],
  "relationships.partner-connection.checkin_format": ["3 prompts", "traffic‑light"],

  "relationships.make-new-friends.friend_type": ["hobby buddy", "open"],
  "relationships.make-new-friends.interests": [["fitness", "food"], ["books", "music"]],
  "relationships.make-new-friends.meet_mode": ["community event", "online group"],
  "relationships.make-new-friends.time_budget": [2, 4],
  "relationships.make-new-friends.openers": ["Hi, what brings you here?", "I liked your question in the group."],
  "relationships.make-new-friends.follow_up": ["text", "invite to coffee"],
  "relationships.make-new-friends.safety_rule": ["meet in public place", "share location with family"],
  "relationships.make-new-friends.no_phone_slot": ["6:00–7:00 pm", "8:00–9:00 pm"],
  "relationships.make-new-friends.event_source": ["local WhatsApp", "Meetup"],
  "relationships.make-new-friends.proof_friendship": ["we plan a second meet", "we chat outside the group"],

  "relationships.family-rhythm.home_goal": ["less shouting in mornings", "tidy home by night"],
  "relationships.family-rhythm.shared_meals": [3, 5],
  "relationships.family-rhythm.chore_slots": ["7:30–7:50 am", "8:30–8:50 pm"],
  "relationships.family-rhythm.device_rules": ["dinner", "bedtime"],
  "relationships.family-rhythm.kid_ages": ["6 and 10", "none"],
  "relationships.family-rhythm.bedtime_target": ["10:30 pm lights out", "kids in bed by 9:30 pm"],
  "relationships.family-rhythm.budget_chat": ["7:00–7:30 pm Sun", "8:00–8:30 pm Fri"],
  "relationships.family-rhythm.fun_block": ["park picnic on Sunday", "board game night Saturday"],
  "relationships.family-rhythm.help_network": ["grandparents on weekdays", "neighbor for emergencies"],
  "relationships.family-rhythm.success_marker": ["no morning rush 4 days a week", "3 dinners together weekly"],

  // PURPOSE PACK
  "purpose.find-your-purpose.flow_story": ["I lost track of time while sketching.", "Helping my cousin with her resume felt easy."],
  "purpose.find-your-purpose.anger_compass": ["food waste in cities", "bad bus service"],
  "purpose.find-your-purpose.fav_audience": ["new grads", "working moms"],
  "purpose.find-your-purpose.work_ingredients": [["teach", "design"], ["make", "care"]],
  "purpose.find-your-purpose.courage_edge": ["posting my work online", "speaking to a group"],
  "purpose.find-your-purpose.constraints": ["2 hrs/week, tight budget", "weekends only"],
  "purpose.find-your-purpose.mentor_list": ["Ali Abdaal, Kunal Shah, Vandana Shiva", "Deepti, Harish, Tanvi"],
  "purpose.find-your-purpose.tiny_experiment": ["record a 60‑min study vlog", "design a simple poster for a friend"],
  "purpose.find-your-purpose.share_mode": ["video", "post"],
  "purpose.find-your-purpose.purpose_seed": ["I am here to teach simple skills.", "I am here to make helpful tools."],

  "purpose.career-direction-check.role_options": ["product manager, UX writer, ops lead", "teacher, analyst, founder"],
  "purpose.career-direction-check.skills_you_enjoy": [["writing", "talking to people"], ["design", "numbers"]],
  "purpose.career-direction-check.work_energy": ["solo focus", "mixed"],
  "purpose.career-direction-check.red_flags": ["late‑night calls daily", "no growth path"],
  "purpose.career-direction-check.values": [["growth", "impact", "freedom"], ["stability", "creativity", "growth"]],
  "purpose.career-direction-check.day_shape": ["few big tasks", "meet people"],
  "purpose.career-direction-check.tiny_tests": ["write 2 blog posts; mock a product spec", "shadow a sales call; build a dashboard"],
  "purpose.career-direction-check.portfolio_slot": ["7:30–8:30 am Sat", "9:00–10:00 pm Wed"],
  "purpose.career-direction-check.mentor_ping": ["ex‑manager Nitesh", "senior from college"],
  "purpose.career-direction-check.decision_rule": ["pick role that felt energising 70% days", "continue role with best feedback"],

  "purpose.creative-compass.medium": ["writing", "video"],
  "purpose.creative-compass.theme": ["simple home workouts", "budget cooking for students"],
  "purpose.creative-compass.time_budget": [4, 6],
  "purpose.creative-compass.studio_slot": ["6:30–7:00 am", "9:30–10:00 pm"],
  "purpose.creative-compass.inspo": ["Ali Abdaal, Ayushmann songs, friend's blog", "3 YouTube channels I like"],
  "purpose.creative-compass.share_place": ["Instagram", "blog"],
  "purpose.creative-compass.collab": ["Rohit from class", "my cousin Aarti"],
  "purpose.creative-compass.blocker": ["fear of posting", "too many ideas"],
  "purpose.creative-compass.proof": ["one post every Saturday", "one 60‑sec reel weekly"],
  "purpose.creative-compass.mini_show": ["10-11", "25-12"],

  // LEARNING PACK
  "learning.habit-builder-101.tiny_habit": ["2‑min stretch after tea", "read 1 page at night"],
  "learning.habit-builder-101.anchor": ["coffee", "brush"],
  "learning.habit-builder-101.streak_target": [20, 25],
  "learning.habit-builder-101.visual_mark": ["calendar", "app"],
  "learning.habit-builder-101.two_min_version": ["do one push‑up", "read one paragraph"],
  "learning.habit-builder-101.bundle": ["chai after walk", "podcast with dishes"],
  "learning.habit-builder-101.friction_remove": ["keep shoes by door", "put book on pillow"],
  "learning.habit-builder-101.witness": ["WhatsApp group", "roommate"],
  "learning.habit-builder-101.slip_rule": ["miss once, start next day", "never miss two days"],
  "learning.habit-builder-101.installed_proof": ["21‑day streak", "do it without reminder"],

  "learning.new-skill-30.skill": ["Excel dashboards", "basic video editing"],
  "learning.new-skill-30.why_now": ["need it for job", "want side income"],
  "learning.new-skill-30.resources": [["YouTube list", "practice repo"], ["course", "mentor"]],
  "learning.new-skill-30.daily_slot": ["7:00–7:45 am", "9:00–9:45 pm"],
  "learning.new-skill-30.project": ["make a sales tracker sheet", "edit a 1‑min travel clip"],
  "learning.new-skill-30.checkpoint_days": [["day 7", "day 14"], ["day 21", "day 28"]],
  "learning.new-skill-30.practice_ratio": ["50/50", "70/30"],
  "learning.new-skill-30.share_demo": ["online post", "friend"],
  "learning.new-skill-30.blocker_now": ["low time on weekdays", "hard to stay regular"],
  "learning.new-skill-30.proof_skill": ["finish the project", "get feedback from one person"],

  "learning.screen-time-reset.top_apps": [["Instagram", "YouTube"], ["reels/shorts", "news"]],
  "learning.screen-time-reset.daily_limit": [90, 120],
  "learning.screen-time-reset.bed_park": ["desk", "another room"],
  "learning.screen-time-reset.cut_window": ["9:00–10:00 pm", "7:30–8:30 am"],
  "learning.screen-time-reset.trigger_time": ["late night", "on commute"],
  "learning.screen-time-reset.kept_apps": ["banking, WhatsApp family", "work email only"],
  "learning.screen-time-reset.swap_activity": [["walk", "read"], ["call a friend", "learn skill"]],
  "learning.screen-time-reset.nudges": [["grayscale phone", "time limits"], ["remove social from home screen", "turn off badges"]],
  "learning.screen-time-reset.buddy": ["spouse", "best friend"],
  "learning.screen-time-reset.success_look": ["sleep by 11 pm", "2 hrs more for reading"]
};

// Helper function to get a random sample answer for a question
export function getRandomSampleAnswer(packId: string, subpackId: string, questionId: string): any {
  const key = `${packId}.${subpackId}.${questionId}`;
  const samples = SAMPLE_ANSWERS[key];
  
  if (!samples || samples.length === 0) {
    return null;
  }
  
  return samples[Math.floor(Math.random() * samples.length)];
}

// Helper function to get all sample answers for a specific subpack
export function getSubpackSampleAnswers(packId: string, subpackId: string): Record<string, any> {
  const prefix = `${packId}.${subpackId}.`;
  const answers: Record<string, any> = {};
  
  Object.entries(SAMPLE_ANSWERS).forEach(([key, values]) => {
    if (key.startsWith(prefix)) {
      const questionId = key.replace(prefix, '');
      answers[questionId] = getRandomSampleAnswer(packId, subpackId, questionId);
    }
  });
  
  return answers;
}

// Helper function to check if sample answers exist for a question
export function hasSampleAnswers(packId: string, subpackId: string, questionId: string): boolean {
  const key = `${packId}.${subpackId}.${questionId}`;
  return key in SAMPLE_ANSWERS && SAMPLE_ANSWERS[key].length > 0;
}