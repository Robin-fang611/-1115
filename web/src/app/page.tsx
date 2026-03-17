'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, Mail, Music, Gamepad2, Palette, Dumbbell, Code, Heart, ArrowDown, Lock, X } from 'lucide-react';
import siteData from '@/data/siteData.json';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError('');

    try {
      const result = await signIn('credentials', {
        password: adminPassword,
        redirect: false,
      });

      if (result?.error) {
        setLoginError('密码错误，请重试');
      } else {
        setShowAdminModal(false);
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch {
      setLoginError('登录失败，请稍后重试');
    } finally {
      setIsLoginLoading(false);
    }
  };
  
  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center">Loading...</div>;

  const profile = siteData.profile;
  const socialLinks = siteData.contact.socialLinks;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Book': return BookOpen;
      case 'MessageCircle': return MessageCircle;
      case 'Mail': return Mail;
      default: return MessageCircle;
    }
  };

  return (
    <main className="min-h-screen bg-yellow-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{ 
              rotate: 360,
              y: [0, 10, 0],
              x: [0, 5, 0]
            }}
            transition={{ 
              duration: 20 + i * 2,
              repeat: Infinity, 
              ease: "linear"
            }}
          >
            {['⭐', '💖', '🌈', '✨', '📝'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* 主内容 */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="inline-block mb-8"
          >
            {/* 拍立得风格头像框 */}
            <div 
              className="w-48 md:w-56 h-56 md:h-64 bg-white p-4 shadow-xl transition-all duration-300 hover:shadow-2xl"
              style={{
                transform: 'rotate(-3deg)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-200 via-yellow-200 to-cyan-200 flex items-center justify-center rounded-sm transition-transform duration-300 hover:scale-105">
                <span className="text-8xl md:text-9xl">📸</span>
              </div>
              <div className="text-center mt-2 font-bold text-gray-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Robin
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6"
            style={{
              fontFamily: 'Comic Sans MS, cursive',
              background: 'linear-gradient(45deg, #d63384, #d97706, #059669, #3b82f6)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 5s ease infinite',
            }}
          >
            Hi~ I'm Robin! 👋
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-700 mb-8"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            🌈 {profile.basicInfo.age}岁 · {profile.basicInfo.location} · {profile.basicInfo.personality.split('|')[0]} 🌈
          </motion.p>

          {/* 能力标签 */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {profile.abilityTags.slice(0, 6).map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ scale: 0, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 md:px-6 py-2 md:py-3 rounded-3xl font-bold text-sm md:text-lg text-gray-800 border-2 border-dashed border-gray-400 transition-all duration-300"
                style={{
                  backgroundColor: ['#fff3cd', '#ffe5d0', '#d4edda', '#d1ecf1', '#e2d5f1', '#f8d7da'][i],
                  transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
                }}
              >
                {tag}
              </motion.div>
            ))}
          </div>

          {/* 滚动提示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, 10, 0]
            }}
            transition={{ 
              delay: 2,
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mt-12"
          >
            <ArrowDown size={32} className="mx-auto text-pink-600" />
            <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              向下滚动探索更多
            </p>
          </motion.div>
        </div>

        {/* 兴趣卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          <InterestCard
            icon={<Music size={48} />}
            title="🎵 音乐创作"
            items={['吉他弹唱', 'AI 作曲', '电子音乐']}
            color="#fff3cd"
            rotation={-2}
          />
          <InterestCard
            icon={<Gamepad2 size={48} />}
            title="🎮 游戏世界"
            items={['独立游戏', '宣发策划', '游戏研究']}
            color="#ffe5d0"
            rotation={3}
          />
          <InterestCard
            icon={<Palette size={48} />}
            title="🎨 人文艺术"
            items={['软笔书法', '历史迷', '文学创作']}
            color="#d4edda"
            rotation={-1}
          />
          <InterestCard
            icon={<Dumbbell size={48} />}
            title="💪 健身日常"
            items={['晨练习惯', '健康生活', '自律']}
            color="#d1ecf1"
            rotation={2}
          />
          <InterestCard
            icon={<Heart size={48} />}
            title="💖 创投经历"
            items={['FA 助理', '投资人对接', '创业实战']}
            color="#e2d5f1"
            rotation={-3}
          />
          <InterestCard
            icon={<Code size={48} />}
            title="💻 AI 工具玩家"
            items={['Web 开发', 'AI 实践', '小工具']}
            color="#f8d7da"
            rotation={1}
          />
        </div>

        {/* 社交链接 */}
        <div className="flex justify-center gap-6 md:gap-8 flex-wrap mb-16 md:mb-24">
          {socialLinks.map((social, i) => {
            const Icon = getIcon(social.icon);
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
                    backgroundColor: ['#07c160', '#ff2442', '#ff6b6b'][i],
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
          
          {/* 后台入口 */}
          <motion.button
            initial={{ y: 50, opacity: 0, scale: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.2, rotate: -10, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAdminModal(true)}
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-4 border-dashed border-gray-400 shadow-lg transition-all duration-300 group-hover:shadow-xl"
              style={{
                backgroundColor: '#6366f1',
                transform: 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              <Lock size={32} className="text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-700 group-hover:text-pink-600 transition-colors duration-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              后台管理
            </span>
          </motion.button>
        </div>

        {/* 座右铭 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div 
            className="inline-block p-6 md:p-8 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl"
            style={{
              border: '4px dashed #d63384',
            }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              💫 "{profile.valueSentence}"
            </h3>
          </motion.div>
        </motion.div>
      </div>

      {/* 后台登录弹窗 */}
      {showAdminModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAdminModal(false)}
          />
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            className="relative w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border-2 border-dashed border-gray-400"
            style={{ zIndex: 10 }}
          >
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <Lock className="w-8 h-8 text-pink-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                🔐 后台管理登录
              </h1>
              <p className="text-gray-600">Robin's Island Admin Panel</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  管理员密码
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
                  placeholder="请输入管理员密码"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoginLoading}
                className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                {isLoginLoading ? '登录中...' : '登录后台'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

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

function InterestCard({ icon, title, items, color, rotation }: any) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, rotate: rotation }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      whileHover={{ scale: 1.05, rotate: rotation * -1, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 md:p-8 rounded-3xl shadow-lg relative border-2 border-dashed border-gray-400 transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* 图钉效果 */}
      <motion.div 
        className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md"
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: ['0 2px 4px rgba(0,0,0,0.2)', '0 4px 8px rgba(0,0,0,0.3)', '0 2px 4px rgba(0,0,0,0.2)']
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="mb-4 text-gray-800 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item: string, i: number) => (
          <motion.li 
            key={i} 
            className="flex items-center gap-2 font-medium text-gray-700"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className="text-pink-600">✓</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
