'use client';

import { useEffect, useState } from 'react';
import { useContentStore, ProjectItem } from '@/store/useContentStore';
import { Save, Loader2, Plus, Trash2, Image } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function AdminProjects() {
  const { projects, fetchData, updateProjects, saveData } = useContentStore();
  const [isSaving, setIsSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveData();
      alert('保存成功!');
    } catch (error) {
      alert('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const addProject = () => {
    const newProject: ProjectItem = {
      id: uuidv4(),
      name: '新项目',
      category: 'toC',
      status: 'planning',
      progress: 0,
      description: '',
      highlights: [],
      timeline: [],
      images: [],
    };
    updateProjects([newProject, ...projects]);
    setEditingProject(newProject.id);
  };

  const updateProject = (index: number, field: keyof ProjectItem, value: any) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateProjects(newProjects);
  };

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    updateProjects(newProjects);
  };

  const addHighlight = (projectIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].highlights.push('新亮点');
    updateProjects(newProjects);
  };

  const updateHighlight = (projectIndex: number, highlightIndex: number, value: string) => {
    const newProjects = [...projects];
    newProjects[projectIndex].highlights[highlightIndex] = value;
    updateProjects(newProjects);
  };

  const removeHighlight = (projectIndex: number, highlightIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].highlights.splice(highlightIndex, 1);
    updateProjects(newProjects);
  };

  const addTimelineEvent = (projectIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].timeline.push({ date: new Date().toISOString().split('T')[0], event: '新事件' });
    updateProjects(newProjects);
  };

  const updateTimelineEvent = (projectIndex: number, timelineIndex: number, field: 'date' | 'event', value: string) => {
    const newProjects = [...projects];
    newProjects[projectIndex].timeline[timelineIndex] = { 
      ...newProjects[projectIndex].timeline[timelineIndex], 
      [field]: value 
    };
    updateProjects(newProjects);
  };

  const removeTimelineEvent = (projectIndex: number, timelineIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].timeline.splice(timelineIndex, 1);
    updateProjects(newProjects);
  };

  const addImage = (projectIndex: number) => {
    const url = prompt('请输入图片 URL:');
    if (url) {
      const newProjects = [...projects];
      newProjects[projectIndex].images.push(url);
      updateProjects(newProjects);
    }
  };

  const removeImage = (projectIndex: number, imageIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].images.splice(imageIndex, 1);
    updateProjects(newProjects);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          📁 项目管理
        </h1>
        <div className="flex gap-3">
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-6 py-3 bg-pink-100 text-pink-700 font-bold rounded-xl hover:bg-pink-200 transition-all"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Plus className="w-4 h-4" />
            添加项目
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 disabled:opacity-50 transition-all shadow-lg"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            保存更改
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project, projectIndex) => (
          <div key={project.id} className="bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-400">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(projectIndex, 'name', e.target.value)}
                    className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none bg-transparent"
                    style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  />
                  <select
                    value={project.category}
                    onChange={(e) => updateProject(projectIndex, 'category', e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-800 focus:border-pink-500"
                  >
                    <option value="toB">toB</option>
                    <option value="toC">toC</option>
                  </select>
                  <select
                    value={project.status}
                    onChange={(e) => updateProject(projectIndex, 'status', e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-800 focus:border-pink-500"
                  >
                    <option value="planning">规划中</option>
                    <option value="in-progress">进行中</option>
                    <option value="validation">验证期</option>
                    <option value="completed">已完成</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">项目描述</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(projectIndex, 'description', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 ml-6">
                <div className="text-4xl font-bold text-pink-600">{project.progress}%</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={project.progress}
                  onChange={(e) => updateProject(projectIndex, 'progress', parseInt(e.target.value))}
                  className="w-24 accent-pink-500"
                />
                <button
                  onClick={() => removeProject(projectIndex)}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  <Trash2 className="w-4 h-4" />
                  删除
                </button>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  ✨ 项目亮点
                </h3>
                <button
                  onClick={() => addHighlight(projectIndex)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-pink-100 text-pink-700 text-sm font-bold rounded-lg hover:bg-pink-200 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  添加亮点
                </button>
              </div>
              <div className="space-y-2">
                {project.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateHighlight(projectIndex, hIndex, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
                    />
                    <button
                      onClick={() => removeHighlight(projectIndex, hIndex)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  📅 项目时间轴
                </h3>
                <button
                  onClick={() => addTimelineEvent(projectIndex)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-pink-100 text-pink-700 text-sm font-bold rounded-lg hover:bg-pink-200 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  添加事件
                </button>
              </div>
              <div className="space-y-2">
                {project.timeline.map((event, tIndex) => (
                  <div key={tIndex} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={event.date}
                      onChange={(e) => updateTimelineEvent(projectIndex, tIndex, 'date', e.target.value)}
                      className="w-32 px-3 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800 text-sm"
                      placeholder="日期"
                    />
                    <input
                      type="text"
                      value={event.event}
                      onChange={(e) => updateTimelineEvent(projectIndex, tIndex, 'event', e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
                      placeholder="事件"
                    />
                    <button
                      onClick={() => removeTimelineEvent(projectIndex, tIndex)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  🖼️ 项目图片
                </h3>
                <button
                  onClick={() => addImage(projectIndex)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-pink-100 text-pink-700 text-sm font-bold rounded-lg hover:bg-pink-200 transition-all"
                >
                  <Image className="w-4 h-4" />
                  添加图片
                </button>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {project.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="relative group">
                    <img src={img} alt="Project" className="w-full h-32 object-cover rounded-xl border-2 border-gray-300" />
                    <button
                      onClick={() => removeImage(projectIndex, imgIndex)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
