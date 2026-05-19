import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/supabase/auth';

// GET /api/admin/users — list ทีม
export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.error;

  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, email, name, nickname, role, avatar_url, created_at')
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users: data });
}

// POST /api/admin/users — สร้าง user ใหม่ (auth + แถว users)
export async function POST(request: NextRequest) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.error;

  const body = await request.json();
  const { email, password, name, nickname, role } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: 'email และ password จำเป็น' },
      { status: 400 }
    );
  }
  if (role && !['super_admin', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'role ไม่ถูกต้อง' }, { status: 400 });
  }

  const { data: created, error: authErr } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authErr || !created.user) {
    return NextResponse.json(
      { error: authErr?.message ?? 'สร้าง auth user ไม่สำเร็จ' },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('users')
    .insert({
      id: created.user.id,
      email,
      name: name ?? null,
      nickname: nickname ?? null,
      role: role ?? 'admin',
    })
    .select()
    .single();

  if (error) {
    // rollback auth user ถ้า insert แถวพลาด
    await supabaseAdmin.auth.admin.deleteUser(created.user.id);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
