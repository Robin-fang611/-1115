'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Rocket, Star, User, ArrowDown } from 'lucide-react';
import siteData from '@/data/siteData.json';

interface TimelineItem {
  id: string;
  category: string;
  time: string;
  event: string;
  result: string;
  emoji?: string;
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center">Loading...</div>;

  const profile = siteData.profile;
  const timeline: TimelineItem[] = profile.timeline;

  const getIcon = (category: string) => {
    if (category.includes('创投')) return <Briefcase size={24} />;
    if (category.includes('创业')) return <Rocket size={24} />;
    if (category.includes('AI')) return <Star size={24} />;
    return <Briefcase size={24} />;
  };

  return (
    <main className="min-h-screen bg-yellow-50 relative overflow-hidden pt-20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{ 
              rotate: 360,
              y: [0, 8, 0]
            }}
            transition={{ 
              duration: 20 + i * 2,
              repeat: Infinity, 
              ease: "linear"
            }}
          >
            {['⭐', '💖', '✨'][i % 3]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="inline-block mb-6"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-8 border-dashed border-pink-400 bg-white p-2 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 via-yellow-200 to-cyan-200 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <User size={56} className="text-gray-700" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{
              fontFamily: 'Comic Sans MS, cursive',
              color: '#d63384',
            }}
          >
            👤 关于我
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto px-4"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            💫 &quot;{profile.valueSentence}&quot; 💫
          </motion.p>

          {/* 滚动提示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, 10, 0]
            }}
            transition={{ 
              delay: 1.5,
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mt-12"
          >
            <ArrowDown size={28} className="mx-auto text-pink-600" />
            <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              向下滚动了解更多
            </p>
          </motion.div>
        </div>

        {/* 基础信息卡片 */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="bg-white p-6 md:p-8 rounded-3xl shadow-xl mb-16 border-4 border-dashed border-pink-300"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <InfoItem label="姓名" value={profile.basicInfo.name} icon="👤" color="#fff3cd" />
            <InfoItem label="年龄" value={`${profile.basicInfo.age}岁`} icon="🎂" color="#ffe5d0" />
            <InfoItem label="所在地" value={profile.basicInfo.location} icon="📍" color="#d4edda" />
            <InfoItem label="教育" value={profile.basicInfo.education} icon="🎓" color="#d1ecf1" />
            <InfoItem label="性格" value={profile.basicInfo.personality} icon="✨" color="#e2d5f1" />
            <InfoItem label="角色" value={profile.role} icon="💼" color="#f8d7da" />
          </div>
        </motion.div>

        {/* 能力矩阵 */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: 'Comic Sans MS, cursive', color: '#d63384' }}
            >
              🎯 能力矩阵
            </motion.h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {profile.abilityTags.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ scale: 0, rotate: 180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 1 + 0.1 * index, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 md:px-6 py-2 md:py-3 rounded-3xl font-bold text-sm md:text-lg text-gray-800 border-2 border-dashed border-gray-400 transition-all duration-300"
                style={{
                  backgroundColor: ['#fff3cd', '#ffe5d0', '#d4edda', '#d1ecf1', '#e2d5f1', '#f8d7da', '#fff3cd', '#ffe5d0', '#d4edda'][index % 9],
                  transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)`,
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 成长轨迹时间线 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: 'Comic Sans MS, cursive', color: '#d63384' }}
            >
              📖 成长轨迹
            </motion.h2>
          </div>
          
          <div className="space-y-8 md:space-y-12 relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 to-purple-400 transform -translate-x-1/2 hidden md:block" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0, y: 50 }}
                animate={{ x: 0, opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="md:flex-1" />
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-200 border-4 border-dashed border-pink-400 flex items-center justify-center text-3xl md:text-4xl text-gray-800 shadow-lg z-10 transition-all duration-300 hover:scale-110"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.emoji || getIcon(item.category)}
                </motion.div>
                <motion.div
                  className="md:flex-1 p-5 md:p-6 rounded-2xl border-2 border-dashed border-pink-300 transition-all duration-300 hover:shadow-xl"
                  style={{
                    backgroundColor: ['#fff3cd', '#ffe5d0', '#d4edda', '#d1ecf1'][index % 4],
                  }}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-gray-700 px-3 py-1 rounded-full bg-white/50 border border-gray-300">
                      {item.category}
                    </span>
                    <time className="text-sm font-bold text-pink-600">{item.time}</time>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{item.event}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.result}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoItem({ label, value, icon, color }: any) {
  return (
    <motion.div 
      className="p-4 rounded-2xl border-2 border-dashed border-gray-400 transition-all duration-300 hover:shadow-md"
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-bold text-gray-600">{label}</span>
      </div>
      <div className="text-gray-800 font-bold text-sm md:text-lg whitespace-normal break-words">{value}</div>
    </motion.div>
  );
}
