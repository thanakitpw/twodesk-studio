import { test, expect } from '@playwright/test';

// Regression guard สำหรับช่องโหว่ P0 เดิม: /api/admin/* เคยเปิดให้ทุกคนยิงได้
// ทุก endpoint ต้องตอบ 401 เมื่อไม่มี session

const GET_ENDPOINTS = [
  '/api/admin/projects',
  '/api/admin/articles',
  '/api/admin/messages',
  '/api/admin/media',
  '/api/admin/settings',
  '/api/admin/users',
];

test.describe('admin API requires auth', () => {
  for (const url of GET_ENDPOINTS) {
    test(`GET ${url} → 401 without session`, async ({ request }) => {
      const res = await request.get(url);
      expect(res.status()).toBe(401);
    });
  }

  test('POST /api/admin/projects → 401 without session', async ({ request }) => {
    const res = await request.post('/api/admin/projects', {
      data: { title_en: 'hack' },
    });
    expect(res.status()).toBe(401);
  });

  test('DELETE /api/admin/articles/[id] → 401 without session', async ({
    request,
  }) => {
    const res = await request.delete(
      '/api/admin/articles/00000000-0000-0000-0000-000000000000'
    );
    expect(res.status()).toBe(401);
  });
});
