export const mockTestsData = [
  {
    id: 'oir-test-01',
    title: 'SSB OIR Practice Test #1 — Verbal & Non-Verbal Reasoning',
    category: 'OIR',
    stage: 'Stage 1 Screening',
    durationMinutes: 12,
    totalQuestions: 15,
    description: 'Actual board-pattern questions focusing on analogies, series completion, coding-decoding, and spatial dice orientation.',
    instructions: [
      'Each question carries 1 mark. There is no negative marking in the actual SSB OIR test.',
      'Speed and accuracy are equally vital. Do not get stuck on a single question; mark it for review and proceed.',
      'Aim for minimum 85% accuracy to secure OIR Rating 1.'
    ],
    questions: [
      {
        id: 1,
        question: 'Find the odd one out among the given defense designations:',
        options: ['Brigadier', 'Commodore', 'Air Commodore', 'Colonel'],
        correctAnswer: 3,
        explanation: 'Brigadier (Army), Commodore (Navy), and Air Commodore (Air Force) are equivalent One-Star Flag Officer ranks. Colonel is a lower rank.'
      },
      {
        id: 2,
        question: 'If "NAVAL" is coded as "OBWBM", how will "ARMY" be coded in the same language?',
        options: ['BSNZ', 'BSNA', 'BTMZ', 'CQNZ'],
        correctAnswer: 0,
        explanation: 'Each letter is shifted forward by +1 position in the alphabet: A->B, R->S, M->N, Y->Z.'
      },
      {
        id: 3,
        question: 'Complete the numerical series: 3, 7, 15, 31, 63, ?',
        options: ['95', '127', '126', '128'],
        correctAnswer: 1,
        explanation: 'Each term follows the rule (previous term * 2) + 1. So (63 * 2) + 1 = 127.'
      },
      {
        id: 4,
        question: 'In a standard dice, if the number 3 is on the bottom face, which number will be on the top face?',
        options: ['4', '5', '2', '6'],
        correctAnswer: 0,
        explanation: 'In a standard dice, the sum of opposite faces is always 7. Therefore, opposite of 3 is 7 - 3 = 4.'
      },
      {
        id: 5,
        question: 'A soldier marches 10 km North, turns right and marches 6 km, then turns right again and marches 10 km. How far and in which direction is he from his starting point?',
        options: ['6 km West', '6 km East', '10 km South', '16 km East'],
        correctAnswer: 1,
        explanation: 'The North and South 10 km cancel each other out, leaving him 6 km directly East of the starting point.'
      },
      {
        id: 6,
        question: 'Which word cannot be formed using the letters of the word "COMMISSIONED"?',
        options: ['MISSION', 'DECISION', 'COMMON', 'DEMON'],
        correctAnswer: 1,
        explanation: '"DECISION" contains only one M, but requires two Is and one C. However, "COMMISSIONED" lacks the letter required for "DECISION".'
      },
      {
        id: 7,
        question: 'Pointing to a photograph, Cadet Rahul said, "She is the only daughter of my father\'s mother." How is the woman related to Rahul?',
        options: ['Mother', 'Aunt (Bua)', 'Sister', 'Grandmother'],
        correctAnswer: 1,
        explanation: 'Father\'s mother is Rahul\'s grandmother. The only daughter of his grandmother is his father\'s sister, which is his Aunt (Bua).'
      },
      {
        id: 8,
        question: 'Find the missing number in the matrix: [ [2, 4, 8], [3, 9, 27], [4, 16, ?] ]',
        options: ['32', '48', '64', '72'],
        correctAnswer: 2,
        explanation: 'Each row is n, n^2, n^3. For 4: 4, 4^2 = 16, 4^3 = 64.'
      },
      {
        id: 9,
        question: 'Identify the word which is opposite in meaning to "VALOR":',
        options: ['Bravery', 'Cowardice', 'Chivalry', 'Gallantry'],
        correctAnswer: 1,
        explanation: 'Valor means courage or boldness in facing danger. Its direct antonym is Cowardice.'
      },
      {
        id: 10,
        question: 'If South-East becomes North, and North-East becomes West, what will West become?',
        options: ['South-East', 'North-East', 'South-West', 'North-West'],
        correctAnswer: 0,
        explanation: 'The directions are rotated 135 degrees anti-clockwise. West rotated 135 degrees anti-clockwise becomes South-East.'
      },
      {
        id: 11,
        question: 'Statements: All officers are leaders. Some leaders are mentors. Conclusion: Are some officers mentors?',
        options: ['Definitely True', 'Definitely False', 'Cannot be determined without additional premises', 'None of the above'],
        correctAnswer: 2,
        explanation: 'From "All officers are leaders" and "Some leaders are mentors", the relationship between officers and mentors is indeterminate.'
      },
      {
        id: 12,
        question: 'Count the total number of triangles in a standard square divided by both diagonals and a horizontal line through the center:',
        options: ['8', '10', '12', '16'],
        correctAnswer: 2,
        explanation: 'A square with both diagonals gives 8 triangles; adding the horizontal bisector adds 4 additional combined triangles, totaling 12.'
      },
      {
        id: 13,
        question: 'Clock Problem: What is the angle between the hour and minute hand at 3:30?',
        options: ['75 degrees', '80 degrees', '90 degrees', '70 degrees'],
        correctAnswer: 0,
        explanation: 'Angle = |30*H - (11/2)*M| = |30*3 - (11/2)*30| = |90 - 165| = 75 degrees.'
      },
      {
        id: 14,
        question: 'Find the missing letter in sequence: B, D, G, K, P, ?',
        options: ['U', 'V', 'W', 'T'],
        correctAnswer: 1,
        explanation: 'The differences between letter positions are: +2, +3, +4, +5, +6. P is 16; 16 + 6 = 22, which is V.'
      },
      {
        id: 15,
        question: 'Select the analogous pair: RADAR : DETECTION :: COMPASS : ?',
        options: ['Depth', 'Navigation', 'Velocity', 'Altitude'],
        correctAnswer: 1,
        explanation: 'A radar is an instrument used for detection; a compass is an instrument used for navigation.'
      }
    ]
  },
  {
    id: 'ppdt-sim-01',
    title: 'SSB PPDT (Picture Perception & Discussion) Simulator',
    category: 'PPDT',
    stage: 'Stage 1 Screening',
    durationMinutes: 5,
    totalQuestions: 1,
    type: 'simulation',
    description: 'Realistic Stage 1 test simulating 30 seconds of image viewing, 1 minute of box demographic marking, and 4 minutes of story drafting.',
    instructions: [
      'Step 1: Observe the stimulus image closely for 30 seconds (Notice background, characters, mood, and objects).',
      'Step 2: Box filling (Mark number of characters, Age, Gender, Mood M/F/P).',
      'Step 3: Draft an action-oriented story with a positive outcome within 4 minutes.'
    ],
    image: '/assets/mentor-DmqBwYyP.png',
    prompt: 'Two young individuals are standing near an outdoor obstacle bridge with blueprints in hand.',
    sampleGuidance: 'Identify who the hero is, what led to the bridge inspection, how they coordinated the team, and how the task was safely completed before deadline.'
  },
  {
    id: 'gat-defense-01',
    title: 'UPSC Defense General Ability (GAT) Quick Mock',
    category: 'GAT',
    stage: 'Written Examination',
    durationMinutes: 10,
    totalQuestions: 10,
    description: 'Covers Indian Armed Forces commands, defense equipment, Indian polity, and basic physics mechanics.',
    instructions: [
      'Standard UPSC GAT pattern with 4 marks for correct and -1.33 for wrong answer.',
      'Calculated to test speed on core static and military current affairs.'
    ],
    questions: [
      {
        id: 1,
        question: 'Where is the Southern Naval Command of the Indian Navy headquartered?',
        options: ['Mumbai', 'Kochi', 'Visakhapatnam', 'Port Blair'],
        correctAnswer: 1,
        explanation: 'Southern Naval Command is the training command of the Indian Navy and is headquartered in Kochi, Kerala.'
      },
      {
        id: 2,
        question: 'Which supersonic cruise missile is a joint venture between India and Russia?',
        options: ['Agni-V', 'BrahMos', 'Prithvi', 'Astra'],
        correctAnswer: 1,
        explanation: 'BrahMos is named after the Brahmaputra and Moskva rivers, jointly developed by DRDO and NPOM of Russia.'
      },
      {
        id: 3,
        question: 'Under the Indian Constitution, who is the Supreme Commander of the Indian Armed Forces?',
        options: ['Prime Minister of India', 'Chief of Defence Staff (CDS)', 'President of India', 'Defence Minister'],
        correctAnswer: 2,
        explanation: 'Article 53(2) vests the Supreme Command of the Defence Forces of the Union in the President of India.'
      },
      {
        id: 4,
        question: 'What is the working principle of a submarine ballast tank to submerge in sea water?',
        options: ['Bernoulli principle', 'Archimedes principle', 'Pascal law', 'Doppler effect'],
        correctAnswer: 1,
        explanation: 'Submarines use Archimedes\' principle of buoyancy by flooding ballast tanks with water to increase weight and density.'
      },
      {
        id: 5,
        question: 'Where is the National Defence Academy (NDA) located?',
        options: ['Dehradun', 'Khadakwasla (Pune)', 'Ezhimala', 'Dundigal'],
        correctAnswer: 1,
        explanation: 'NDA is located at Khadakwasla near Pune, Maharashtra, established as the world\'s first tri-service academy.'
      },
      {
        id: 6,
        question: 'What is the highest wartime gallantry decoration in the Indian Armed Forces?',
        options: ['Maha Vir Chakra', 'Param Vir Chakra', 'Ashoka Chakra', 'Kirti Chakra'],
        correctAnswer: 1,
        explanation: 'Param Vir Chakra (PVC) is India\'s highest wartime gallantry award. Ashoka Chakra is the highest peacetime equivalent.'
      },
      {
        id: 7,
        question: 'The SI unit of force is:',
        options: ['Joule', 'Watt', 'Newton', 'Pascal'],
        correctAnswer: 2,
        explanation: 'The SI unit of force is the Newton (N), equal to 1 kg·m/s².'
      },
      {
        id: 8,
        question: 'In which state is the Sabre Officers Defense Academy (SODA) campus located?',
        options: ['Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh (Gwalior)', 'Punjab'],
        correctAnswer: 2,
        explanation: 'SODA is located near Gole Ka Mandir in Gwalior, Madhya Pradesh.'
      },
      {
        id: 9,
        question: 'What is the approximate speed of sound in air at 20°C?',
        options: ['343 m/s', '300,000 km/s', '1500 m/s', '500 m/s'],
        correctAnswer: 0,
        explanation: 'The speed of sound in dry air at 20°C is approximately 343 meters per second.'
      },
      {
        id: 10,
        question: 'Which operation was carried out by the Indian Navy during the 1971 Indo-Pak war in Karachi harbor?',
        options: ['Operation Vijay', 'Operation Trident', 'Operation Safed Sagar', 'Operation Meghdoot'],
        correctAnswer: 1,
        explanation: 'Operation Trident on 4–5 December 1971 saw Indian Navy missile boats sink Pakistani vessels. December 4 is celebrated as Navy Day.'
      }
    ]
  }
];
