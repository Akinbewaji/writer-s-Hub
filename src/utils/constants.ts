// App Configuration
export const APP_CONFIG = {
  name: 'Writers Hub',
  description: 'Where Stories Come to Life',
  version: '1.0.0',
  author: 'Writers Hub Team',
  url: process.env.NODE_ENV === 'production' 
    ? 'https://writers-hub.vercel.app' 
    : 'http://localhost:3000',
};

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.writers-hub.com' 
    : 'http://localhost:3001',
  timeout: 10000,
  retries: 3,
};

// Storage Keys
export const STORAGE_KEYS = {
  user: 'writers-hub-user',
  theme: 'writers-hub-theme',
  preferences: 'writers-hub-preferences',
  drafts: 'writers-hub-drafts',
} as const;

// Route Paths
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  writerHome: '/writer-home',
  profile: '/profile',
  posts: '/posts',
  writers: '/writers',
  analytics: '/analytics',
  notifications: '/notifications',
  bookmarks: '/bookmarks',
  readingList: '/reading-list',
  newPost: '/posts/new',
  managePost: '/posts/manage',
} as const;

// User Roles
export const USER_ROLES = {
  writer: 'writer',
  reader: 'reader',
} as const;

// Post Status
export const POST_STATUS = {
  draft: 'draft',
  published: 'published',
} as const;

// Categories
export const CATEGORIES = [
  'General',
  'Technology',
  'Lifestyle',
  'Travel',
  'Food',
  'Health',
  'Business',
  'Education',
  'Entertainment',
  'Sports',
  'Science',
  'Art',
  'Writing',
  'Design',
] as const;

// Reading List Status
export const READING_STATUS = {
  toRead: 'to-read',
  reading: 'reading',
  completed: 'completed',
} as const;

// Priority Levels
export const PRIORITY_LEVELS = {
  low: 'low',
  medium: 'medium',
  high: 'high',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  like: 'like',
  comment: 'comment',
  follow: 'follow',
  post: 'post',
  mention: 'mention',
  system: 'system',
} as const;

// Pagination
export const PAGINATION = {
  defaultLimit: 10,
  maxLimit: 100,
} as const;

// Validation Rules
export const VALIDATION = {
  minPasswordLength: 8,
  maxBioLength: 500,
  maxTitleLength: 200,
  maxExcerptLength: 300,
  minReadTime: 1,
  maxReadTime: 60,
} as const;

// Feature Flags
export const FEATURES = {
  enableComments: true,
  enableBookmarks: true,
  enableFollowing: true,
  enableNotifications: true,
  enableAnalytics: true,
  enableReadingList: true,
} as const;