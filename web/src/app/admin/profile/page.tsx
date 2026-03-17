'use client';

import { useEffect, useState } from 'react';
import { useContentStore, TimelineItem } from '@/store/useContentStore';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const EMOJI_OPTIONS = ['💼', '📚', '🎮', '🤖', '🚀', '🎯', '💡', '🏆', '📈', '🎨', '✍️', '🎵'];

export default function AdminProfile() {
  const { profile, fetchData, updateProfile, saveData } = useContentStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);

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

  const addTimelineItem = () => {
    const newItem: TimelineItem = {
      id: uuidv4(),
      time: new Date().getFullYear().toString(),
      event: '新事件',
      category: '实践经历',
      result: '',
      emoji: '🚀',
    };
    updateProfile({ timeline: [newItem, ...profile.timeline] });
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: any) => {
    const newTimeline = [...profile.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    updateProfile({ timeline: newTimeline });
  };

  const removeTimelineItem = (index: number) => {
    const newTimeline = profile.timeline.filter((_, i) => i !== index);
    updateProfile({ timeline: newTimeline });
  };

  const handleAbilityTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(/,\s*/).filter(Boolean);
    updateProfile({ abilityTags: tags });
  };

  const handleBasicInfoChange = (field: keyof typeof profile.basicInfo, value: any) => {
    updateProfile({ basicInfo: { ...profile.basicInfo, [field]: value } });
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          👤 Profile 信息管理
        </h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          保存更改
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-400">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            📋 基本信息
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">姓名</label>
            <input
              type="text"
              value={profile.basicInfo.name}
              onChange={(e) => handleBasicInfoChange('name', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">年龄</label>
            <input
              type="number"
              value={profile.basicInfo.age}
              onChange={(e) => handleBasicInfoChange('age', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">所在地</label>
            <input
              type="text"
              value={profile.basicInfo.location}
              onChange={(e) => handleBasicInfoChange('location', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">教育背景</label>
            <input
              type="text"
              value={profile.basicInfo.education}
              onChange={(e) => handleBasicInfoChange('education', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">个性标签</label>
            <input
              type="text"
              value={profile.basicInfo.personality}
              onChange={(e) => handleBasicInfoChange('personality', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
              placeholder="INTP | 早睡早起 | 健身爱好者"
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <label className="text-sm font-bold text-gray-700">角色定位</label>
          <input
            type="text"
            value={profile.role}
            onChange={(e) => updateProfile({ role: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
          />
        </div>

        <div className="mt-6 space-y-2">
          <label className="text-sm font-bold text-gray-700">能力标签 (逗号分隔)</label>
          <input
            type="text"
            value={profile.abilityTags.join(', ')}
            onChange={handleAbilityTagsChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
          />
        </div>

        <div className="mt-6 space-y-2">
          <label className="text-sm font-bold text-gray-700">价值主张</label>
          <input
            type="text"
            value={profile.valueSentence}
            onChange={(e) => updateProfile({ valueSentence: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-400">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            📅 成长时间轴
          </h2>
          <button
            onClick={addTimelineItem}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 font-bold rounded-xl hover:bg-pink-200 transition-all"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Plus className="w-4 h-4" />
            添加经历
          </button>
        </div>
        
        <div className="space-y-4">
          {profile.timeline.map((item, index) => (
            <div key={item.id} className="p-6 border-2 border-gray-300 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-600 block">时间</label>
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => updateTimelineItem(index, 'time', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm text-gray-800 focus:border-pink-500"
                  />
                </div>
                
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-bold text-gray-600 block">类别</label>
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => updateTimelineItem(index, 'category', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm text-gray-800 focus:border-pink-500"
                  />
                </div>

                <div className="md:col-span-5 space-y-2">
                  <label className="text-xs font-bold text-gray-600 block">事件</label>
                  <input
                    type="text"
                    value={item.event}
                    onChange={(e) => updateTimelineItem(index, 'event', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm font-bold text-gray-800 focus:border-pink-500"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-600 block">Emoji</label>
                  <select
                    value={item.emoji}
                    onChange={(e) => updateTimelineItem(index, 'emoji', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm text-gray-800 focus:border-pink-500"
                  >
                    {EMOJI_OPTIONS.map((emoji) => (
                      <option key={emoji} value={emoji}>{emoji}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 block">结果/成就</label>
                <textarea
                  value={item.result}
                  onChange={(e) => updateTimelineItem(index, 'result', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm text-gray-800 focus:border-pink-500"
                  rows={3}
                />
              </div>

              <div className="flex justify-end mt-4 pt-4 border-t border-gray-300">
                <button
                  onClick={() => removeTimelineItem(index)}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-bold"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  <Trash2 className="w-4 h-4" />
                  删除
                </button>
              </div>
            </div>
          ))}
          {profile.timeline.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-8">暂无经历，点击右上角添加</p>
          )}
        </div>
      </div>
    </div>
  );
}
