import { create } from 'zustand';

// --- Type Definitions based on siteData.json ---

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

export interface ProjectHighlight {
  id?: string;
  text: string;
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

export interface SiteData {
  global: GlobalSettings;
  profile: ProfileContent;
  projects: ProjectItem[];
  blog: BlogContent;
  contact: ContactContent;
}

export interface ContentState extends SiteData {
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchData: () => Promise<void>;
  saveData: () => Promise<void>;
  
  // Updaters (for Admin UI)
  updateGlobal: (data: Partial<GlobalSettings>) => void;
  updateProfile: (data: Partial<ProfileContent>) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateBlog: (data: Partial<BlogContent>) => void;
  updateContact: (data: Partial<ContactContent>) => void;
}

// --- Initial Empty State ---
const initialSiteData: SiteData = {
  global: {
    siteTitle: 'Loading...',
    logoText: 'Loading...',
    theme: 'doodle',
    description: '',
  },
  profile: {
    basicInfo: {
      name: '',
      age: 0,
      location: '',
      education: '',
      personality: '',
    },
    role: '',
    abilityTags: [],
    timeline: [],
    valueSentence: '',
  },
  projects: [],
  blog: {
    title: '',
    description: '',
    categories: [],
    articles: [],
  },
  contact: {
    email: '',
    wechat: '',
    phone: '',
    socialLinks: [],
    autoReplyMessage: '',
    formTypes: [],
  },
};

export const useContentStore = create<ContentState>((set, get) => ({
  ...initialSiteData,
  isLoading: true,
  error: null,

  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch('/api/site-data');
      if (!response.ok) throw new Error('Failed to fetch site data');
      const data: SiteData = await response.json();
      set({ ...data, isLoading: false });
    } catch (error) {
      console.error('Error fetching site data:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  saveData: async () => {
    try {
      const { global, profile, projects, blog, contact } = get();
      const payload: SiteData = { global, profile, projects, blog, contact };
      
      const response = await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error('Failed to save site data');
    } catch (error) {
      console.error('Error saving site data:', error);
      throw error;
    }
  },

  updateGlobal: (data) => set((state) => ({ global: { ...state.global, ...data } })),
  updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),
  updateProjects: (projects) => set({ projects }),
  updateBlog: (data) => set((state) => ({ blog: { ...state.blog, ...data } })),
  updateContact: (data) => set((state) => ({ contact: { ...state.contact, ...data } })),
}));
