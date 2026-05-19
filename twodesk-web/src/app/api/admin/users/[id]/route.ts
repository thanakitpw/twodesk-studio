import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/supabase/auth';

// PATCH /api/admin/users/[id] — แก้ name/nickname/role (+ password ถ้าส่งมา)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.error;

  const { id } = await params;
  const body = await request.json();
  const { name, nickname, role, password } = body;

  if (role && !['super_admin', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'role ไม่ถูกต้อง' }, { status: 400 });
  }

  if (password) {
    const { error: pwErr } = await supabaseAdmin.auth.admin.updateUserById(id, {
      password,
    });
    if (pwErr)
      return NextResponse.json({ error: pwErr.message }, { status: 500 });
  }

  const patch: Record<string, unknown> = {};
  if (name !== undefined) patch.name = name;
  if (nickname !== undefined) patch.nickname = nickname;
  if (role !== undefined) patch.role = role;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ success: true });
  }

  const { data, error } = await supabaseAdmin
    .from('users')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE /api/admin/users/[id] — ลบ user (กันลบตัวเอง)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.error;

  const { id } = await params;
  if (id === gate.userId) {
    return NextResponse.json(
      { error: 'ลบบัญชีตัวเองไม่ได้' },
      { status: 400 }
    );
  }

  const { error: authErr } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (authErr)
    return NextResponse.json({ error: authErr.message }, { status: 500 });

  // เผื่อ FK ไม่ได้ cascade
  await supabaseAdmin.from('users').delete().eq('id', id);

  return NextResponse.json({ success: true });
}
