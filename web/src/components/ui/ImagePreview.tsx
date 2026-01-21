"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
  images?: string[]; // Optional list for gallery mode
  initialIndex?: number; // Index in the list
}

export function ImagePreview({ src, alt, className, images = [], initialIndex = 0 }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // If no images array provided, treat as single image
  const galleryImages = images.length > 0 ? images : [src];
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const openModal = () => {
    setCurrentIndex(initialIndex);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setScale(1);
  };

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => (prev === 1 ? 2.5 : 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [isOpen, galleryImages.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div 
        className={clsx("cursor-pointer overflow-hidden relative group", className)} 
        onClick={openModal}
      >
        <Image 
            src={src} 
            alt={alt} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
            }}
            unoptimized={src.startsWith('http')}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <ZoomIn className="text-white drop-shadow-md" />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeModal}>
          {/* Controls */}
          <button 
            onClick={closeModal} 
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50 transition-colors"
          >
            <X size={32} />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all z-50"
              >
                <ChevronLeft size={40} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all z-50"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}
          
          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={galleryImages[currentIndex]} 
              alt={`Gallery image ${currentIndex + 1}`} 
              className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out cursor-zoom-in"
              style={{ transform: `scale(${scale})` }}
              onClick={handleZoom}
            />
          </div>
          
          {/* Footer Info */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
            {galleryImages.length > 1 && (
               <div className="text-white/90 font-medium text-lg tracking-widest">
                 {currentIndex + 1} / {galleryImages.length}
               </div>
            )}
            <div className="text-white/50 text-xs bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
              Click/Tap to Zoom • Swipe/Arrow to Navigate
            </div>
          </div>
        </div>
      )}
    </>
  );
}
