import { createClient } from '@supabase/supabase-js';

/**
 * Anon client สำหรับหน้า public (server components).
 * ใช้ anon key → RLS บังคับให้เห็นเฉพาะ row ที่ published เท่านั้น
 * (ไม่ใช้ service role ที่ bypass RLS)
 */
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
