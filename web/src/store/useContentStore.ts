import { create } from 'zustand';
// import { persist } from 'zustand/middleware'; // Removed persist as we are using API/JSON now

// --- Type Definitions based on siteData.json ---

export interface GlobalSettings {
  siteTitle: string;
  logoText: string;
  isFlowTextEnabled: boolean;
  contactEmail: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface HomeContent {
  slogan: string;
  dynamicUpdate: string;
  coverImage: string;
  socialLinks: SocialLink[];
}

export interface TimelineItem {
  id: string; // Added ID for keying
  category: string;
  time: string;
  event: string;
  result: string;
  isSticky: boolean;
}

export interface AboutMeContent {
  location?: string;
  role?: string;
  expertOn?: string;
  abilityTags: string[];
  timeline: TimelineItem[];
  valueSentence: string;
}

export interface ProjectModule {
  title: string;
  content: string;
  images: string[];
}

export interface FuturePlanItem {
  id: string;
  date: string;
  title: string;
}

export interface ProjectTimelineItem {
  id: string;
  title: string;
  date: string;
  content: string;
  images?: string[];
  type?: 'brand' | 'module';
}

export interface ProjectProgressContent {
  brandName: string;
  brandSlogan: string;
  coreBusiness: ProjectModule; // Keeping for safety during migration
  futurePlan: FuturePlanItem[]; // Keeping for safety during migration
  timeline: ProjectTimelineItem[];
}

export interface ArticleItem {
  id: string; // Added ID
  title: string;
  cover: string;
  summary: string;
  publishDate: string;
  views: number;
  isSticky: boolean;
  category: string; // Made required
}

export interface EntrepreneurshipContent {
  title: string;
  description: string;
  categories: string[];
  articles: ArticleItem[];
}

export interface GrowthNotesContent {
  categories: string[];
  articles: ArticleItem[];
  reviewSection: any[]; // Placeholder
}

export interface ContactSettings {
  autoReplyMessage: string;
  formTypes: string[];
}

export interface SiteData {
  global: GlobalSettings;
  home: HomeContent;
  aboutMe: AboutMeContent;
  projectProgress: ProjectProgressContent;
  entrepreneurship: EntrepreneurshipContent;
  growthNotes: GrowthNotesContent;
  contact: ContactSettings;
}

export interface ContentState extends SiteData {
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchData: () => Promise<void>;
  saveData: () => Promise<void>;
  
  // Updaters (for Admin UI)
  updateGlobal: (data: Partial<GlobalSettings>) => void;
  updateHome: (data: Partial<HomeContent>) => void;
  updateAboutMe: (data: Partial<AboutMeContent>) => void;
  updateProjectProgress: (data: Partial<ProjectProgressContent>) => void;
  updateEntrepreneurship: (data: Partial<EntrepreneurshipContent>) => void;
  updateGrowthNotes: (data: Partial<GrowthNotesContent>) => void;
  updateContact: (data: Partial<ContactSettings>) => void;
}

// --- Initial Empty State ---
const initialSiteData: SiteData = {
  global: {
    siteTitle: 'Loading...',
    logoText: 'Loading...',
    isFlowTextEnabled: true,
    contactEmail: '',
  },
  home: {
    slogan: '',
    dynamicUpdate: '',
    coverImage: '',
    socialLinks: [],
  },
  aboutMe: {
    location: '',
    role: '',
    expertOn: '',
    abilityTags: [],
    timeline: [],
    valueSentence: '',
  },
  projectProgress: {
    brandName: '',
    brandSlogan: '',
    coreBusiness: { title: '', content: '', images: [] },
    futurePlan: [],
    timeline: [],
  },
  entrepreneurship: {
    title: '',
    description: '',
    categories: [],
    articles: [],
  },
  growthNotes: {
    categories: [],
    articles: [],
    reviewSection: [],
  },
  contact: {
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
      const { global, home, aboutMe, projectProgress, entrepreneurship, growthNotes, contact } = get();
      const payload: SiteData = { global, home, aboutMe, projectProgress, entrepreneurship, growthNotes, contact };
      
      const response = await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error('Failed to save site data');
      // console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving site data:', error);
      // set({ error: (error as Error).message });
    }
  },

  updateGlobal: (data) => set((state) => ({ global: { ...state.global, ...data } })),
  updateHome: (data) => set((state) => ({ home: { ...state.home, ...data } })),
  updateAboutMe: (data) => set((state) => ({ aboutMe: { ...state.aboutMe, ...data } })),
  updateProjectProgress: (data) => set((state) => ({ projectProgress: { ...state.projectProgress, ...data } })),
  updateEntrepreneurship: (data) => set((state) => ({ entrepreneurship: { ...state.entrepreneurship, ...data } })),
  updateGrowthNotes: (data) => set((state) => ({ growthNotes: { ...state.growthNotes, ...data } })),
  updateContact: (data) => set((state) => ({ contact: { ...state.contact, ...data } })),
}));
