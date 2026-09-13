import type { GrokCreation } from '../types'

export const mockCreations: GrokCreation[] = [
  {
    id: '1',
    author: {
      displayName: 'سارة المطيري',
      handle: 'sara_builds',
      avatarGradient: 'linear-gradient(135deg, #1d9bf0, #7856ff)',
      verified: true,
    },
    timestamp: '٢ س',
    caption: 'بنيت هذا الموقع خلال دقائق مع Grok Build ✨',
    type: 'website',
    title: 'معرض الفن الرقمي',
    description:
      'موقع أنيق لعرض الأعمال الفنية مع معرض تفاعلي ووضع ليلي كامل.',
    slug: 'digital-art-gallery',
    coverGradient:
      'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    engagement: {
      replies: 42,
      reposts: 128,
      likes: 1840,
      views: 24500,
      bookmarks: 310,
    },
  },
  {
    id: '2',
    author: {
      displayName: 'Alex Chen',
      handle: 'alexbuilds',
      avatarGradient: 'linear-gradient(135deg, #f91880, #ff7a00)',
      verified: true,
    },
    timestamp: '5h',
    caption: 'Shipped a tiny focus timer with Grok — dark mode only 🖤',
    type: 'app',
    title: 'Focus Pulse',
    description:
      'Minimal Pomodoro timer with ambient soundscapes and streak tracking.',
    slug: 'focus-pulse',
    coverGradient:
      'linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 100%)',
    engagement: {
      replies: 67,
      reposts: 203,
      likes: 3210,
      views: 48200,
      bookmarks: 890,
    },
  },
  {
    id: '3',
    author: {
      displayName: 'نورة القحطاني',
      handle: 'noura_dev',
      avatarGradient: 'linear-gradient(135deg, #00ba7c, #1d9bf0)',
      verified: false,
    },
    timestamp: '٨ س',
    caption: 'لعبة أركيد سريعة — هل تكسر رقمي؟ 🎮',
    type: 'game',
    title: 'سماء النيون',
    description:
      'لعبة إطلاق نار ثنائية الأبعاد بأسلوب الريترو مع مستويات لا نهائية.',
    slug: 'neon-sky',
    coverGradient:
      'linear-gradient(145deg, #ff006e 0%, #8338ec 45%, #3a86ff 100%)',
    engagement: {
      replies: 156,
      reposts: 412,
      likes: 5670,
      views: 92100,
      bookmarks: 1200,
    },
    hasPlay: true,
  },
  {
    id: '4',
    author: {
      displayName: 'Maya Okonkwo',
      handle: 'maya_creates',
      avatarGradient: 'linear-gradient(135deg, #ffd60a, #ff006e)',
      verified: true,
    },
    timestamp: '12h',
    caption: 'Mood board for our next product sprint 🖼️',
    type: 'board',
    title: 'Aurora Brand Board',
    description:
      'Collaborative visual board with color palettes, type samples, and refs.',
    slug: 'aurora-brand-board',
    coverGradient:
      'linear-gradient(120deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    engagement: {
      replies: 29,
      reposts: 88,
      likes: 976,
      views: 15300,
      bookmarks: 445,
    },
  },
  {
    id: '5',
    author: {
      displayName: 'خالد العتيبي',
      handle: 'khalid_x',
      avatarGradient: 'linear-gradient(135deg, #7856ff, #00ba7c)',
      verified: false,
    },
    timestamp: '١ ي',
    caption: 'تطبيق لحساب الميزانية بالعربية — جربوه وشاركوني رأيكم 💰',
    type: 'app',
    title: 'ميزانيتي',
    description:
      'تطبيق بسيط لتتبع المصروفات والادخار مع رسوم بيانية واضحة.',
    slug: 'meezaniti',
    coverGradient:
      'linear-gradient(150deg, #134e4a 0%, #0f766e 40%, #14b8a6 100%)',
    engagement: {
      replies: 91,
      reposts: 175,
      likes: 2340,
      views: 36700,
      bookmarks: 620,
    },
  },
  {
    id: '6',
    author: {
      displayName: 'Jordan Lee',
      handle: 'jlee_games',
      avatarGradient: 'linear-gradient(135deg, #3a86ff, #ffbe0b)',
      verified: true,
    },
    timestamp: '1d',
    caption: 'One-tap endless runner. How far can you go?',
    type: 'game',
    title: 'Pixel Dash',
    description:
      'Side-scrolling endless runner with power-ups and global leaderboards.',
    slug: 'pixel-dash',
    coverGradient:
      'linear-gradient(160deg, #1a0533 0%, #4c1d95 50%, #7c3aed 100%)',
    engagement: {
      replies: 210,
      reposts: 540,
      likes: 8120,
      views: 156000,
      bookmarks: 2100,
    },
    hasPlay: true,
  },
]
