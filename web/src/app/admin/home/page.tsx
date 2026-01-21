"use client";

import { useEffect, useState } from "react";
import { useContentStore, SocialLink } from "@/store/useContentStore";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

export default function AdminHome() {
  const { home, fetchData, updateHome, saveData, isLoading } = useContentStore();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveData();
    setIsSaving(false);
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
    const newSocials = [...home.socialLinks];
    newSocials[index] = { ...newSocials[index], [field]: value };
    updateHome({ socialLinks: newSocials });
  };

  const addSocialLink = () => {
    updateHome({
      socialLinks: [...home.socialLinks, { platform: "", url: "", icon: "default" }]
    });
  };

  const removeSocialLink = (index: number) => {
    const newSocials = home.socialLinks.filter((_, i) => i !== index);
    updateHome({ socialLinks: newSocials });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">首页管理</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          保存更改
        </button>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">核心内容</h2>
          
          {/* Slogan */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Slogan (标语)</label>
            <input
              type="text"
              value={home.slogan}
              onChange={(e) => updateHome({ slogan: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Dynamic Update */}
          <div className="space-y-2">
            <label className="text-sm font-medium">动态更新 (Dynamic Update)</label>
            <input
              type="text"
              value={home.dynamicUpdate}
              onChange={(e) => updateHome({ dynamicUpdate: e.target.value })}
              placeholder="e.g., 新项目「Cheat」上新"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium">封面图片 URL</label>
            <input
              type="text"
              value={home.coverImage}
              onChange={(e) => updateHome({ coverImage: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {home.coverImage && (
              <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md bg-gray-100">
                 <img src={home.coverImage} alt="Cover Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
             <h2 className="text-xl font-semibold">社交链接</h2>
             <button
               onClick={addSocialLink}
               className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
             >
               <Plus className="w-4 h-4" /> 添加链接
             </button>
          </div>

          <div className="space-y-4">
            {home.socialLinks.map((link, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-2">
                   <input
                     type="text"
                     placeholder="平台名称 (e.g. WeChat)"
                     value={link.platform}
                     onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                     className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                   />
                   <input
                     type="text"
                     placeholder="URL / ID"
                     value={link.url}
                     onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                     className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                   />
                    <input
                     type="text"
                     placeholder="Icon Key (e.g. wechat, github)"
                     value={link.icon}
                     onChange={(e) => handleSocialChange(index, "icon", e.target.value)}
                     className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                   />
                </div>
                <button
                  onClick={() => removeSocialLink(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {home.socialLinks.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-4">暂无社交链接，点击右上角添加</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
