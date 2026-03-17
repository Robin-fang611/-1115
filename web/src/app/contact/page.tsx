'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, Send } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '合作咨询',
    message: '',
  });

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(siteData.contact.autoReplyMessage);
    setFormData({ name: '', email: '', type: '合作咨询', message: '' });
  };

  if (!mounted) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center">Loading...</div>;

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
            {['💌', '✨', '💖'][i % 3]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-32 h-32 rounded-full border-8 border-dashed border-pink-400 bg-white p-2 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 via-yellow-200 to-cyan-200 flex items-center justify-center">
                <MessageCircle size={64} className="text-gray-700" />
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
            💬 联系我
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-700"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            🌟 期待与您同行
          </motion.p>
        </div>

        {/* 联系方式 + 表单 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
          {/* 联系方式 */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <ContactCard
              icon={<Mail size={40} />}
              label="邮箱"
              value={siteData.contact.email}
              color="#fff3cd"
            />
            <ContactCard
              icon={<MessageCircle size={40} />}
              label="微信"
              value={siteData.contact.wechat}
              color="#ffe5d0"
            />
            <ContactCard
              icon={<Phone size={40} />}
              label="电话"
              value={siteData.contact.phone}
              color="#d4edda"
            />

            {/* 社交链接 */}
            <div className="mt-8 p-6 bg-white rounded-3xl shadow-xl border-4 border-dashed border-pink-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                🔗 关注我
              </h3>
              <div className="flex flex-wrap gap-4">
                {siteData.contact.socialLinks.map((social, i) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-full font-bold text-gray-800 border-2 border-dashed border-gray-400"
                    style={{
                      backgroundColor: ['#07c160', '#ff2442', '#ff6b6b'][i],
                      color: 'white',
                    }}
                  >
                    {social.platform}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 留言表单 */}
          <motion.form
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            onSubmit={handleSubmit}
            className="p-8 bg-white rounded-3xl shadow-xl border-4 border-dashed border-pink-300"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              📝 给我留言
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  姓名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-400 focus:border-pink-500 focus:outline-none text-gray-800 font-bold"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  邮箱
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-400 focus:border-pink-500 focus:outline-none text-gray-800 font-bold"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  类型
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-400 focus:border-pink-500 focus:outline-none text-gray-800 font-bold"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  {siteData.contact.formTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  留言内容
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-400 focus:border-pink-500 focus:outline-none text-gray-800 font-bold resize-none"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                <Send size={24} />
                发送留言
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  );
}

function ContactCard({ icon, label, value, color }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="p-6 rounded-3xl border-2 border-dashed border-gray-400 shadow-lg"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center gap-4">
        <div className="text-gray-800">{icon}</div>
        <div>
          <div className="text-sm font-bold text-gray-600 mb-1">{label}</div>
          <div className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{value}</div>
        </div>
      </div>
    </motion.div>
  );
}
