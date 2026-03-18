'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, Mail, Music, Gamepad2, Palette, Dumbbell, Code, Heart, ArrowDown } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center">Loading...</div>;

  const socialLinks = siteData.contact.socialLinks;
  const profile = siteData.profile;
  const basicInfo = profile.basicInfo;

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'wechat': return Mail;
      case 'xiaohongshu': return BookOpen;
      case 'github': return Code;
      case 'email': return Mail;
      default: return MessageCircle;
    }
  };

  const getAbilityIcon = (ability: string) => {
    if (ability.includes('AI')) return Code;
    if (ability.includes('音乐') || ability.includes('吉他')) return Music;
    if (ability.includes('书法')) return Palette;
    if (ability.includes('健身')) return Dumbbell;
    if (ability.includes('游戏')) return Gamepad2;
    return Heart;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h1 
              className="text-6xl md:text-8xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              {basicInfo.name}'s Island
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-700 mb-12"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            {profile.role}
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-4 md:gap-6 flex-wrap"
          >
            {profile.abilityTags.slice(0, 5).map((ability, i) => {
              const Icon = getAbilityIcon(ability);
              return (
                <motion.div
                  key={ability}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                  className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 bg-white rounded-full shadow-lg border-2 border-dashed border-pink-300"
                  style={{
                    backgroundColor: ['#ffe5d0', '#d4edda', '#d1ecf1', '#e2d5f1', '#f8d7da'][i % 5],
                  }}
                >
                  <Icon size={24} className="text-gray-800" />
                  <span className="font-bold text-lg md:text-xl text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {ability}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* 社交链接 */}
        <div className="flex justify-center gap-6 md:gap-8 flex-wrap mb-16 md:mb-24">
          {socialLinks.map((social, i) => {
            const Icon = getIcon(social.platform);
            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 50, opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-4 border-dashed border-gray-400 shadow-lg transition-all duration-300 group-hover:shadow-xl"
                  style={{
                    backgroundColor: ['#07c160', '#ff2442', '#ff6b6b'][i % 3],
                    transform: 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Icon size={32} className="text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-lg md:text-xl text-gray-700 group-hover:text-pink-600 transition-colors duration-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  {social.platform}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* 向下箭头 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="flex justify-center"
        >
          <ArrowDown size={40} className="text-gray-600 animate-bounce" />
        </motion.div>
      </div>

      {/* CSS 动画 */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
}
