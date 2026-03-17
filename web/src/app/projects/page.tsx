'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Activity, Briefcase, Gamepad2 } from 'lucide-react';
import siteData from '@/data/siteData.json';

interface Project {
  id: string;
  name: string;
  category: 'toB' | 'toC';
  progress: number;
  description: string;
  highlights: string[];
  timeline: {
    date: string;
    event: string;
  }[];
}

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center">Loading...</div>;

  const projects: Project[] = siteData.projects;

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
            {['🚀', '💼', '✨'][i % 3]}
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
                <Rocket size={64} className="text-gray-700" />
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
            💼 项目进展
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-700"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            🎯 to B 与 to C 并行发展
          </motion.p>
        </div>

        {/* 项目卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              className="p-8 rounded-3xl shadow-xl border-4 border-dashed border-gray-400"
              style={{
                backgroundColor: index === 0 ? '#fff3cd' : '#ffe5d0',
                transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
              }}
            >
              {/* 图钉装饰 */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md" />

              {/* 项目图标 */}
              <div className="mb-6 text-gray-800">
                {project.category === 'toB' ? (
                  <Briefcase size={64} className="mx-auto" />
                ) : (
                  <Gamepad2 size={64} className="mx-auto" />
                )}
              </div>

              {/* 项目标题 */}
              <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                {project.name}
              </h3>

              {/* 分类标签 */}
              <div className="text-center mb-6">
                <span className="inline-block px-6 py-2 rounded-full font-bold text-white" style={{
                  backgroundColor: project.category === 'toB' ? '#059669' : '#dc2626',
                }}>
                  {project.category === 'toB' ? '🏢 to B 主线' : '🎮 to C 验证'}
                </span>
              </div>

              {/* 进度条 */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                  <span>项目进度</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full h-4 bg-white rounded-full border-2 border-gray-400 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full"
                    style={{
                      background: `linear-gradient(90deg, ${project.category === 'toB' ? '#10b981' : '#ef4444'}, ${project.category === 'toB' ? '#34d399' : '#f87171'})`,
                    }}
                  />
                </div>
              </div>

              {/* 项目描述 */}
              <p className="text-gray-700 font-bold mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* 亮点列表 */}
              <ul className="space-y-2 mb-6">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-pink-600 font-bold mt-1">✓</span>
                    <span className="font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* 时间线 */}
              <div className="border-t-2 border-dashed border-gray-400 pt-4">
                <h4 className="font-bold text-gray-800 mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  📅 关键节点
                </h4>
                <div className="space-y-2">
                  {project.timeline.map((node, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-pink-500" />
                      <span className="font-bold text-gray-700">{node.date}</span>
                      <span className="text-gray-600">{node.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 未来规划 */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="bg-white p-12 rounded-3xl shadow-xl border-4 border-dashed border-pink-300"
        >
          <h2 className="text-5xl font-bold text-center mb-12" style={{ fontFamily: 'Comic Sans MS, cursive', color: '#d63384' }}>
            🚀 未来规划
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlanningCard
              title="物流工具 2.0"
              description="在现有功能基础上，增加 AI 智能推荐和数据分析模块"
              timeline="2025 Q2"
              color="#d4edda"
            />
            <PlanningCard
              title="SaaS 订阅服务"
              description="将工具打包为标准化产品，服务更多物流从业者"
              timeline="2025 Q3"
              color="#d1ecf1"
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function PlanningCard({ title, description, timeline, color }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="p-6 rounded-2xl border-2 border-dashed border-gray-400"
      style={{ backgroundColor: color }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
        {title}
      </h3>
      <p className="text-gray-700 mb-4 font-medium">{description}</p>
      <div className="flex items-center gap-2 text-pink-600 font-bold">
        <span>📅</span>
        <span>{timeline}</span>
      </div>
    </motion.div>
  );
}
