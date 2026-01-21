'use client';

import { useEffect, useState } from "react";
import { useContentStore, ProjectTimelineItem } from "@/store/useContentStore";
import { Save, Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function AdminProjects() {
  const { projectProgress, fetchData, updateProjectProgress, saveData, isLoading } = useContentStore();
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
    const newItem: ProjectTimelineItem = {
      id: uuidv4(),
      type: 'module',
      title: 'New Module',
      date: '',
      content: '',
      images: []
    };
    // Add to the end
    updateProjectProgress({
      timeline: [...(projectProgress.timeline || []), newItem]
    });
  };

  const updateTimelineItem = (index: number, field: keyof ProjectTimelineItem, value: any) => {
    const newTimeline = [...(projectProgress.timeline || [])];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    updateProjectProgress({ timeline: newTimeline });
  };
  
  const updateItemImages = (index: number, images: string[]) => {
      updateTimelineItem(index, 'images', images);
  };

  const removeTimelineItem = (index: number) => {
    if (confirm('Are you sure you want to delete this module?')) {
        const newTimeline = (projectProgress.timeline || []).filter((_, i) => i !== index);
        updateProjectProgress({ timeline: newTimeline });
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
      const newTimeline = [...(projectProgress.timeline || [])];
      if (direction === 'up' && index > 0) {
          [newTimeline[index], newTimeline[index - 1]] = [newTimeline[index - 1], newTimeline[index]];
      } else if (direction === 'down' && index < newTimeline.length - 1) {
          [newTimeline[index], newTimeline[index + 1]] = [newTimeline[index + 1], newTimeline[index]];
      }
      updateProjectProgress({ timeline: newTimeline });
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between sticky top-0 bg-gray-50 py-4 z-10 border-b border-gray-200 mb-6">
        <h1 className="text-3xl font-bold">项目进展管理 (Projects Timeline)</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-lg"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          保存更改 (Save)
        </button>
      </div>

      <div className="space-y-6">
        {/* Brand Info (Global for Projects) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4">全局设置</h2>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Brand Name</label>
                    <input 
                        type="text" 
                        value={projectProgress.brandName} 
                        onChange={(e) => updateProjectProgress({ brandName: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Brand Slogan</label>
                    <input 
                        type="text" 
                        value={projectProgress.brandSlogan} 
                        onChange={(e) => updateProjectProgress({ brandSlogan: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    />
                 </div>
            </div>
        </div>

        {/* Timeline Items List */}
        {(projectProgress.timeline || []).map((item, index) => (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group">
                <div className="absolute top-4 right-4 flex gap-2">
                     <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30" title="Move Up">↑</button>
                     <button onClick={() => moveItem(index, 'down')} disabled={index === (projectProgress.timeline?.length || 0) - 1} className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30" title="Move Down">↓</button>
                     <button onClick={() => removeTimelineItem(index)} className="p-2 text-red-400 hover:text-red-600" title="Delete"><Trash2 size={18} /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left: Type & Date */}
                    <div className="md:col-span-3 space-y-4">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                            <span className="text-xl font-bold text-gray-400">#{index + 1}</span>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Type</label>
                            <select 
                                value={item.type || 'module'} 
                                onChange={(e) => updateTimelineItem(index, 'type', e.target.value)}
                                className="w-full p-2 border rounded-md bg-white text-sm"
                            >
                                <option value="brand">Brand / Button (Header)</option>
                                <option value="module">Standard Module</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date / Status</label>
                            <input 
                                type="text" 
                                value={item.date} 
                                onChange={(e) => updateTimelineItem(index, 'date', e.target.value)}
                                className="w-full p-2 border rounded-md text-sm"
                                placeholder="e.g. 2024 Q1"
                            />
                        </div>
                    </div>

                    {/* Middle: Content */}
                    <div className="md:col-span-9 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title</label>
                            <input 
                                type="text" 
                                value={item.title} 
                                onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                                className="w-full p-2 border rounded-md font-medium"
                                placeholder="Module Title"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Content (Markdown / Text)</label>
                            <textarea 
                                value={item.content} 
                                onChange={(e) => updateTimelineItem(index, 'content', e.target.value)}
                                className="w-full p-2 border rounded-md font-mono text-sm h-32"
                                placeholder="Description or list..."
                            />
                        </div>

                        {/* Images Section */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                                    <ImageIcon size={14} /> Images ({item.images?.length || 0})
                                </label>
                                <button 
                                    onClick={() => updateItemImages(index, [...(item.images || []), '/placeholder.jpg'])}
                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    <Plus size={12} /> Add Image
                                </button>
                            </div>
                            <div className="space-y-2">
                                {(item.images || []).map((img, imgIdx) => (
                                    <div key={imgIdx} className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={img} 
                                            onChange={(e) => {
                                                const newImages = [...(item.images || [])];
                                                newImages[imgIdx] = e.target.value;
                                                updateItemImages(index, newImages);
                                            }}
                                            className="flex-1 p-2 border rounded-md text-xs"
                                            placeholder="Image URL"
                                        />
                                        <button 
                                            onClick={() => {
                                                const newImages = (item.images || []).filter((_, i) => i !== imgIdx);
                                                updateItemImages(index, newImages);
                                            }}
                                            className="text-red-400 hover:text-red-600 p-1"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}

        <button 
            onClick={addTimelineItem}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2 transition-colors"
        >
            <Plus size={20} /> Add New Module
        </button>
      </div>
    </div>
  );
}
