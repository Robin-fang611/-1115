'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, Bookmark } from 'lucide-react';
import siteData from '@/data/siteData.json';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishDate: string;
  cover?: string;
  isSticky: boolean;
  content: string;
}

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('全部');

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center">Loading...</div>;

  const blog = siteData.blog;
  const articles: Article[] = blog.articles;

  const filteredArticles = articles
    .filter(article => activeCategory === '全部' || article.category === activeCategory)
    .sort((a, b) => {
      if (a.isSticky && !b.isSticky) return -1;
      if (!a.isSticky && b.isSticky) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  return (
    <main className="min-h-screen bg-yellow-50 relative overflow-hidden pt-20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {['📝', '💖', '✨'][i % 3]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-32 h-32 rounded-full border-8 border-dashed border-pink-400 bg-white p-2 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 via-yellow-200 to-cyan-200 flex items-center justify-center">
                <span className="text-7xl">📚</span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold mb-6"
            style={{
              fontFamily: 'Comic Sans MS, cursive',
              color: '#d63384',
            }}
          >
            📚 Blog 分享
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-700"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            💫 {blog.description}
          </motion.p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {blog.categories.map((category, i) => (
            <motion.button
              key={category}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-bold border-2 transition-all ${
                activeCategory === category
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'bg-white text-gray-700 border-gray-400 hover:border-pink-400'
              }`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* 文章卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-600 bg-white rounded-3xl border-4 border-dashed border-gray-400">
              <p className="text-2xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>暂无文章内容 📝</p>
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-dashed border-gray-400 flex flex-col h-full"
              >
                {/* 封面图 */}
                <div className="aspect-[3/4] relative bg-gradient-to-br from-pink-200 via-yellow-200 to-cyan-200">
                  {article.isSticky && (
                    <div className="absolute top-3 left-3 z-10 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      <Bookmark size={12} /> 置顶
                    </div>
                  )}
                  {article.cover ? (
                    <img
                      src={article.cover}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <span className="text-6xl">📝</span>
                    </div>
                  )}
                </div>

                {/* 内容 */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* 分类标签 */}
                  <div className="mb-3">
                    <span className="text-xs px-3 py-1 bg-pink-100 text-pink-600 rounded-full font-bold border-2 border-pink-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      {article.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 leading-snug" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {article.summary}
                  </p>

                  {/* 元数据 */}
                  <div className="flex items-center text-xs text-gray-600 mt-auto pt-3 border-t-2 border-dashed border-gray-300">
                    <span className="flex items-center gap-1 font-bold">
                      <Calendar size={12} /> {article.publishDate}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
