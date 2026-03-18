'use client';

import { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  type: string;
  contact: string;
  content: string;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">留言管理 ({messages.length})</h1>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> 刷新
        </button>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border text-gray-500">
            暂无留言数据
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{msg.name}</h3>
                    <p className="text-sm text-gray-500">{msg.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                    {msg.type}
                  </span>
                  <span>{new Date(msg.createdAt).toLocaleString('zh-CN')}</span>
                </div>
              </div>
              <div className="pl-13 md:pl-13">
                 <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm leading-relaxed">
                   {msg.content}
                 </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
