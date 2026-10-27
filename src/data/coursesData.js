export const coursesData = [
  {
    id: "nda",
    slug: "nda-coaching",
    title: "NDA Coaching",
    badge: {
      label: "Army / Navy / Air Force",
      type: "army",
    },
    targetStage: "10th-12th",
    stageLabel: "After 10th / 12th",
    eligibility: "Class 12th Appearing / Pass (16.5 – 19.5 Yrs)",
    focusArea: "Maths + GAT + Early OLQs",
    trainingMode: "Comprehensive Classroom + GTO Ground",
    duration: "6 Months / 1 Year Intensive",
    description: "Comprehensive preparation covering Mathematics, GAT, and early SSB foundation with daily military discipline and structured personality development.",
    highlights: [
      "Maths + GAT Mastery with Daily Practice Papers",
      "Early OLQ (Officer Like Qualities) Grooming",
      "Rigorous Weekly Mock Tests & Detailed Analysis",
      "Physical Training & Obstacle Course Familiarization"
    ],
    detailedOverview: "The National Defence Academy (NDA) entrance is the premier gateway for young boys and girls to become commissioned officers directly after school. SODA's NDA course blends rigorous academic teaching in Mathematics and General Ability Test (GAT) with character building, physical endurance, and foundational SSB psychology right from day one.",
    syllabus: [
      {
        section: "Mathematics (300 Marks)",
        topics: "Algebra, Matrices & Determinants, Trigonometry, Analytical Geometry (2D & 3D), Differential Calculus, Integral Calculus & Differential Equations, Vector Algebra, Statistics & Probability."
      },
      {
        section: "General Ability Test - Part A: English (200 Marks)",
        topics: "Grammar & Usage, Vocabulary (Synonyms & Antonyms), Reading Comprehension, Sentence Rearrangement, Spotting Errors, Cloze Test."
      },
      {
        section: "General Ability Test - Part B: General Knowledge (400 Marks)",
        topics: "Physics, Chemistry, General Science, Social Studies, Geography (Physical, Indian, World), Current National & International Events."
      },
      {
        section: "Services Selection Board (SSB - 900 Marks)",
        topics: "Stage 1 (OIR + PPDT), Stage 2 Psychological Tests (TAT, WAT, SRT, SDT), Outdoor GTO Tasks (PGT, HGT, Command Task), Personal Interview, and Conference."
      }
    ]
  },
  {
    id: "cds",
    slug: "cds-coaching",
    title: "CDS Coaching",
    badge: {
      label: "IMA / INA / AFA / OTA",
      type: "navy",
    },
    targetStage: "graduates",
    stageLabel: "Graduate Entries",
    eligibility: "Graduates / Final Year (19 – 25 Yrs)",
    focusArea: "GK + English + Elementary Maths",
    trainingMode: "Strategic Officer Track",
    duration: "4 Months / 6 Months",
    description: "Strategic written exam preparation for graduates aiming for commissioned officer entries across Indian Army, Navy, Air Force, and OTA.",
    highlights: [
      "In-depth English, GK & Elementary Maths Coverage",
      "Previous 10 Years Question Paper Trend Analysis",
      "Integrated 5-Day SSB Orientation from Day One",
      "Speed, Elimination Strategy & Negative Marking Control"
    ],
    detailedOverview: "The Combined Defence Services (CDS) examination conducted by UPSC demands analytical thinking, deep general awareness, and precision. Whether your ambition is the Indian Military Academy (IMA), Naval Academy (INA), Air Force Academy (AFA), or Officers Training Academy (OTA), SODA's curriculum trains you to clear high cutoffs and ace the interview.",
    syllabus: [
      {
        section: "English (100 Marks)",
        topics: "Sentence Completion, Spotting Errors, Comprehension, Ordering of Words/Sentences, Idioms & Phrases, Fill in the Blanks."
      },
      {
        section: "General Knowledge (100 Marks)",
        topics: "Indian Polity & Constitution, Modern & Ancient Indian History, Physical & Economic Geography, General Science, Defence Updates, Current Affairs."
      },
      {
        section: "Elementary Mathematics (100 Marks - For IMA, INA, AFA)",
        topics: "Number System, Elementary Number Theory, Algebra, Trigonometry, Geometry, Mensuration (2D & 3D), Statistics & Data Interpretation."
      },
      {
        section: "SSB Interview Integration",
        topics: "Comprehensive 5-day assessment grooming with screening drills, psychology dossier writing, and officer interaction."
      }
    ]
  },
  {
    id: "afcat",
    slug: "afcat-coaching",
    title: "AFCAT Coaching",
    badge: {
      label: "Indian Air Force",
      type: "airforce",
    },
    targetStage: "graduates",
    stageLabel: "Graduate Entries",
    eligibility: "Graduates with 60%+ (20 – 24 / 26 Yrs)",
    focusArea: "Speed + Reasoning + Air Force Aptitude",
    trainingMode: "Computer-Based Test Drills",
    duration: "3 Months / Fast-Track Crash Course",
    description: "Balanced, high-scoring approach across numerical ability, reasoning, verbal aptitude, and military aviation awareness for Flying, Technical, and Ground Duty branches.",
    highlights: [
      "Speed & Accuracy Timed Computer Lab Drills",
      "AFSB (Air Force Selection Board) Mentorship",
      "Aviation & Military GK Special Modules",
      "Daily Practice Sets & Sectional Mock Exams"
    ],
    detailedOverview: "Air Force Common Admission Test (AFCAT) selects elite officers for the Flying and Ground Duty (Technical and Non-Technical) branches of the Indian Air Force. With intense competition, clearing AFCAT requires rapid problem-solving, strong spatial reasoning, and high general awareness.",
    syllabus: [
      {
        section: "General Awareness (20 Questions)",
        topics: "History, Geography, Sports, National & International Politics, Defence & Security Affairs, Environment, Basic Science, Art & Culture."
      },
      {
        section: "Verbal Ability in English (30 Questions)",
        topics: "Comprehension, Error Detection, Sentence Completion, Synonyms & Antonyms, Idioms & Phrases, Analogy."
      },
      {
        section: "Numerical Ability (20 Questions)",
        topics: "Decimal Fraction, Time and Work, Average/Percentage, Profit & Loss, Ratio & Proportion, Simple & Compound Interest, Time & Distance."
      },
      {
        section: "Reasoning and Military Aptitude (30 Questions)",
        topics: "Verbal Skills and Spatial Ability, Pattern Completion, Figure Matrix, Odd One Out, Series Completion."
      }
    ]
  },
  {
    id: "capf",
    slug: "capf-coaching",
    title: "CAPF (AC) Coaching",
    badge: {
      label: "Assistant Commandant",
      type: "army",
    },
    targetStage: "graduates",
    stageLabel: "Graduate Entries",
    eligibility: "Graduates (20 – 25 Yrs, Relaxation for Reserved)",
    focusArea: "Paper-I Objective + Paper-II Essay Writing",
    trainingMode: "UPSC Standard Evaluation",
    duration: "6 Months Comprehensive Track",
    description: "Dedicated Paper-I (Objective) and Paper-II (Descriptive Essay/Comprehension) training along with physical efficiency guidance and interview readiness for BSF, CRPF, CISF, ITBP, and SSB.",
    highlights: [
      "Paper 1 + Paper 2 Descriptive Answer Writing Evaluation",
      "Paramilitary Command & Security Scenario Analysis",
      "Physical Efficiency Test (PET) Protocol Preparation",
      "UPSC Personality Test & Mock Interview Board"
    ],
    detailedOverview: "The Central Armed Police Forces (Assistant Commandant) exam conducted by UPSC is one of the most respected entries leading directly to Class-A Gazetted Officer rank. Success requires command over both objective GS and descriptive analytical writing (essays, reports, counter-arguments) followed by rigorous physical standards.",
    syllabus: [
      {
        section: "Paper I: General Ability & Intelligence (250 Marks - Objective)",
        topics: "General Mental Ability, General Science, National and International Events, Indian Polity and Economy, History of India, World and Indian Geography."
      },
      {
        section: "Paper II: General Studies, Essay & Comprehension (200 Marks - Descriptive)",
        topics: "Essay writing on modern security issues, polity, economics (80 Marks in English/Hindi); Comprehension, Précis writing, Report writing, Counter-arguments, and English Grammar (120 Marks in English only)."
      },
      {
        section: "Physical Efficiency Tests (PET) & Medical",
        topics: "100m sprint, 800m run, Long jump, Shot put conditioning for males and females."
      },
      {
        section: "Personality Test / Interview (150 Marks)",
        topics: "One-on-one board interview focusing on national security, internal conflict management, and personal integrity."
      }
    ]
  },
  {
    id: "ssb",
    slug: "ssb-interview-training",
    title: "SSB Interview Program",
    badge: {
      label: "Flagship Mentorship",
      type: "ssb",
    },
    targetStage: "ssb",
    stageLabel: "SSB Interview Prep",
    eligibility: "NDA / CDS / AFCAT Qualified & Direct Entries",
    focusArea: "15 Officer Like Qualities (OLQs)",
    trainingMode: "1-on-1 Mentorship + Full GTO Ground",
    duration: "14-Day Intensive / 21-Day Complete Batch",
    description: "Practical guidance, psychology dossier evaluation, outdoor GTO ground tasks, and personal interview mentorship directly under former Indian Navy Officer Lt. Arjit Mohan Bharadwaj.",
    highlights: [
      "Authentic TAT, WAT, SRT, SDT Psychology Dossier Review",
      "Complete Outdoor GTO Tasks (PGT, HGT, Command Task)",
      "1-on-1 Officer Mock Interviews with Video Feedback",
      "Zero Rote-Memorization—Focus on Natural Personality"
    ],
    detailedOverview: "The 5-Day Services Selection Board (SSB) does not test how well you can memorize standard answers—it probes your authentic character, natural leadership, stress-bearing capability, and Officer Like Qualities (OLQs). At SODA, every candidate's dossier is personally reviewed and shaped without destroying their genuine persona.",
    syllabus: [
      {
        section: "Stage 1: Screening Tests (Day 1)",
        topics: "Officer Intelligence Rating (OIR - Verbal & Non-Verbal Drills), Picture Perception & Discussion Test (PPDT), Individual Narration, and Group Discussion dynamics."
      },
      {
        section: "Stage 2: Psychological Battery (Day 2)",
        topics: "Thematic Apperception Test (TAT - 11 slides + 1 blank), Word Association Test (WAT - 60 words), Situation Reaction Test (SRT - 60 situations), and Self Description Test (SDT) with personal dossier grading."
      },
      {
        section: "Stage 3: Group Testing Officer (GTO) Tasks (Day 3 & 4)",
        topics: "Group Discussion (GD), Group Planning Exercise (GPE), Progressive Group Task (PGT), Half Group Task (HGT), Individual Obstacles (IO), Command Task (CT), Snake Race / Group Obstacle Race, and Final Group Task (FGT)."
      },
      {
        section: "Stage 4: Personal Interview & Board Conference (Day 4 & 5)",
        topics: "In-depth Personal Information Questionnaire (PIQ) dissection, current affairs cross-examination, stress response handling, officer bearing, and closing conference decorum."
      }
    ]
  },
  {
    id: "foundation",
    slug: "foundation-course",
    title: "Foundation Course (11th & 12th)",
    badge: {
      label: "Early Starter",
      type: "ssb",
    },
    targetStage: "10th-12th",
    stageLabel: "After 10th / 12th",
    eligibility: "Class 10th Pass / Entering 11th & 12th",
    focusArea: "Board Exams + NDA Foundation + Fitness",
    trainingMode: "2-Year Integrated Schooling & Academy",
    duration: "2-Year Integrated Program",
    description: "Building an unshakable academic, physical, and disciplinary base alongside regular CBSE/State Board school studies before formal NDA exam attempts.",
    highlights: [
      "Board Syllabus + NDA Mathematics & Science Alignment",
      "Daily Morning PT, Drill & Physical Fitness Habits",
      "Spoken English, Communication & Debating Confidence",
      "Early Defense Career Awareness & Officer Mindset"
    ],
    detailedOverview: "The biggest hurdle for high school defense aspirants is balancing board exam scores with the competitive NDA syllabus. SODA's Foundation program bridges this gap by reinforcing school science and maths while instilling time management, physical endurance, and public speaking early in life.",
    syllabus: [
      {
        section: "Academic Integration (Physics, Chemistry, Maths)",
        topics: "Complete coverage of Class 11th and 12th NCERT syllabus with dual focus: high board exam percentages + shortcut methods for NDA objective questions."
      },
      {
        section: "General Ability & Humanities Foundation",
        topics: "World and Indian Geography, Indian Polity, Freedom Struggle, and daily newspaper reading habits for contemporary current events."
      },
      {
        section: "Personality, Spoken English & Group Dynamics",
        topics: "Overcoming stage fear, extempore speeches, group discussion etiquette, military decorum, and positive self-image building."
      },
      {
        section: "Physical Conditioning & Obstacle Readiness",
        topics: "Running stamina, pull-ups, push-ups, mental toughness drills, and basic outdoor obstacle navigation."
      }
    ]
  }
];
