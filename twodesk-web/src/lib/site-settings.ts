import { supabasePublic } from '@/lib/supabase/public';

/**
 * อ่าน site_settings ทั้งหมดเป็น map { key: value } (server-side, anon + RLS).
 * value ใน DB เป็น jsonb — string ถูกเก็บเป็น JSON string เลย map เป็น string ตรงๆ
 */
export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const { data } = await supabasePublic
      .from('site_settings')
      .select('key, value');
    const out: Record<string, string> = {};
    for (const row of data ?? []) {
      out[row.key] =
        typeof row.value === 'string' ? row.value : String(row.value ?? '');
    }
    return out;
  } catch {
    return {};
  }
}
