'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useContentStore } from '@/store/useContentStore';
import { Loader2, Send, MessageSquare } from 'lucide-react';

export function ContactModal({ children }: { children?: React.ReactNode }) {
  const { contact } = useContentStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: contact?.formTypes?.[0] || '合作咨询',
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert('留言提交成功！');
        setIsOpen(false);
        setFormData({ ...formData, content: '' });
      } else {
        alert('提交失败，请稍后重试');
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <MessageSquare size={18} />
            <span>留言板</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#1a1a1a] text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">给我留言</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">称呼</label>
              <input
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B6B] transition-colors"
                placeholder="您的称呼"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">联系方式</label>
              <input
                required
                value={formData.contact}
                onChange={e => setFormData({...formData, contact: e.target.value})}
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B6B] transition-colors"
                placeholder="邮箱或微信"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">类型</label>
            <select
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B6B] transition-colors"
            >
              {contact?.formTypes?.map(type => (
                <option key={type} value={type}>{type}</option>
              )) || <option>合作咨询</option>}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">留言内容</label>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B6B] transition-colors resize-none"
              placeholder="请详细描述您的需求..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              提交留言
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
