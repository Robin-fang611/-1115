# API Documentation & Data Structure

## Overview
This project uses **Zustand** for state management and local persistence (`localStorage`) instead of a traditional backend API for this MVP phase. The "API" interactions are essentially state updates to the Zustand store.

## Data Store: `useContentStore`

### 1. Global Settings
- **`fontFamily`**: `string` ('sans' | 'puhuiti' | 'deyihei')
  - Controlled via `useThemeStore` in practice, synced to root layout.

### 2. Home Page (`home`)
**State Structure:**
```typescript
interface HomeContent {
  coverImage: string; // URL
  slogan: string;
  socialLinks: Array<{ 
    platform: string; 
    url: string; 
    icon: string; // Icon name from Lucide-React
  }>;
}
```
**Actions:**
- `updateHomeDraft(data: Partial<HomeContent>)`: Updates the draft state.
- `publishHome()`: Promotes draft to published state.

### 3. About Page (`about`)
**State Structure:**
```typescript
interface TimelineItem {
  id: string; // UUID
  date: string; // YYYY-MM-DD
  title: string;
  type: 'career' | 'startup' | 'media';
  content: string;
  isSticky: boolean; // Pinned status
}

interface AboutContent {
  timeline: TimelineItem[];
  skills: string[]; // List of strings
}
```
**Actions:**
- `updateAboutDraft(data)`
- `publishAbout()`

### 4. Projects Page (`projects`)
**State Structure:**
```typescript
interface ProjectModule {
  id: string;
  title: string;
  content: string;
  images: string[]; // Max 3 image URLs
}

interface FutureItem {
  id: string;
  date: string;
  title: string;
}

interface ProjectsContent {
  brandName: string;
  slogan: string;
  modules: ProjectModule[];
  futurePlan: FutureItem[];
}
```
**Actions:**
- `updateProjectsDraft(data)`
- `publishProjects()`

### 5. Notes Page (`notes`)
**State Structure:**
```typescript
interface Article {
  id: string;
  title: string;
  cover: string;
  summary: string; // Max 50 chars recommended
  publishDate: string;
  views: number; // Editable manually
  category: string;
  isPinned: boolean; // Pinned status
}

interface NotesContent {
  tags: string[];
  articles: Article[];
}
```
**Actions:**
- `updateNotesDraft(data)`
- `publishNotes()`

---

## Global Theme Store: `useThemeStore`

**State Structure:**
```typescript
interface ThemeState {
  isTextFlowEnabled: boolean; // Controls text gradient animation
  font: 'default' | 'puhuiti' | 'deyihei';
}
```

**Actions:**
- `toggleTextFlow()`
- `setFont(font)`

---

## Frontend Integration

### Preview Mode
All frontend pages support a `?preview=true` query parameter.
- **Normal View**: Renders `store.page.published` data.
- **Preview View**: Renders `store.page.draft` data.

### Image Optimization
- All images utilize `next/image` (where possible) or optimized `img` tags within the `ImagePreview` component.
- **Lightbox**: The `ImagePreview` component handles full-screen viewing with zoom and swipe (gallery mode) capabilities.

### Responsive Breakpoints (Tailwind)
- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)
