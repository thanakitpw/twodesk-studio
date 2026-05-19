'use client';

/**
 * fetch wrapper สำหรับหน้า admin — ถ้า session หมดอายุ (API ตอบ 401)
 * เด้งกลับไปหน้า login อัตโนมัติ. ใช้แทน fetch ตรงๆ ใน client component ของ admin.
 */
export async function adminFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status === 401 && typeof window !== 'undefined') {
    window.location.href = '/admin/login';
  }
  return res;
}
