'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

function LightboxContent({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [closing, setClosing] = useState(false);
  const [entered, setEntered] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  const changeImage = useCallback((newIndex: number, dir: number) => {
    setDirection(dir);
    setImgVisible(false);
    setTimeout(() => {
      setIndex(newIndex);
      setImgVisible(true);
    }, 200);
  }, []);

  const prev = useCallback(() => {
    changeImage((index - 1 + images.length) % images.length, -1);
  }, [index, images.length, changeImage]);

  const next = useCallback(() => {
    changeImage((index + 1) % images.length, 1);
  }, [index, images.length, changeImage]);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setEntered(true));

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleClose, prev, next]);

  const isVisible = entered && !closing;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ zoom: 1 }}
      onClick={handleClose}
      style={{
        backgroundColor: isVisible ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0)',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Close button — moved down from top */}
      <button
        onClick={handleClose}
        className="absolute right-6 top-16 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s',
        }}
      >
        <span className="text-xl leading-none">&times;</span>
      </button>

      {/* Counter */}
      <div
        className="absolute left-6 top-16 z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease 0.1s',
        }}
      >
        <span className="font-[Helvetica] text-sm text-white/60">
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-12px)',
            transition: 'opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s',
          }}
        >
          <span className="text-2xl leading-none">&larr;</span>
        </button>
      )}

      {/* Image */}
      <div
        className="relative mx-16 h-[80vh] w-full max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            opacity: imgVisible ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          <Image
            src={images[index]}
            alt={`Image ${index + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(12px)',
            transition: 'opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s',
          }}
        >
          <span className="text-2xl leading-none">&rarr;</span>
        </button>
      )}
    </div>
  );
}

export default function Lightbox(props: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<LightboxContent {...props} />, document.body);
}
