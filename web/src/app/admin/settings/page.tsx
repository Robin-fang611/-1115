"use client";

import { useEffect, useState } from 'react';
import { useContentStore } from "@/store/useContentStore";
import { Loader2, Save } from "lucide-react";

export default function AdminSettings() {
  const { 
    global, 
    contact, 
    aboutMe,
    fetchData, 
    updateGlobal, 
    updateContact, 
    updateAboutMe,
    saveData, 
    isLoading 
  } = useContentStore();
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveData();
    setIsSaving(false);
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
        <h1 className="text-3xl font-bold">全局与联系设置</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          保存更改
        </button>
      </div>
      
      <div className="grid gap-8">
        {/* Home Right Column Settings */}
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold border-b pb-2">首页右侧信息</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">专家标签 (Expert Label)</label>
              <input
                type="text"
                value={aboutMe?.expertOn || ''}
                onChange={(e) => updateAboutMe({ expertOn: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">所在地 (Location)</label>
              <input
                type="text"
                value={useContentStore.getState().aboutMe?.location || ''}
                onChange={(e) => useContentStore.getState().updateAboutMe({ location: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">职业角色 (Role)</label>
            <input
              type="text"
              value={useContentStore.getState().aboutMe?.role || ''}
              onChange={(e) => useContentStore.getState().updateAboutMe({ role: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">简介短文 (Value Sentence)</label>
            <textarea
              value={aboutMe?.valueSentence || ''}
              onChange={(e) => updateAboutMe({ valueSentence: e.target.value })}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={3}
            />
          </div>
        </div>

        {/* Global Settings */}
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold border-b pb-2">基础信息</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">网站标题 (Site Title)</label>
              <input
                type="text"
                value={global.siteTitle}
                onChange={(e) => updateGlobal({ siteTitle: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo 文本</label>
              <input
                type="text"
                value={global.logoText}
                onChange={(e) => updateGlobal({ logoText: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">联系邮箱 (用于接收通知)</label>
              <input
                type="email"
                value={global.contactEmail}
                onChange={(e) => updateGlobal({ contactEmail: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <label className="text-sm font-medium block">流动特效 (Text Flow)</label>
              <span className="text-xs text-muted-foreground">控制全站文字流动动画的开启与关闭</span>
            </div>
            <button
              onClick={() => updateGlobal({ isFlowTextEnabled: !global.isFlowTextEnabled })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                global.isFlowTextEnabled ? "bg-black" : "bg-gray-200"
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                global.isFlowTextEnabled ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-xl font-semibold">留言设置</h2>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">自动回复语 (Auto Reply)</label>
            <textarea
              value={contact.autoReplyMessage}
              onChange={(e) => updateContact({ autoReplyMessage: e.target.value })}
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">表单类型 (逗号分隔)</label>
            <input
              type="text"
              value={contact.formTypes.join(', ')}
              onChange={(e) => updateContact({ formTypes: e.target.value.split(/,\s*/).filter(Boolean) })}
              placeholder="合作咨询, 粉丝提问, 业务对接"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <p className="text-xs text-muted-foreground">用户在留言时可选择的类型选项</p>
          </div>
        </div>
      </div>
    </div>
  );
}
