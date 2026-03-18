'use client';

import { useEffect, useState } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { Save, Loader2, Globe } from 'lucide-react';

export default function AdminSettings() {
  const { global, fetchData, updateGlobal, saveData } = useContentStore();
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

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          ⚙️ 全局设置
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
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-8 h-8 text-pink-600" />
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            网站基本信息
          </h2>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">网站标题 (Site Title)</label>
            <input
              type="text"
              value={global.siteTitle}
              onChange={(e) => updateGlobal({ siteTitle: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Logo 文字</label>
            <input
              type="text"
              value={global.logoText}
              onChange={(e) => updateGlobal({ logoText: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">网站描述</label>
            <input
              type="text"
              value={global.description}
              onChange={(e) => updateGlobal({ description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">主题风格</label>
            <select
              value={global.theme}
              onChange={(e) => updateGlobal({ theme: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800 bg-white"
            >
              <option value="doodle">手绘涂鸦 (Doodle)</option>
              <option value="minimal">极简主义 (Minimal)</option>
              <option value="colorful">多彩活泼 (Colorful)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl border-2 border-dashed border-pink-300">
        <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          💡 提示信息
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-pink-600 font-bold">✓</span>
            所有修改点击"保存更改"后会立即生效
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-600 font-bold">✓</span>
            前台页面会自动同步后台数据，无需刷新
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-600 font-bold">✓</span>
            建议定期备份重要数据
          </li>
        </ul>
      </div>
    </div>
  );
}
