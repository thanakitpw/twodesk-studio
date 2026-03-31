'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import type { ImageGroup } from '@/lib/data';

interface ProjectGalleryProps {
  images: string[];
  imageGroups?: ImageGroup[];
  title: string;
}

function GalleryImage({
  img,
  alt,
  isLast,
  isOdd,
  index,
  onClick,
}: {
  img: string;
  alt: string;
  isLast: boolean;
  isOdd: boolean;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay based on index
          setTimeout(() => setVisible(true), (index % 4) * 120);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded ${
        isLast && isOdd ? 'aspect-[16/9] sm:col-span-2' : 'aspect-[4/3]'
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <Image
        src={img}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </button>
  );
}

export default function ProjectGallery({ images, imageGroups, title }: ProjectGalleryProps) {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [activeGroup, setActiveGroup] = useState(0);

  const groups = imageGroups && imageGroups.length > 0 ? imageGroups : [{ label: 'All', images }];
  const currentGroup = groups[activeGroup];

  return (
    <>
      {/* Group Tabs */}
      {groups.length > 1 && (
        <div className="mb-6 flex gap-2">
          {groups.map((group, i) => (
            <button
              key={group.label}
              onClick={() => setActiveGroup(i)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                activeGroup === i
                  ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                  : 'border-[#e5e5e5] bg-white text-[#666] hover:border-[#999]'
              }`}
            >
              {group.label}
              <span className="ml-1.5 text-[10px] opacity-60">{group.images.length}</span>
            </button>
          ))}
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
        {currentGroup.images.map((img, i) => (
          <GalleryImage
            key={`${activeGroup}-${img}`}
            img={img}
            alt={`${title} — ${currentGroup.label} ${i + 1}`}
            isLast={i === currentGroup.images.length - 1}
            isOdd={currentGroup.images.length % 2 !== 0}
            index={i}
            onClick={() => setLightbox({ images: currentGroup.images, index: i })}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
