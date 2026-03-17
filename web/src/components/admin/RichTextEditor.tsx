'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// 内部编辑器组件 - 只在客户端渲染
function EditorInner({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[200px] p-4 text-gray-800',
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div className="min-h-[200px] p-4 bg-white border-2 border-gray-300 rounded-xl">Loading editor...</div>;
  }

  return (
    <div className="border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 transition-all">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded text-sm underline ${editor.isActive('underline') ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('strike') ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          S
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('highlight') ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          🖍️
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          H3
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          1. List
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive({ textAlign: 'left' }) ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          ⬅️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive({ textAlign: 'center' }) ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          ⬇️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive({ textAlign: 'right' }) ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          ➡️
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => {
            const url = prompt('请输入链接 URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('link') ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          🔗
        </button>
        <div className="relative">
          <button
            onClick={() => {
              const url = prompt('请输入图片 URL:');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
            className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100"
          >
            🖼️ URL
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const formData = new FormData();
                formData.append('file', file);
                
                try {
                  const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                  });
                  
                  const result = await response.json();
                  if (result.success) {
                    editor.chain().focus().setImage({ src: result.url }).run();
                  } else {
                    alert('图片上传失败：' + result.error);
                  }
                } catch (error) {
                  alert('图片上传失败，请重试');
                }
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <button
          onClick={() => {
            const url = prompt('请输入视频 URL (支持 B 站、YouTube 等):');
            if (url) {
              // 生成视频嵌入代码
              let embedHtml = '';
              
              // 处理 B 站视频
              if (url.includes('bilibili.com') || url.includes('b23.tv')) {
                // 提取 BV 号或 av 号
                const bvMatch = url.match(/BV[\w]+/);
                const avMatch = url.match(/av\d+/);
                if (bvMatch) {
                  const bv = bvMatch[0];
                  embedHtml = `<iframe src="//player.bilibili.com/player.html?aid=&bvid=${bv}&cid=&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="w-full h-64 md:h-96 rounded-lg"></iframe>`;
                } else if (avMatch) {
                  const av = avMatch[0];
                  embedHtml = `<iframe src="//player.bilibili.com/player.html?aid=${av.replace('av', '')}&bvid=&cid=&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="w-full h-64 md:h-96 rounded-lg"></iframe>`;
                } else {
                  embedHtml = `<div class="p-4 bg-gray-100 rounded-lg text-center"><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">点击观看视频</a></div>`;
                }
              } 
              // 处理 YouTube 视频
              else if (url.includes('youtube.com') || url.includes('youtu.be')) {
                let videoId = '';
                if (url.includes('youtu.be')) {
                  videoId = url.split('/').pop() || '';
                } else {
                  const match = url.match(/v=([^&]+)/);
                  videoId = match ? match[1] : '';
                }
                if (videoId) {
                  embedHtml = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-64 md:h-96 rounded-lg"></iframe>`;
                } else {
                  embedHtml = `<div class="p-4 bg-gray-100 rounded-lg text-center"><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">点击观看视频</a></div>`;
                }
              }
              // 其他视频平台或直接链接
              else {
                embedHtml = `<div class="p-4 bg-gray-100 rounded-lg text-center"><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">点击观看视频</a></div>`;
              }
              
              // 插入到编辑器
              editor.chain().focus().insertContent(embedHtml).run();
            }
          }}
          className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100"
        >
          📹 视频
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="bg-white"
      />
    </div>
  );
}

// 主组件 - 处理客户端渲染
export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-[200px] p-4 bg-white border-2 border-gray-300 rounded-xl">Loading editor...</div>;
  }

  return <EditorInner content={content} onChange={onChange} placeholder={placeholder} />;
}
