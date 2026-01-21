'use client';

import { useContentStore } from '@/store/useContentStore';
import { ImagePreview } from '@/components/ui/ImagePreview';
import { Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Rocket, Zap, Activity } from 'lucide-react';

function ProjectsContent() {
  const { projectProgress, fetchData, isLoading } = useContentStore();
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">Loading...</div>;

  const timelineNodes = projectProgress.timeline || [];

  const getIcon = (type: string, title: string) => {
      if (type === 'brand') return <Zap size={24} className="text-yellow-400 fill-yellow-400" />;
      if (title.toLowerCase().includes('roadmap') || title.includes('规划')) return <Rocket size={20} />;
      return <Activity size={20} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header - Still using global brand settings for the page title if needed, or we can hide it if the first node covers it */}
        {/* User requested "Integrated into Da Long Sheng button", so maybe the page title IS the first node. I'll keep a small header just in case. */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#7A3EF3] opacity-50 text-sm uppercase tracking-widest">
          Project Progress
        </h1>

        {/* Timeline Section */}
        <section className="mt-12">
           <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-[#A78BFA] to-[#7A3EF3] rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">项目进程</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
             {timelineNodes.map((item, index) => {
               const isBrand = item.type === 'brand';
               
               return (
               <div key={item.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className={clsx(
                    "flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10",
                    isBrand ? "bg-[#7A3EF3] text-white scale-125" : "bg-gray-100 text-gray-600"
                  )}>
                    {getIcon(item.type || 'module', item.title)}
                  </div>

                  {/* Content Card */}
                  <div className={clsx(
                      "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] rounded-xl border transition-all duration-300",
                      isBrand 
                        ? "bg-gradient-to-br from-[#7A3EF3] to-[#5B21B6] border-[#7A3EF3] shadow-[0_0_30px_rgba(122,62,243,0.3)] transform hover:scale-[1.02]" 
                        : "bg-[#1a1a1a] border-white/10 hover:border-[#7A3EF3]/50",
                      "p-6"
                  )}>
                     <div className="flex items-center justify-between mb-4">
                        <span className={clsx(
                            "text-xs font-semibold px-2 py-1 rounded", 
                            isBrand ? "bg-white/20 text-white" : "bg-gray-800 text-gray-400"
                        )}>
                          {isBrand ? 'BRAND CORE' : (item.date || 'Update')}
                        </span>
                        {!isBrand && item.date && <time className="font-mono text-sm text-gray-400">{item.date}</time>}
                     </div>
                     
                     <h3 className={clsx(
                         "text-xl font-bold mb-4 pb-2 border-b",
                         isBrand ? "text-white border-white/20" : "text-white border-white/5"
                     )}>
                       {item.title}
                     </h3>
                     
                     <div className={clsx(
                         "text-sm leading-relaxed whitespace-pre-wrap",
                         isBrand ? "text-white/90" : "text-gray-400"
                     )}>
                       {item.content}
                     </div>

                     {/* Images */}
                     {item.images && item.images.length > 0 && (
                        <div className="grid grid-cols-1 gap-3 mt-4">
                            <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 shadow-lg">
                            <ImagePreview 
                                src={item.images[0]} 
                                alt={item.title} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                images={item.images}
                                initialIndex={0}
                            />
                            </div>
                            {item.images.length > 1 && (
                            <div className="grid grid-cols-3 gap-3">
                                {item.images.slice(1, 4).map((img, i) => (
                                <div key={i} className="aspect-video rounded-lg overflow-hidden border border-white/10 shadow-md">
                                    <ImagePreview 
                                    src={img} 
                                    alt={`${item.title} ${i + 2}`} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    images={item.images}
                                    initialIndex={i + 1}
                                    />
                                </div>
                                ))}
                            </div>
                            )}
                        </div>
                     )}
                  </div>
               </div>
               );
             })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
