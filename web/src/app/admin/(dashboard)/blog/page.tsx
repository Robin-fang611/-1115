'use client';

import { useEffect, useState } from 'react';
import { useContentStore, BlogArticle } from '@/store/useContentStore';
import { Save, Loader2, Plus, Trash2, Edit2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

export default function AdminBlog() {
  const { blog, fetchData, updateBlog, saveData } = useContentStore();
  const [isSaving, setIsSaving] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState('全部');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveData();
      alert('保存成功!');
      if (editingArticle) {
        setEditingArticle(null);
      }
    } catch (error) {
      alert('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const addArticle = () => {
    const newArticle: BlogArticle = {
      id: uuidv4(),
      title: '新文章',
      cover: '',
      summary: '',
      content: '<p>开始写作...</p>',
      publishDate: new Date().toISOString().split('T')[0],
      isSticky: false,
      category: '成长手记',
    };
    updateBlog({ articles: [newArticle, ...blog.articles] });
    setEditingArticle(newArticle);
  };

  const updateArticle = (index: number, field: keyof BlogArticle, value: any) => {
    const newArticles = [...blog.articles];
    newArticles[index] = { ...newArticles[index], [field]: value };
    updateBlog({ articles: newArticles });
  };

  const removeArticle = (index: number) => {
    const newArticles = blog.articles.filter((_, i) => i !== index);
    updateBlog({ articles: newArticles });
  };

  const filteredArticles = blog.articles.filter(article => 
    activeCategory === '全部' || article.category === activeCategory
  );

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          📝 Blog 文章管理
        </h1>
        <div className="flex gap-3">
          <button
            onClick={addArticle}
            className="flex items-center gap-2 px-6 py-3 bg-pink-100 text-pink-700 font-bold rounded-xl hover:bg-pink-200 transition-all"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Plus className="w-4 h-4" />
            添加文章
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

      {/* Category Filter */}
      <div className="flex gap-3">
        {blog.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${
              activeCategory === cat
                ? 'bg-pink-500 text-white border-pink-500 shadow-md'
                : 'bg-white text-gray-700 border-gray-300 hover:border-pink-400 hover:bg-pink-50'
            }`}
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="grid gap-6">
        {filteredArticles.map((article, index) => (
          <div key={article.id} className="bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-400">
            {editingArticle?.id === article.id ? (
              // Edit Mode
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => {
                      const idx = blog.articles.findIndex(a => a.id === article.id);
                      if (idx !== -1) updateArticle(idx, 'title', e.target.value);
                    }}
                    className="flex-1 text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none bg-transparent"
                    style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  />
                  <select
                    value={article.category}
                    onChange={(e) => {
                      const idx = blog.articles.findIndex(a => a.id === article.id);
                      if (idx !== -1) updateArticle(idx, 'category', e.target.value);
                    }}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-800 focus:border-pink-500"
                  >
                    {blog.categories.filter(c => c !== '全部').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={article.publishDate}
                    onChange={(e) => {
                      const idx = blog.articles.findIndex(a => a.id === article.id);
                      if (idx !== -1) updateArticle(idx, 'publishDate', e.target.value);
                    }}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-800 focus:border-pink-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">封面图片 URL</label>
                  <input
                    type="text"
                    value={article.cover}
                    onChange={(e) => {
                      const idx = blog.articles.findIndex(a => a.id === article.id);
                      if (idx !== -1) updateArticle(idx, 'cover', e.target.value);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">摘要</label>
                  <textarea
                    value={article.summary}
                    onChange={(e) => {
                      const idx = blog.articles.findIndex(a => a.id === article.id);
                      if (idx !== -1) updateArticle(idx, 'summary', e.target.value);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-800"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">文章内容 (支持富文本编辑)</label>
                  <RichTextEditor
                    content={article.content || '<p>开始写作...</p>'}
                    onChange={(content) => {
                      const idx = blog.articles.findIndex(a => a.id === article.id);
                      if (idx !== -1) updateArticle(idx, 'content', content);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={article.isSticky}
                      onChange={(e) => {
                        const idx = blog.articles.findIndex(a => a.id === article.id);
                        if (idx !== -1) updateArticle(idx, 'isSticky', e.target.checked);
                      }}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="font-bold text-gray-800">📌 置顶文章</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingArticle(null)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                      style={{ fontFamily: 'Comic Sans MS, cursive' }}
                    >
                      取消编辑
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        {article.isSticky && '📌 '}
                        {article.title}
                      </h3>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 text-sm font-bold rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{article.publishDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingArticle(article)}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 font-bold rounded-xl hover:bg-pink-200 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        const idx = blog.articles.findIndex(a => a.id === article.id);
                        if (idx !== -1) removeArticle(idx);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold"
                    >
                      <Trash2 className="w-4 h-4" />
                      删除
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{article.summary}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
