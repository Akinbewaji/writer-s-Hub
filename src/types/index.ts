export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate: string;
  followers: number;
  following: number;
  isFollowing?: boolean;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  category: string;
  tags: string[];
  publishDate: string | null;
  status: 'draft' | 'published';
  likes: number;
  comments: number;
  views: number;
  readTime: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  image?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  storyId: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: User;
  category: string;
  replies: number;
  likes: number;
  lastActivity: string;
  isLiked?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  participants: number;
  type: 'Challenge' | 'Workshop' | 'Event';
  isJoined?: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  isJoined?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  unlocked: boolean;
}

export interface Activity {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'publish' | 'join';
  user: User;
  story?: Story;
  group?: Group;
  time: string;
  description: string;
}