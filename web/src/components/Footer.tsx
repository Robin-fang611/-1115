'use client';

export function Footer() {
  return (
    <footer className="bg-white border-t-4 border-dashed border-pink-300 pt-12 pb-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <p className="text-2xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            💫 感谢访问 Robin's Island
          </p>
          <p className="text-gray-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            用作品说话，而非用简历说话
          </p>
        </div>
        
        <div className="border-t-2 border-dashed border-gray-300 pt-8">
          <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            © {new Date().getFullYear()} Robin's Island. Made with 💖 and 
          </p>
        </div>
      </div>
    </footer>
  );
}
