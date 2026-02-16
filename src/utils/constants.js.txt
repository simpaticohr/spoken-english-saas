export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://spoken-english-api.your-subdomain.workers.dev';

export const LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

export const LESSON_CATEGORIES = [
  { id: 'pronunciation', name: 'Pronunciation', icon: '🗣️', color: 'blue' },
  { id: 'conversation', name: 'Conversation', icon: '💬', color: 'green' },
  { id: 'vocabulary', name: 'Vocabulary', icon: '📚', color: 'purple' },
  { id: 'grammar', name: 'Grammar in Speech', icon: '✍️', color: 'orange' },
  { id: 'fluency', name: 'Fluency Drills', icon: '⚡', color: 'red' },
  { id: 'listening', name: 'Listening Skills', icon: '👂', color: 'teal' },
  { id: 'idioms', name: 'Idioms & Phrases', icon: '🎯', color: 'pink' },
  { id: 'business', name: 'Business English', icon: '💼', color: 'indigo' },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    features: [
      '5 lessons per month',
      'Basic pronunciation check',
      'Limited vocabulary practice',
      'Community forum access',
    ],
    limitations: ['No AI conversation practice', 'No detailed analytics', 'No certificates'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: 'month',
    features: [
      'Unlimited lessons',
      'Advanced AI pronunciation analysis',
      'AI conversation partner',
      'Detailed progress analytics',
      'Personalized learning path',
      'Fluency score tracking',
      'Email support',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    period: 'month',
    features: [
      'Everything in Pro',
      'Live tutor sessions (4/month)',
      'Custom lesson plans',
      'Priority support',
      'Certificates of completion',
      'Interview preparation',
      'Accent reduction program',
      'Group practice rooms',
    ],
  },
];

export const SPEECH_TOPICS = {
  beginner: [
    'Introduce yourself',
    'Describe your daily routine',
    'Talk about your family',
    'Order food at a restaurant',
    'Ask for directions',
    'Describe the weather',
    'Talk about your hobbies',
    'Shopping at a store',
  ],
  intermediate: [
    'Discuss your career goals',
    'Explain a process step by step',
    'Give your opinion on a current event',
    'Describe your favorite travel experience',
    'Talk about technology in daily life',
    'Discuss health and wellness',
    'Explain a recipe',
    'Describe a memorable experience',
  ],
  advanced: [
    'Debate the pros and cons of remote work',
    'Discuss the impact of AI on society',
    'Analyze a business case study',
    'Present a project proposal',
    'Discuss philosophical ideas',
    'Negotiate a business deal',
    'Lead a team meeting',
    'Give a persuasive speech',
  ],
};