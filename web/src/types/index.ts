export interface GlobalSettings {
  siteTitle: string;
  logoText: string;
  theme: string;
  description: string;
}

export interface BasicInfo {
  name: string;
  age: number;
  location: string;
  education: string;
  personality: string;
}

export interface TimelineItem {
  id: string;
  category: string;
  time: string;
  event: string;
  result: string;
  emoji: string;
}

export interface ProfileContent {
  basicInfo: BasicInfo;
  role: string;
  abilityTags: string[];
  timeline: TimelineItem[];
  valueSentence: string;
}

export interface ProjectTimelineItem {
  date: string;
  event: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  status: string;
  progress: number;
  description: string;
  highlights: string[];
  timeline: ProjectTimelineItem[];
  images: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  cover: string;
  summary: string;
  content?: string;
  publishDate: string;
  isSticky: boolean;
  category: string;
}

export interface BlogContent {
  title: string;
  description: string;
  categories: string[];
  articles: BlogArticle[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactContent {
  email: string;
  wechat: string;
  phone: string;
  socialLinks: SocialLink[];
  autoReplyMessage: string;
  formTypes: string[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SiteData {
  global: GlobalSettings;
  profile: ProfileContent;
  projects: ProjectItem[];
  blog: BlogContent;
  contact: ContactContent;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
