'use client';

import { useEffect, useState, Suspense } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { ImagePreview } from '@/components/ui/ImagePreview';
import { Github, Twitter, Instagram, Linkedin, Youtube, Facebook, BookOpen, MessageCircle, Share2, Video, Mail, Link as LinkIcon } from 'lucide-react';

function HomeContent() {
  const { home, global, aboutMe, fetchData, isLoading } = useContentStore();
  
  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || isLoading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>;

  // Icon mapping helper
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
        case 'github': return Github;
        case 'twitter': return Twitter;
        case 'instagram': return Instagram;
        case 'linkedin': return Linkedin;
        case 'youtube': return Youtube;
        case 'facebook': return Facebook;
        case 'xhs': return BookOpen;
        case 'wechat': return MessageCircle;
        case 'bilibili': return Video;
        case 'weibo': return Share2;
        case 'mail': return Mail;
        default: return LinkIcon;
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative font-sans selection:bg-[#FF6B6B] selection:text-white pt-20 md:pt-0">
      <div className="container mx-auto px-4 h-full md:h-screen flex flex-col md:flex-row items-center relative z-10">
        
        {/* Left Column: Hero & Social */}
        <div className="flex-1 z-20 flex flex-col justify-center h-full pt-10 md:pt-0">
          <div className="space-y-6 mb-12">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block">Hi,</span>
              <span className="block">This is <span className="text-[#FF6B6B]">{global.logoText?.split(' ')[0] || "Inaya"}</span> <span className="text-white">{global.logoText?.split(' ').slice(1).join(' ') || "Ayat"}</span></span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium tracking-wide">
              {home.slogan || "User Interface Designer"}
            </p>
            
          </div>

          {/* Social Icons (Desktop: Bottom Left, Mobile: Row) */}
          <div className="md:absolute md:bottom-12 md:left-4 flex md:flex-col gap-6 mt-8 md:mt-0 items-center md:items-start">
            {home.socialLinks?.map((link, index) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={index}
                  href={link.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Center Image (Absolute Overlay) */}
        <div className="md:absolute inset-0 flex justify-center items-center pointer-events-none z-10 my-8 md:my-0">
            <div className="relative w-64 h-80 md:w-[450px] md:h-[600px] overflow-hidden rounded-full md:rounded-none">
                {/* Gradient Overlay for "Fade" effect if needed */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] z-20"></div>
                {home.coverImage ? (
                    <ImagePreview 
                        src={home.coverImage} 
                        alt="Cover" 
                        className="w-full h-full object-cover opacity-80 md:opacity-100 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-800 animate-pulse"></div>
                )}
            </div>
        </div>

        {/* Right Column: Info & Decor */}
        <div className="flex-1 z-20 flex flex-col justify-center items-start md:items-end text-left md:text-right h-full pb-20 md:pb-0 relative w-full">


            <div className="space-y-6 max-w-md mt-10 md:mt-0">
                <div>
                    <span className="text-[#FF7A45] font-medium mb-2 block">{aboutMe?.expertOn || "Expert on"}</span>
                    <h2 className="text-3xl md:text-4xl font-bold leading-snug">
                        Based in <span className="text-white">{aboutMe?.location || "Netherland"}</span><br/>
                        I'm <span className="text-white">{aboutMe?.role?.split(' ')[0] || "developer"}</span><br/>
                        <span className="text-gray-300">{aboutMe?.role?.split(' ').slice(1).join(' ') || "and UI/UX designer."}</span>
                    </h2>
                </div>
                
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                   {aboutMe?.valueSentence || "Hey are looking for designer to build your brand and grow your business? let's shake hands with me."}
                </p>
                
            </div>
            
        </div>

      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
