"use client";

import { useEffect, useState } from "react";
import { useContentStore, TimelineItem } from "@/store/useContentStore";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function AdminAbout() {
  const { aboutMe, fetchData, updateAboutMe, saveData, isLoading } = useContentStore();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveData();
    setIsSaving(false);
  };

  // Timeline Handlers
  const addTimelineItem = () => {
    const newItem: TimelineItem = {
      id: uuidv4(),
      time: new Date().getFullYear().toString(),
      event: "新事件",
      category: "职场经历",
      result: "",
      isSticky: false,
    };
    updateAboutMe({ timeline: [newItem, ...aboutMe.timeline] });
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: any) => {
    const newTimeline = [...aboutMe.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    updateAboutMe({ timeline: newTimeline });
  };

  const removeTimelineItem = (index: number) => {
    const newTimeline = aboutMe.timeline.filter((_, i) => i !== index);
    updateAboutMe({ timeline: newTimeline });
  };

  // Ability Tags Handler
  const handleAbilityTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(/,\s*/).filter(Boolean);
    updateAboutMe({ abilityTags: tags });
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
        <h1 className="text-3xl font-bold">关于我 (About Me)</h1>
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
          <h2 className="text-xl font-semibold border-b pb-2">基本信息</h2>
          
          {/* Value Sentence */}
          <div className="space-y-2">
            <label className="text-sm font-medium">价值主张 (Value Sentence)</label>
            <input
              type="text"
              value={aboutMe.valueSentence}
              onChange={(e) => updateAboutMe({ valueSentence: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Ability Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium">能力标签 (Ability Tags, 逗号分隔)</label>
            <input
              type="text"
              value={aboutMe.abilityTags.join(', ')}
              onChange={handleAbilityTagsChange}
              placeholder="Marketing, FA, 游戏策划"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">经历时间轴 (Timeline)</h2>
            <button
              onClick={addTimelineItem}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" /> 添加经历
            </button>
          </div>
          
          <div className="space-y-4">
            {aboutMe.timeline.map((item, index) => (
              <div key={item.id} className={`p-4 border rounded-lg ${item.isSticky ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100'}`}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3">
                  {/* Time */}
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 block mb-1">时间</label>
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => updateTimelineItem(index, 'time', e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  
                  {/* Category */}
                  <div className="md:col-span-3">
                    <label className="text-xs font-medium text-gray-500 block mb-1">类别</label>
                     <input
                      type="text"
                      value={item.category}
                      onChange={(e) => updateTimelineItem(index, 'category', e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>

                  {/* Event */}
                  <div className="md:col-span-7">
                    <label className="text-xs font-medium text-gray-500 block mb-1">事件 (Event)</label>
                    <input
                      type="text"
                      value={item.event}
                      onChange={(e) => updateTimelineItem(index, 'event', e.target.value)}
                      className="w-full p-2 border rounded text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-medium text-gray-500 block mb-1">结果/成就 (Result)</label>
                  <textarea
                    value={item.result}
                    onChange={(e) => updateTimelineItem(index, 'result', e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    rows={2}
                  />
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.isSticky}
                      onChange={(e) => updateTimelineItem(index, 'isSticky', e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={item.isSticky ? "text-indigo-600 font-medium" : "text-gray-600"}>
                      置顶高亮 (Sticky)
                    </span>
                  </label>
                  <button
                    onClick={() => removeTimelineItem(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {aboutMe.timeline.length === 0 && (
               <p className="text-center text-gray-500 text-sm py-4">暂无经历，点击右上角添加</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
