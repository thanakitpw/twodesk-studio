import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/supabase/auth';

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'media';
const ALLOWED = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
];
const MAX_BYTES = 10 * 1024 * 1024; // 10MB

// POST /api/admin/media/upload — รับไฟล์ (multipart) → Supabase Storage → insert media row
export async function POST(request: NextRequest) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.error;

  const form = await request.formData();
  const file = form.get('file');
  const altText = (form.get('alt_text') as string) || '';

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type: ${file.type}` },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'File exceeds 10MB limit' },
      { status: 400 }
    );
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const safeBase = file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .slice(0, 60);
  const path = `${Date.now()}-${safeBase}.${ext}`;

  const { error: upErr } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

  const { data, error } = await supabaseAdmin
    .from('media')
    .insert({
      url: publicUrl,
      filename: file.name,
      size_bytes: file.size,
      mime_type: file.type,
      alt_text: altText,
      uploaded_by: gate.userId,
    })
    .select()
    .single();

  if (error) {
    // rollback storage object ถ้า insert row พลาด
    await supabaseAdmin.storage.from(BUCKET).remove([path]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
