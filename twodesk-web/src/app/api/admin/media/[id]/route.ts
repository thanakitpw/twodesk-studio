import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/supabase/auth';

// DELETE /api/admin/media/[id] — delete media record
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.error;

  const { id } = await params;
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'media';

  // ดึง url มาก่อน เพื่อลบไฟล์ใน storage (เฉพาะไฟล์ที่อยู่ใน bucket เรา;
  // row ที่เป็น external URL ข้ามไป)
  const { data: row } = await supabaseAdmin
    .from('media')
    .select('url')
    .eq('id', id)
    .maybeSingle();

  const { error } = await supabaseAdmin
    .from('media')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (row?.url) {
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const idx = row.url.indexOf(marker);
    if (idx !== -1) {
      const path = decodeURIComponent(row.url.slice(idx + marker.length));
      await supabaseAdmin.storage.from(BUCKET).remove([path]);
    }
  }

  return NextResponse.json({ success: true });
}
