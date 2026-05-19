'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { adminFetch } from '@/lib/admin-fetch';

interface ImageUploadFieldProps {
  /** single: string | multi: string[] */
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  label?: string;
}

export default function ImageUploadField({
  value,
  onChange,
  multiple = false,
  label,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const urls: string[] = multiple
    ? (Array.isArray(value) ? value : [])
    : value
      ? [value as string]
      : [];

  async function uploadOne(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append('file', file);
    const res = await adminFetch('/api/admin/media/upload', {
      method: 'POST',
      body: fd,
    });
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: 'Upload failed' }));
      toast.error(`${file.name}: ${error}`);
      return null;
    }
    const data = await res.json();
    return data.url as string;
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const list = Array.from(files);
      if (multiple) {
        const uploaded: string[] = [];
        for (const f of list) {
          const url = await uploadOne(f);
          if (url) uploaded.push(url);
        }
        if (uploaded.length) {
          onChange([...(Array.isArray(value) ? value : []), ...uploaded]);
          toast.success(`อัปโหลด ${uploaded.length} รูปสำเร็จ`);
        }
      } else {
        const url = await uploadOne(list[0]);
        if (url) {
          onChange(url);
          toast.success('อัปโหลดรูปสำเร็จ');
        }
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function removeAt(idx: number) {
    if (multiple) {
      const next = urls.filter((_, i) => i !== idx);
      onChange(next);
    } else {
      onChange('');
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="text-[13px] font-medium text-neutral-700">{label}</span>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6 text-center text-[13px] transition-colors ${
          dragging
            ? 'border-neutral-900 bg-neutral-50'
            : 'border-neutral-300 hover:border-neutral-400'
        }`}
      >
        <span className="text-neutral-600">
          {uploading
            ? 'กำลังอัปโหลด...'
            : 'ลากรูปมาวาง หรือคลิกเพื่อเลือกไฟล์'}
        </span>
        <span className="mt-1 text-[11px] text-neutral-400">
          JPG / PNG / WEBP / AVIF / GIF / SVG · สูงสุด 10MB
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {urls.map((u, i) => (
            <div
              key={`${u}-${i}`}
              className="group relative h-20 w-20 overflow-hidden rounded-md border border-neutral-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={u}
                alt=""
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(i);
                }}
                className="absolute right-0.5 top-0.5 rounded bg-black/60 px-1.5 text-[11px] leading-tight text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="ลบรูป"
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
