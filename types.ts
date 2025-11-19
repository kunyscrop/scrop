export enum UserRole {
  Student = 'Student',
  Professor = 'Professor',
  University = 'University',
}

export interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  dateOfBirth: string; // YYYY-MM-DD format
  avatarUrl: string;
  bannerUrl?: string;
  role: UserRole;
  bio?: string;
  followers: number;
  following: number;
}

export interface ChatContact {
  id: string;
  user: User;
  online: boolean;
  lastMessage?: string;
  lastMessageTimestamp?: string;
}

export interface ChatMessage {
  id:string;
  text: string;
  sender: 'me' | string; // 'me' or user.id
  timestamp: string;
  imageUrl?: string;
  file?: {
    name: string;
    url: string; // Mock URL
    size: string; // e.g., "1.2 MB"
  };
}

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  replies?: Post[];
}

export type Page = 'home' | 'messages' | 'search' | 'profile';

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  viewed: boolean;
}