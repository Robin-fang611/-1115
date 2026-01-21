'use client';

import { useContentStore } from '@/store/useContentStore';
import { ImagePreview } from '@/components/ui/ImagePreview';
import { Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Calendar, Eye, Bookmark } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

function ShareContent() {
  const { entrepreneurship, growthNotes, fetchData, isLoading } = useContentStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'entrepreneurship' | 'growth'>('entrepreneurship');
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => setMounted(true), []);

  // Sync tab with URL search params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'startup') {
      setActiveTab('entrepreneurship');
    } else if (tab === 'notes') {
      setActiveTab('growth');
    }
  }, [searchParams]);

  // Reset tag when tab changes
  useEffect(() => {
    setActiveTag('All');
  }, [activeTab]);

  const handleTabChange = (tab: 'entrepreneurship' | 'growth') => {
    setActiveTab(tab);
    // Update URL without full reload
    const newTabParam = tab === 'entrepreneurship' ? 'startup' : 'notes';
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newTabParam);
    router.replace(`/share?${params.toString()}`, { scroll: false });
  };

  if (!mounted || isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Select data source based on tab
  const currentSection = activeTab === 'entrepreneurship' ? entrepreneurship : growthNotes;
  const categories = ['All', ...currentSection.categories];
  
  // Combine articles from selected section
  const articles = currentSection.articles;

  // Filter and Sort: Pinned first, then Date
  const filteredArticles = articles
    .filter(article => activeTag === 'All' || article.category === activeTag)
    .sort((a, b) => {
      if (a.isSticky && !b.isSticky) return -1;
      if (!a.isSticky && b.isSticky) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-baseline gap-4">
             <button 
               onClick={() => handleTabChange('entrepreneurship')}
               className={clsx(
                 "text-4xl md:text-5xl font-bold transition-colors font-sans",
                 activeTab === 'entrepreneurship' ? "text-gray-200" : "text-gray-700 hover:text-gray-500"
               )}
             >
               创业分享
             </button>
             <span className="text-3xl text-gray-600 font-light">/</span>
             <button 
               onClick={() => handleTabChange('growth')}
               className={clsx(
                 "text-4xl md:text-5xl font-bold transition-colors font-sans",
                 activeTab === 'growth' ? "text-gray-200" : "text-gray-700 hover:text-gray-500"
               )}
             >
               成长手记
             </button>
          </div>
          
          {/* Categories / Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors border",
                  activeTag === tag 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 text-gray-400 border-l-4 border-[#7A3EF3] pl-4 italic">
           {activeTab === 'entrepreneurship' ? entrepreneurship.description : "每日感悟与深度思考"}
        </div>

        {/* Grid List - Xiaohongshu Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-600 bg-[#111] rounded-xl border border-gray-800">
              暂无文章内容
            </div>
          ) : (
            filteredArticles.map(article => (
              <div key={article.id} className="bg-[#111] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-purple-900/10 transition-all group border border-gray-800 flex flex-col h-full hover:border-gray-600">
                {/* Cover Image */}
                <div className="aspect-[3/4] relative bg-gray-900 overflow-hidden">
                  {article.isSticky && (
                    <div className="absolute top-3 left-3 z-10 bg-[#7A3EF3] text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                      <Bookmark size={12} fill="currentColor" /> 置顶
                    </div>
                  )}
                  {article.cover ? (
                    <ImagePreview 
                      src={article.cover} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 bg-gray-900">
                      No Cover
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Category Label */}
                  {article.category && (
                      <div className="mb-2">
                          <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded border border-gray-700">
                              {article.category}
                          </span>
                      </div>
                  )}
                  <h3 className="font-bold text-gray-200 mb-2 line-clamp-2 leading-snug group-hover:text-[#A78BFA] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-auto pt-3 border-t border-gray-800">
                     <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1">
                         <Calendar size={12} /> {article.publishDate}
                       </span>
                     </div>
                     <span className="flex items-center gap-1">
                       <Eye size={12} /> {article.views}
                     </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShareContent />
    </Suspense>
  );
}
