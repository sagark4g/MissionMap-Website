export const quizData = {
  "schemaVersion": "1.0",
  "packs": [
    {
      "id": "fitness",
      "label": "Fitness & Health",
      "subpacks": [
        {
          "id": "fat-loss-sprint",
          "label": "Fat‑Loss Sprint",
          "description": "Drop weight safely in 30 days.",
          "questions": [
            {"id":"target_delta_kg","label":"How much do you want to lose in 30 days?","help":"Write in kg, like \"2\".","type":"number","required":true},
            {"id":"walk_time","label":"When can you walk most days?","type":"radio","options":["early morning","lunch","evening","late night"],"required":true},
            {"id":"meal_context","label":"Where do you eat most meals?","type":"radio","options":["home","office canteen","street food","delivery"],"required":true},
            {"id":"veg_nonveg","label":"Do you eat meat?","type":"radio","options":["no","yes"],"required":true},
            {"id":"go_to_proteins","label":"Pick 3 proteins you will eat.","type":"multiselect","options":["paneer","curd","tofu","lentils","soy chunks","milk","eggs","chicken","fish"],"required":true},
            {"id":"snack_time","label":"When do snacks hit you hard?","type":"radio","options":["late afternoon","late night","random","rarely"],"required":true},
            {"id":"pain_flag","label":"Any knee or foot pain while walking?","type":"radio","options":["no","some","yes, often"],"required":true},
            {"id":"non_negotiables","label":"Pick 2 rules you can keep on bad days.","type":"multiselect","options":["10-min walk","no sugary drinks","2 liters water","1 palm protein","sleep by 12"],"required":true},
            {"id":"planned_treat","label":"What treat will you still keep?","type":"short_text","required":true},
            {"id":"weighin_freq","label":"How often do you want to weigh yourself?","type":"radio","options":["daily","2-3 times a week","once a week","skip"],"required":true}
          ]
        },
        {
          "id": "strength-starter",
          "label": "Strength Starter",
          "description": "Build basic strength with safe form.",
          "questions": [
            {"id":"goal_zone","label":"What do you want from strength work?","type":"radio","options":["tone up","gain muscle","stay strong for health"],"required":true},
            {"id":"equip","label":"What gear do you have?","type":"multiselect","options":["none","resistance bands","dumbbells","kettlebell","gym access"],"required":true},
            {"id":"time_slot","label":"When can you train most days?","type":"radio","options":["early morning","midday","evening","varies"],"required":true},
            {"id":"days_per_week","label":"How many days per week can you train?","type":"slider","min":2,"max":6,"required":true},
            {"id":"experience","label":"Your level with strength moves?","type":"radio","options":["new","some practice","trained before"],"required":true},
            {"id":"focus_areas","label":"Pick 2 areas to focus.","type":"multiselect","options":["legs","glutes","back","chest","core","shoulders","arms"],"required":true},
            {"id":"pain_limit","label":"Any pain that limits moves?","help":"Tell joints or past injury.","type":"short_text","required":true},
            {"id":"protein_sources","label":"Your easy proteins this month.","type":"multiselect","options":["eggs","curd","paneer","tofu","lentils","chicken","fish","milk"],"required":true},
            {"id":"recovery_ritual","label":"How will you recover?","type":"radio","options":["stretch 10 min","walk 10 min","light yoga","foam roll"],"required":true},
            {"id":"proof_of_progress","label":"What will show progress?","help":"Example: more reps, heavier weight.","type":"short_text","required":true}
          ]
        },
        {
          "id": "walk-to-run-5k",
          "label": "Walk‑to‑Run 5K",
          "description": "Go from walking to a gentle 5K.",
          "questions": [
            {"id":"current_walk","label":"How long can you walk now?","type":"radio","options":["10 min","20 min","30 min","45+ min"],"required":true},
            {"id":"run_intervals","label":"Can you jog in short bursts now?","type":"radio","options":["no","15 seconds","30 seconds","60 seconds"],"required":true},
            {"id":"days_week","label":"How many days can you train?","type":"slider","min":2,"max":6,"required":true},
            {"id":"best_time","label":"Best time of day to train?","type":"radio","options":["early morning","lunch","evening","varies"],"required":true},
            {"id":"surface","label":"Where will you run or walk?","type":"radio","options":["track","park path","road","treadmill"],"required":true},
            {"id":"foot_knee_status","label":"Any foot or knee pain?","type":"radio","options":["no","some","yes, often"],"required":true},
            {"id":"shoes_age","label":"How old are your shoes?","type":"radio","options":["new","under 6 months","6-12 months","older"],"required":true},
            {"id":"cross_train","label":"Pick one cross‑train day.","type":"radio","options":["bodyweight moves","cycling","yoga","skip"],"required":true},
            {"id":"race_date","label":"Do you have a target event date?","type":"short_text","help":"Write date or \"no\".","required":true},
            {"id":"pace_rule","label":"Your pace rule for safety.","help":"Example: run easy; talk is possible.","type":"short_text","required":true}
          ]
        }
      ]
    },
    {
      "id": "work",
      "label": "Work & Productivity",
      "subpacks": [
        {
          "id": "deep-work-builder",
          "label": "Deep‑Work Builder",
          "description": "Protect focus and ship one thing.",
          "questions": [
            {"id":"deliverable","label":"What will you finish in 30 days?","type":"short_text","required":true},
            {"id":"deep_work_window","label":"Pick a 90‑minute focus time.","type":"time_window","required":true},
            {"id":"top_interrupt","label":"What breaks your focus most?","type":"radio","options":["phone","chat apps","meetings","people around","other"],"required":true},
            {"id":"work_spot","label":"Where will you do deep work?","type":"radio","options":["home","office","cafe","mixed"],"required":true},
            {"id":"timer_style","label":"Pick a focus timer.","type":"radio","options":["50/10","75/15","90/20"],"required":true},
            {"id":"blocks_per_week","label":"How many focus blocks each week?","type":"slider","min":1,"max":10,"required":true},
            {"id":"accountability","label":"Who sees your Friday update?","type":"short_text","required":true},
            {"id":"milestones","label":"Write 3 small milestones.","type":"long_text","required":true},
            {"id":"first_blocker_fix","label":"Pick one blocker to fix first.","type":"radio","options":["phone away","auto‑mute chat","no AM email","door closed"],"required":true},
            {"id":"end_ritual","label":"How will you end each session?","type":"short_text","required":true}
          ]
        },
        {
          "id": "meeting-diet",
          "label": "Meeting Diet",
          "description": "Cut useless meetings. Keep the good ones.",
          "questions": [
            {"id":"current_hours","label":"How many meeting hours last week?","type":"number","required":true},
            {"id":"worst_type","label":"Which meetings waste most time?","type":"radio","options":["status updates","planning","1:1s","large group"],"required":true},
            {"id":"recurring_count","label":"How many are recurring each week?","type":"number","required":true},
            {"id":"no_doc_rule","label":"Will you ask for a pre‑read doc?","type":"radio","options":["yes","no"],"required":true},
            {"id":"async_tools","label":"Pick async tools you will use.","type":"multiselect","options":["shared doc","loom video","Slack updates","kanban board"],"required":true},
            {"id":"hard_block","label":"Pick a daily no‑meeting block.","type":"time_window","required":true},
            {"id":"delegate_rule","label":"When will you send a delegate?","type":"short_text","required":true},
            {"id":"decline_script","label":"Your polite decline script.","type":"short_text","required":true},
            {"id":"review_day","label":"Which day to audit your calendar?","type":"radio","options":["Fri","Sat","Sun","Mon"],"required":true},
            {"id":"success_signal","label":"What shows the diet works?","type":"short_text","help":"Example: -5 hrs/week.","required":true}
          ]
        },
        {
          "id": "task-system-setup",
          "label": "Task System Setup",
          "description": "Simple system you will actually use.",
          "questions": [
            {"id":"tool_pick","label":"Pick your task tool.","type":"radio","options":["paper","notes app","Todoist","Notion","Trello"],"required":true},
            {"id":"capture_inbox","label":"Where will new tasks land?","type":"radio","options":["inbox list","email flag","chat pin","sticky note"],"required":true},
            {"id":"daily_top3","label":"When will you pick your Top 3?","type":"radio","options":["night before","morning","after lunch"],"required":true},
            {"id":"project_list","label":"Name your main project now.","type":"short_text","required":true},
            {"id":"weekly_review","label":"Pick a weekly review time.","type":"time_window","required":true},
            {"id":"contexts","label":"Do you use simple contexts?","type":"multiselect","options":["home","office","errands","deep work","quick wins"],"required":true},
            {"id":"deadline_style","label":"How will you set deadlines?","type":"radio","options":["hard dates","soft targets","sprints"],"required":true},
            {"id":"blockers","label":"Your top blocker today?","type":"short_text","required":true},
            {"id":"visibility","label":"Who will see your board?","type":"short_text","help":"Person or channel.","required":true},
            {"id":"success_mark","label":"What proves the system works?","type":"short_text","required":true}
          ]
        }
      ]
    },
    {
      "id": "money",
      "label": "Money & Career",
      "subpacks": [
        {
          "id": "emergency-fund-start",
          "label": "Emergency Fund Start",
          "description": "Build a basic safety net.",
          "questions": [
            {"id":"one_month_target","label":"How much is one month of your life (₹)?","type":"number","required":true},
            {"id":"weekly_autosave","label":"How much can you save each week (₹)?","type":"number","required":true},
            {"id":"paydays","label":"When do you get paid?","type":"multiselect","options":["1st","7th","15th","end of month","other"],"required":true},
            {"id":"expense_leak","label":"Where does money leak most?","type":"radio","options":["food delivery","rides","shopping","subscriptions"],"required":true},
            {"id":"nospend_days_goal","label":"Pick a no‑spend days goal per week.","type":"radio","options":["2 days","3 days","4 days"],"required":true},
            {"id":"fund_location","label":"Where will you keep the fund?","type":"radio","options":["separate bank","savings account","cash"],"required":true},
            {"id":"emergency_rule","label":"When can you use the fund?","type":"long_text","required":true},
            {"id":"money_buddy","label":"Name a money buddy (or write \"none\").","type":"short_text","required":true},
            {"id":"impulse_rule","label":"What will stop impulse buys?","type":"short_text","required":true},
            {"id":"first_milestone_amount","label":"First milestone that will feel good (₹).","type":"number","required":true}
          ]
        },
        {
          "id": "job-hunt-sprint",
          "label": "Job Hunt Sprint",
          "description": "Focus search. Apply well. Land calls.",
          "questions": [
            {"id":"target_role","label":"What role are you going for?","type":"short_text","required":true},
            {"id":"target_industry","label":"What industry fits best?","type":"short_text","required":true},
            {"id":"location_mode","label":"Where will you work?","type":"radio","options":["onsite","hybrid","remote","open"],"required":true},
            {"id":"salary_range","label":"Your salary range (₹).","help":"Write min‑max.","type":"short_text","required":true},
            {"id":"top_companies","label":"List 5 dream companies.","type":"long_text","required":true},
            {"id":"resume_status","label":"Resume/LinkedIn status now?","type":"radio","options":["needs rewrite","okay","strong"],"required":true},
            {"id":"weekly_apps","label":"How many good applications per week?","type":"slider","min":3,"max":15,"required":true},
            {"id":"referral_paths","label":"Who might refer you?","type":"long_text","required":true},
            {"id":"interview_blocker","label":"What part of interviews is hardest?","type":"radio","options":["storytelling","technical","case","salary talk"],"required":true},
            {"id":"practice_plan","label":"How will you practice?","type":"short_text","required":true}
          ]
        },
        {
          "id": "salary-raise-prep",
          "label": "Salary Raise Prep",
          "description": "Prove value. Ask well.",
          "questions": [
            {"id":"role_tenure","label":"How long in your current role?","type":"radio","options":["<6 months","6-12 months","1-2 years","2+ years"],"required":true},
            {"id":"wins","label":"List 3 clear wins with proof.","type":"long_text","required":true},
            {"id":"metrics","label":"Pick 2 numbers you improved.","type":"short_text","help":"Example: revenue, speed, quality.","required":true},
            {"id":"market_check","label":"Do you know market pay?","type":"radio","options":["no","rough idea","yes, with data"],"required":true},
            {"id":"timing","label":"When will you ask?","type":"radio","options":["after big delivery","performance review","budget cycle","soon"],"required":true},
            {"id":"manager_signal","label":"What will show your manager you are ready?","type":"short_text","required":true},
            {"id":"backup_benefits","label":"If pay is tight, what else helps?","type":"multiselect","options":["bonus","stock","learning budget","title","remote day"],"required":true},
            {"id":"case_doc","label":"Where will you keep your case doc?","type":"radio","options":["Notion","Google Doc","Slides","Other"],"required":true},
            {"id":"ally","label":"Who will preview your pitch?","type":"short_text","required":true},
            {"id":"ask_script","label":"Write a one‑line ask.","type":"short_text","required":true}
          ]
        }
      ]
    },
    {
      "id": "relationships",
      "label": "Relationships & Social",
      "subpacks": [
        {
          "id": "partner-connection",
          "label": "Partner Connection",
          "description": "Small daily acts. Weekly check‑ins.",
          "questions": [
            {"id":"connection_goal","label":"What would make you feel closer in 30 days?","type":"short_text","required":true},
            {"id":"love_langs","label":"Pick 2 love languages that fit you both.","type":"multiselect","options":["words","time","gifts","help","touch"],"required":true},
            {"id":"ritual_slot","label":"Pick a daily 20‑minute slot for a ritual.","type":"time_window","required":true},
            {"id":"conflict_trigger","label":"What starts fights most?","type":"radio","options":["tone","chores","money","family","time"],"required":true},
            {"id":"repair_style","label":"How do you both cool down best?","type":"radio","options":["time‑out","short walk","write then talk"],"required":true},
            {"id":"device_free_window","label":"Pick a no‑phone time.","type":"radio","options":["at dinner","9–10 pm","Sunday noon–4"],"required":true},
            {"id":"micro_dates","label":"Pick 2 simple date ideas.","type":"multiselect","options":["cafe walk","cook together","board game","music time"],"required":true},
            {"id":"appreciation_mode","label":"How will you show thanks each day?","type":"radio","options":["note","text","voice note","hug","small help"],"required":true},
            {"id":"boundary","label":"One clear boundary you will keep.","type":"short_text","required":true},
            {"id":"checkin_format","label":"How will you do the weekly check‑in?","type":"radio","options":["3 prompts","traffic‑light","free chat"],"required":true}
          ]
        },
        {
          "id": "make-new-friends",
          "label": "Make New Friends",
          "description": "Meet people you like. Keep it light.",
          "questions": [
            {"id":"friend_type","label":"What kind of friend are you seeking?","type":"radio","options":["hobby buddy","learning buddy","walk buddy","open"],"required":true},
            {"id":"interests","label":"Pick 2 interests to use for meets.","type":"multiselect","options":["books","fitness","coding","music","photography","food"],"required":true},
            {"id":"meet_mode","label":"Where will you meet people?","type":"radio","options":["class or club","community event","online group","mixed"],"required":true},
            {"id":"time_budget","label":"How much time each week for meets?","type":"slider","min":1,"max":6,"required":true},
            {"id":"openers","label":"Write two easy chat openers.","type":"short_text","required":true},
            {"id":"follow_up","label":"How will you follow up after a meet?","type":"radio","options":["text","call","invite to coffee"],"required":true},
            {"id":"safety_rule","label":"Your safety rule for new meets.","type":"short_text","required":true},
            {"id":"no_phone_slot","label":"Pick one device‑free social hour.","type":"time_window","required":true},
            {"id":"event_source","label":"Where will you find events?","type":"radio","options":["Meetup","local WhatsApp","Instagram","friends"],"required":true},
            {"id":"proof_friendship","label":"What shows a new friendship is forming?","type":"short_text","required":true}
          ]
        },
        {
          "id": "family-rhythm",
          "label": "Family Rhythm",
          "description": "Simple routines for a calm home.",
          "questions": [
            {"id":"home_goal","label":"What would make home feel calmer?","type":"short_text","required":true},
            {"id":"shared_meals","label":"How many family dinners per week?","type":"slider","min":1,"max":7,"required":true},
            {"id":"chore_slots","label":"Pick two 20‑min daily chore slots.","type":"time_window","required":true},
            {"id":"device_rules","label":"Pick a device‑free time.","type":"radio","options":["dinner","bedtime","homework hour"],"required":true},
            {"id":"kid_ages","label":"Kids' ages (write \"none\" if no kids).","type":"short_text","required":true},
            {"id":"bedtime_target","label":"Target lights‑out time.","type":"short_text","required":true},
            {"id":"budget_chat","label":"Weekly money chat time.","type":"time_window","required":true},
            {"id":"fun_block","label":"One weekly low‑cost family plan.","type":"short_text","required":true},
            {"id":"help_network","label":"Who helps when you are stuck?","type":"short_text","required":true},
            {"id":"success_marker","label":"What proves the rhythm works?","type":"short_text","required":true}
          ]
        }
      ]
    },
    {
      "id": "purpose",
      "label": "Purpose & Clarity",
      "subpacks": [
        {
          "id": "find-your-purpose",
          "label": "Find Your Purpose",
          "description": "Follow energy. Test small. Learn fast.",
          "questions": [
            {"id":"flow_story","label":"When did you forget the clock last month?","type":"long_text","required":true},
            {"id":"anger_compass","label":"What problem in the world makes you angry?","type":"short_text","required":true},
            {"id":"fav_audience","label":"Who do you like to help?","type":"short_text","required":true},
            {"id":"work_ingredients","label":"Pick 2 things you enjoy doing.","type":"multiselect","options":["make","fix","teach","sell","care","analyze","design"],"required":true},
            {"id":"courage_edge","label":"What scares you but also excites you?","type":"short_text","required":true},
            {"id":"constraints","label":"Your time and money limits right now.","type":"short_text","required":true},
            {"id":"mentor_list","label":"Name 3 people whose work you admire.","type":"short_text","required":true},
            {"id":"tiny_experiment","label":"Pick a 60‑minute test for next week.","type":"short_text","required":true},
            {"id":"share_mode","label":"How will you share the result?","type":"radio","options":["post","video","demo to a friend"],"required":true},
            {"id":"purpose_seed","label":"Write one line: \"I am here to…\"","type":"short_text","required":true}
          ]
        },
        {
          "id": "career-direction-check",
          "label": "Career Direction Check",
          "description": "Test roles fast without a career change.",
          "questions": [
            {"id":"role_options","label":"List 3 roles you might like.","type":"long_text","required":true},
            {"id":"skills_you_enjoy","label":"What skills do you enjoy using?","type":"multiselect","options":["writing","coding","design","talking to people","numbers","fixing process"],"required":true},
            {"id":"work_energy","label":"What kind of work gives you energy?","type":"radio","options":["solo focus","team builds","client work","mixed"],"required":true},
            {"id":"red_flags","label":"Three things you do not want.","type":"long_text","required":true},
            {"id":"values","label":"Pick 3 values that matter most.","type":"multiselect","options":["growth","freedom","stability","impact","status","creativity"],"required":true},
            {"id":"day_shape","label":"Pick your best daily shape.","type":"radio","options":["few big tasks","many small tasks","meet people","move around"],"required":true},
            {"id":"tiny_tests","label":"Write 2 tiny tests you can run.","type":"long_text","required":true},
            {"id":"portfolio_slot","label":"Set a weekly 60‑min slot for portfolio.","type":"time_window","required":true},
            {"id":"mentor_ping","label":"Who will you ask for a quick call?","type":"short_text","required":true},
            {"id":"decision_rule","label":"How will you decide after 30 days?","type":"short_text","required":true}
          ]
        },
        {
          "id": "creative-compass",
          "label": "Creative Compass",
          "description": "Pick a craft. Make and share weekly.",
          "questions": [
            {"id":"medium","label":"What will you make?","type":"radio","options":["writing","video","music","drawing","coding project"],"required":true},
            {"id":"theme","label":"What is your theme this month?","type":"short_text","required":true},
            {"id":"time_budget","label":"How many hours per week?","type":"slider","min":2,"max":10,"required":true},
            {"id":"studio_slot","label":"Pick your daily 30‑min slot.","type":"time_window","required":true},
            {"id":"inspo","label":"3 sources of inspiration.","type":"long_text","required":true},
            {"id":"share_place","label":"Where will you share?","type":"radio","options":["Instagram","YouTube","blog","newsletter","friend group"],"required":true},
            {"id":"collab","label":"Name one person to swap feedback.","type":"short_text","required":true},
            {"id":"blocker","label":"Your biggest creative blocker now?","type":"short_text","required":true},
            {"id":"proof","label":"What will count as a weekly output?","type":"short_text","required":true},
            {"id":"mini_show","label":"Pick a 30‑day mini‑show date.","type":"short_text","help":"Write date.","required":true}
          ]
        }
      ]
    },
    {
      "id": "learning",
      "label": "Learning & Habits",
      "subpacks": [
        {
          "id": "habit-builder-101",
          "label": "Habit Builder 101",
          "description": "Start tiny. Win daily.",
          "questions": [
            {"id":"tiny_habit","label":"What tiny habit will you build?","type":"short_text","required":true},
            {"id":"anchor","label":"What daily action will it follow?","type":"radio","options":["wake","coffee","lunch","commute","brush"],"required":true},
            {"id":"streak_target","label":"How many days this month?","type":"slider","min":10,"max":30,"required":true},
            {"id":"visual_mark","label":"Where will you mark your streak?","type":"radio","options":["calendar","app","jar of paperclips"],"required":true},
            {"id":"two_min_version","label":"Your 2‑minute version for busy days.","type":"short_text","required":true},
            {"id":"bundle","label":"What treat will you pair with it?","type":"short_text","required":true},
            {"id":"friction_remove","label":"What friction will you remove?","type":"short_text","required":true},
            {"id":"witness","label":"Who will see your streak?","type":"short_text","required":true},
            {"id":"slip_rule","label":"What happens after you miss a day?","type":"short_text","required":true},
            {"id":"installed_proof","label":"What proof shows the habit is installed?","type":"short_text","required":true}
          ]
        },
        {
          "id": "new-skill-30-days",
          "label": "New Skill in 30 Days",
          "description": "Learn one skill with a small project.",
          "questions": [
            {"id":"skill","label":"What skill will you learn?","type":"short_text","required":true},
            {"id":"why_now","label":"Why do you want this now?","type":"short_text","required":true},
            {"id":"resources","label":"Pick 2 main learning resources.","type":"multiselect","options":["course","book","YouTube list","mentor","practice repo"],"required":true},
            {"id":"daily_slot","label":"Pick a daily 45‑min slot.","type":"time_window","required":true},
            {"id":"project","label":"Name a tiny project for day 30.","type":"short_text","required":true},
            {"id":"checkpoint_days","label":"Pick two checkpoint days.","type":"multiselect","options":["day 7","day 14","day 21","day 28"],"required":true},
            {"id":"practice_ratio","label":"How will you split learn vs do?","type":"radio","options":["30/70","50/50","70/30"],"required":true},
            {"id":"share_demo","label":"Where will you demo it?","type":"radio","options":["friend","community","online post"],"required":true},
            {"id":"blocker_now","label":"Biggest blocker you expect?","type":"short_text","required":true},
            {"id":"proof_skill","label":"What proves you learned it?","type":"short_text","required":true}
          ]
        },
        {
          "id": "screen-time-reset",
          "label": "Screen Time Reset",
          "description": "Less doom scroll. More life.",
          "questions": [
            {"id":"top_apps","label":"Which apps eat your time most?","type":"multiselect","options":["Instagram","YouTube","Twitter/X","reels/shorts","games","news"],"required":true},
            {"id":"daily_limit","label":"Pick a daily screen‑time limit (mins).","type":"slider","min":30,"max":240,"required":true},
            {"id":"bed_park","label":"Where will your phone sleep at night?","type":"radio","options":["another room","desk","kitchen","by bed (not ideal)"],"required":true},
            {"id":"cut_window","label":"Pick a no‑phone time window daily.","type":"time_window","required":true},
            {"id":"trigger_time","label":"When do you over‑scroll most?","type":"radio","options":["late night","after work","on commute","random"],"required":true},
            {"id":"kept_apps","label":"Which apps must stay for work/family?","type":"long_text","required":true},
            {"id":"swap_activity","label":"What will you do instead?","type":"multiselect","options":["walk","read","cook","call a friend","learn skill"],"required":true},
            {"id":"nudges","label":"Pick 2 nudges.","type":"multiselect","options":["grayscale phone","remove social from home screen","turn off badges","time limits"],"required":true},
            {"id":"buddy","label":"Who will check your weekly time report?","type":"short_text","required":true},
            {"id":"success_look","label":"How will life look with less screen?","type":"short_text","required":true}
          ]
        }
      ]
    }
  ]
};