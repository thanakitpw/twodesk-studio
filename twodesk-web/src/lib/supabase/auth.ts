import { NextResponse } from 'next/server';
import { createClient } from './server';
import { supabaseAdmin } from './admin';

type Gate =
  | { ok: true; userId: string; email: string }
  | { ok: false; error: NextResponse };

/**
 * Guard for /api/admin/* route handlers.
 *
 * proxy.ts ไม่ครอบ /api (matcher exclude) — ทุก admin API ต้องเรียกตัวนี้เอง
 * ใช้ getUser() (revalidate token กับ Supabase Auth server) ไม่ใช่ getSession()
 * แล้วเช็ค role จากตาราง users (super_admin | admin). ถ้ายังไม่มี row (ช่วง bootstrap)
 * ให้ผ่านได้ เพราะ session ผ่านการ verify แล้ว
 *
 * ใช้:
 *   const gate = await requireAdmin();
 *   if (!gate.ok) return gate.error;
 */
export async function requireAdmin(): Promise<Gate> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      ok: false,
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  const { data: row } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (row && !['super_admin', 'admin'].includes(row.role as string)) {
    return {
      ok: false,
      error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    };
  }

  return { ok: true, userId: user.id, email: user.email ?? '' };
}
