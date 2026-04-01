import { z } from 'zod';

export const globalSettingsSchema = z.object({
  siteTitle: z.string().min(1, 'Site title is required'),
  logoText: z.string().min(1, 'Logo text is required'),
  theme: z.string().default('doodle'),
  description: z.string().optional(),
});

export const basicInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0).max(150),
  location: z.string().min(1, 'Location is required'),
  education: z.string().min(1, 'Education is required'),
  personality: z.string().optional(),
});

export const timelineItemSchema = z.object({
  id: z.string(),
  category: z.string(),
  time: z.string(),
  event: z.string(),
  result: z.string(),
  emoji: z.string().optional(),
});

export const profileContentSchema = z.object({
  basicInfo: basicInfoSchema,
  role: z.string().min(1, 'Role is required'),
  abilityTags: z.array(z.string()),
  timeline: z.array(timelineItemSchema),
  valueSentence: z.string().optional(),
});

export const projectTimelineItemSchema = z.object({
  date: z.string(),
  event: z.string(),
});

export const projectItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  category: z.string(),
  status: z.string(),
  progress: z.number().min(0).max(100),
  description: z.string(),
  highlights: z.array(z.string()),
  timeline: z.array(projectTimelineItemSchema),
  images: z.array(z.string()),
});

export const blogArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  cover: z.string().optional(),
  summary: z.string(),
  content: z.string().optional(),
  publishDate: z.string(),
  isSticky: z.boolean().default(false),
  category: z.string(),
});

export const blogContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  articles: z.array(blogArticleSchema),
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL'),
  icon: z.string().optional(),
});

export const contactContentSchema = z.object({
  email: z.string().email('Invalid email'),
  wechat: z.string().optional(),
  phone: z.string().optional(),
  socialLinks: z.array(socialLinkSchema),
  autoReplyMessage: z.string().optional(),
  formTypes: z.array(z.string()),
});

export const messageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  createdAt: z.string(),
  isRead: z.boolean().default(false),
});

export const siteDataSchema = z.object({
  global: globalSettingsSchema,
  profile: profileContentSchema,
  projects: z.array(projectItemSchema),
  blog: blogContentSchema,
  contact: contactContentSchema,
});

export const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type GlobalSettingsInput = z.infer<typeof globalSettingsSchema>;
export type BasicInfoInput = z.infer<typeof basicInfoSchema>;
export type ProfileContentInput = z.infer<typeof profileContentSchema>;
export type ProjectItemInput = z.infer<typeof projectItemSchema>;
export type BlogArticleInput = z.infer<typeof blogArticleSchema>;
export type ContactContentInput = z.infer<typeof contactContentSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type SiteDataInput = z.infer<typeof siteDataSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
