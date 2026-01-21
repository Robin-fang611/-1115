'use client';

import { useContentStore } from '@/store/useContentStore';
import { useThemeStore } from '@/store/useThemeStore';
import { Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Briefcase, Rocket, Video, Star } from 'lucide-react';

function AboutContent() {
  const { aboutMe, global, fetchData, isLoading } = useContentStore();
  const { isTextFlowEnabled } = useThemeStore();
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Sort: Sticky first, then Date descending (assuming simple string comparison for date)
  // Note: The new JSON structure has 'isSticky'
  const sortedTimeline = [...aboutMe.timeline].sort((a, b) => {
    if (a.isSticky && !b.isSticky) return -1;
    if (!a.isSticky && b.isSticky) return 1;
    // Simple lexicographical sort for YYYY-MM
    return b.time.localeCompare(a.time);
  });

  const getIcon = (category: string) => {
    if (category.includes('职场')) return <Briefcase size={20} />;
    if (category.includes('创业')) return <Rocket size={20} />;
    if (category.includes('媒体') || category.includes('自媒体')) return <Video size={20} />;
    return <Briefcase size={20} />;
  };

  const getTypeColor = (category: string) => {
    if (category.includes('职场')) return 'bg-blue-100 text-blue-600';
    if (category.includes('创业')) return 'bg-purple-100 text-purple-600';
    if (category.includes('媒体') || category.includes('自媒体')) return 'bg-pink-100 text-pink-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#7A3EF3]">
          关于我
        </h1>
        <p className="text-center text-[#9AA0A6] mb-16 text-lg italic">
          &quot;{aboutMe.valueSentence || '探索技术与商业的边界，记录成长的每一步。'}&quot;
        </p>

        {/* Skills Matrix */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-[#A78BFA] to-[#7A3EF3] rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">能力矩阵</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {aboutMe.abilityTags.map((skill, index) => (
              <div 
                key={index}
                className="bg-[#F2F2F2] px-6 py-3 rounded-full shadow-sm hover:scale-105 transition-all duration-300 cursor-default"
              >
                <span className="font-medium text-[#1F2937]">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-[#A78BFA] to-[#7A3EF3] rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">成长轨迹</h2>
          </div>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {sortedTimeline.length === 0 ? (
               <div className="text-center text-gray-500 py-10">暂无经历数据</div>
            ) : (
               sortedTimeline.map((item, index) => (
              <div key={item.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className={clsx(
                  "flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10",
                  getTypeColor(item.category)
                )}>
                  {item.isSticky ? <Star size={20} className="fill-current" /> : getIcon(item.category)}
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-[#7A3EF3]/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className={clsx("text-xs font-semibold px-2 py-1 rounded", getTypeColor(item.category))}>
                      {item.category}
                    </span>
                    <time className="font-mono text-sm text-gray-400">{item.time}</time>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                     {item.event}
                     {item.isSticky && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">置顶</span>}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {item.result}
                  </p>
                </div>
              </div>
            )))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}
