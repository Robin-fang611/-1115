'use client';

import { useEffect, useState } from 'react';
import { useContentStore, SocialLink } from '@/store/useContentStore';
import { Save, Loader2, Plus, Trash2, Link2 } from 'lucide-react';

const ICON_OPTIONS = ['Book', 'MessageCircle', 'Mail', 'Github', 'Twitter', 'Instagram', 'Youtube', 'Linkedin'];

export default function AdminContact() {
  const { contact, fetchData, updateContact, saveData } = useContentStore();
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

  const addSocialLink = () => {
    const newLink: SocialLink = {
      platform: 'New Platform',
      url: '',
      icon: 'Book',
    };
    updateContact({ socialLinks: [...contact.socialLinks, newLink] });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: any) => {
    const newLinks = [...contact.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateContact({ socialLinks: newLinks });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = contact.socialLinks.filter((_, i) => i !== index);
    updateContact({ socialLinks: newLinks });
  };

  const addFormType = () => {
    updateContact({ formTypes: [...contact.formTypes, '新类型'] });
  };

  const updateFormType = (index: number, value: string) => {
    const newTypes = [...contact.formTypes];
    newTypes[index] = value;
    updateContact({ formTypes: newTypes });
  };

  const removeFormType = (index: number) => {
    const newTypes = contact.formTypes.filter((_, i) => i !== index);
    updateContact({ formTypes: newTypes });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          📧 联系信息管理
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

      {/* Basic Contact Info */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-400">
        <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          📱 基本联系信息
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">邮箱</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">微信</label>
            <input
              type="text"
              value={contact.wechat}
              onChange={(e) => updateContact({ wechat: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">电话</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <label className="text-sm font-bold text-gray-700">自动回复消息</label>
          <textarea
            value={contact.autoReplyMessage}
            onChange={(e) => updateContact({ autoReplyMessage: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
            rows={3}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-400">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            🔗 社交媒体链接
          </h2>
          <button
            onClick={addSocialLink}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 font-bold rounded-xl hover:bg-pink-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            添加链接
          </button>
        </div>
        
        <div className="space-y-4">
          {contact.socialLinks.map((link, index) => (
            <div key={index} className="flex gap-3 items-center p-4 bg-pink-50 rounded-2xl border-2 border-pink-200">
              <div className="flex items-center gap-2 text-pink-600">
                <Link2 className="w-5 h-5" />
              </div>
              <select
                value={link.icon}
                onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                className="px-3 py-2 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-800 focus:border-pink-500 bg-white"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <input
                type="text"
                value={link.platform}
                onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
                placeholder="平台名称"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
                placeholder="链接 URL"
              />
              <button
                onClick={() => removeSocialLink(index)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Types */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-400">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            📋 表单类型选项
          </h2>
          <button
            onClick={addFormType}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 font-bold rounded-xl hover:bg-pink-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            添加类型
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {contact.formTypes.map((type, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={type}
                onChange={(e) => updateFormType(index, e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
              />
              <button
                onClick={() => removeFormType(index)}
                className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
