'use client';

import { useEffect, useState } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { Save, Loader2, Plus, Trash2, Image } from 'lucide-react';

export default function AdminHome() {
  const { profile, fetchData, updateProfile, saveData } = useContentStore();
  const [isSaving, setIsSaving] = useState(false);

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

  if (!profile) return null;

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          🏠 首页信息管理
        </h1>
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

      <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-400">
        <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          📋 价值主张
        </h2>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">个人 Slogan</label>
          <input
            type="text"
            value={profile.valueSentence}
            onChange={(e) => updateProfile({ valueSentence: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
            placeholder="掌握生产资料，不做被市场定价的商品..."
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl border-2 border-dashed border-pink-300">
        <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          💡 首页内容说明
        </h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong className="text-pink-600">头像:</strong> 请在前台页面查看，暂时使用固定图片
          </p>
          <p>
            <strong className="text-pink-600">兴趣卡片:</strong> 当前为固定内容，后续可在此页面扩展编辑
          </p>
          <p>
            <strong className="text-pink-600">社交链接:</strong> 请在"联系信息"页面管理
          </p>
        </div>
      </div>
    </div>
  );
}
