"use client";

import { useEffect, useState } from "react";
import { useContentStore, ArticleItem } from "@/store/useContentStore";
import { Save, Loader2, Plus, Trash2, Layout, BookOpen } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

export default function AdminNotes() {
  const { 
    entrepreneurship, 
    growthNotes, 
    fetchData, 
    updateEntrepreneurship, 
    updateGrowthNotes, 
    saveData, 
    isLoading 
  } = useContentStore();
  
  const [activeTab, setActiveTab] = useState<"entrepreneurship" | "growthNotes">("entrepreneurship");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveData();
    setIsSaving(false);
  };

  // --- Entrepreneurship Handlers ---
  const handleEntChange = (field: "title" | "description", value: string) => {
    updateEntrepreneurship({ [field]: value });
  };

  const handleEntCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(/,\s*/).filter(Boolean);
    updateEntrepreneurship({ categories });
  };

  const addEntArticle = () => {
    const newArticle: ArticleItem = {
      id: uuidv4(),
      title: "新文章",
      cover: "",
      summary: "",
      publishDate: new Date().toISOString().split('T')[0],
      views: 0,
      isSticky: false,
      category: entrepreneurship.categories[0] || ""
    };
    updateEntrepreneurship({ articles: [newArticle, ...entrepreneurship.articles] });
  };

  const updateEntArticle = (index: number, field: string, value: any) => {
    const newArticles = [...entrepreneurship.articles];
    // @ts-ignore
    newArticles[index] = { ...newArticles[index], [field]: value };
    updateEntrepreneurship({ articles: newArticles });
  };

  const removeEntArticle = (index: number) => {
    const newArticles = entrepreneurship.articles.filter((_, i) => i !== index);
    updateEntrepreneurship({ articles: newArticles });
  };

  // --- Growth Notes Handlers ---
  const handleGrowthCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(/,\s*/).filter(Boolean);
    updateGrowthNotes({ categories });
  };

  const addGrowthArticle = () => {
    const newArticle: ArticleItem = {
      id: uuidv4(),
      title: "新笔记",
      cover: "",
      summary: "",
      publishDate: new Date().toISOString().split('T')[0],
      views: 0,
      isSticky: false,
      category: growthNotes.categories[0] || ""
    };
    updateGrowthNotes({ articles: [newArticle, ...growthNotes.articles] });
  };

  const updateGrowthArticle = (index: number, field: string, value: any) => {
    const newArticles = [...growthNotes.articles];
    // @ts-ignore
    newArticles[index] = { ...newArticles[index], [field]: value };
    updateGrowthNotes({ articles: newArticles });
  };

  const removeGrowthArticle = (index: number) => {
    const newArticles = growthNotes.articles.filter((_, i) => i !== index);
    updateGrowthNotes({ articles: newArticles });
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">分享与手记 (Content)</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          保存更改
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab("entrepreneurship")}
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all",
            activeTab === "entrepreneurship"
              ? "bg-white text-black shadow"
              : "text-gray-500 hover:bg-white/[0.12] hover:text-black"
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Layout className="w-4 h-4" /> 创业分享 (Entrepreneurship)
          </div>
        </button>
        <button
          onClick={() => setActiveTab("growthNotes")}
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all",
            activeTab === "growthNotes"
              ? "bg-black text-white shadow"
              : "text-gray-500 hover:text-black"
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" /> 成长手记 (Growth Notes)
          </div>
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === "entrepreneurship" ? (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">板块设置</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">标题</label>
                <input
                  type="text"
                  value={entrepreneurship.title}
                  onChange={(e) => handleEntChange('title', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">描述</label>
                <textarea
                  value={entrepreneurship.description}
                  onChange={(e) => handleEntChange('description', e.target.value)}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">分类 (逗号分隔)</label>
                <input
                  type="text"
                  value={entrepreneurship.categories.join(', ')}
                  onChange={handleEntCategoriesChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold">文章列表</h2>
                <button
                  onClick={addEntArticle}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-4 h-4" /> 添加文章
                </button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {entrepreneurship.articles.map((article, index) => (
                  <ArticleEditor
                    key={article.id}
                    article={article}
                    categories={entrepreneurship.categories}
                    onChange={(field, value) => updateEntArticle(index, field, value)}
                    onRemove={() => removeEntArticle(index)}
                  />
                ))}
                {entrepreneurship.articles.length === 0 && (
                   <p className="col-span-2 text-center text-gray-500 text-sm py-4">暂无文章</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">板块设置</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">分类 (逗号分隔)</label>
                <input
                  type="text"
                  value={growthNotes.categories.join(', ')}
                  onChange={handleGrowthCategoriesChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>

             <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold">手记列表</h2>
                <button
                  onClick={addGrowthArticle}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-4 h-4" /> 添加手记
                </button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {growthNotes.articles.map((article, index) => (
                  <ArticleEditor
                    key={article.id}
                    article={article}
                    categories={growthNotes.categories}
                    onChange={(field, value) => updateGrowthArticle(index, field, value)}
                    onRemove={() => removeGrowthArticle(index)}
                  />
                ))}
                 {growthNotes.articles.length === 0 && (
                   <p className="col-span-2 text-center text-gray-500 text-sm py-4">暂无手记</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for editing a single article
function ArticleEditor({ 
  article, 
  categories, 
  onChange, 
  onRemove 
}: { 
  article: ArticleItem; 
  categories: string[]; 
  onChange: (field: string, value: any) => void; 
  onRemove: () => void; 
}) {
  return (
    <div className={`p-4 border rounded-lg space-y-3 ${article.isSticky ? 'border-indigo-500 bg-indigo-50/30' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start">
         <div className="flex-1 space-y-3">
            <input
              type="text"
              placeholder="标题"
              value={article.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full p-2 border rounded font-medium text-sm"
            />
            <div className="flex gap-2">
               <input
                type="date"
                value={article.publishDate}
                onChange={(e) => onChange('publishDate', e.target.value)}
                className="w-1/2 p-2 border rounded text-xs"
              />
              <input
                type="number"
                placeholder="阅读量"
                value={article.views || 0}
                onChange={(e) => onChange('views', parseInt(e.target.value) || 0)}
                className="w-1/3 p-2 border rounded text-xs"
              />
              <select
                value={article.category || ""}
                onChange={(e) => onChange('category', e.target.value)}
                className="w-1/2 p-2 border rounded text-xs"
              >
                <option value="">选择分类...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
         </div>
         <button onClick={onRemove} className="text-red-500 hover:text-red-700 p-1 ml-2">
            <Trash2 size={16} />
         </button>
      </div>

      <textarea
        placeholder="摘要"
        value={article.summary}
        onChange={(e) => onChange('summary', e.target.value)}
        className="w-full p-2 border rounded text-xs"
        rows={2}
      />
      
      <div className="space-y-2">
         <label className="text-xs font-medium text-gray-500 block">封面图 URL</label>
         <input
            type="text"
            value={article.cover}
            onChange={(e) => onChange('cover', e.target.value)}
            className="w-full p-2 border rounded text-xs"
          />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id={`pinned-${article.id}`}
          checked={article.isSticky || false}
          onChange={(e) => onChange('isSticky', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor={`pinned-${article.id}`} className="text-xs text-gray-700 cursor-pointer select-none">
          置顶 (Pinned)
        </label>
      </div>
    </div>
  );
}
