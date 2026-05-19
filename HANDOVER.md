# TWO DESK — Admin CMS Handover

อัปเดต: 2026-05-19

## เข้าระบบ
- Admin URL: `https://<โดเมน>/admin` (เช่น twodesk-studio.vercel.app/admin)
- Login ด้วย email/password (Supabase Auth)
- ปุ่ม Sign out อยู่มุมล่างซ้ายของ sidebar
- ถ้า session หมดอายุ ระบบเด้งกลับหน้า login อัตโนมัติ

## บัญชี admin
- สร้างผ่านหน้า **Settings → Team → Add Member** (email, password, ชื่อ, role)
- role: `admin` (ทั่วไป) / `super_admin`
- ลบบัญชีตัวเองไม่ได้ (กันล็อกเอาท์ถาวร)
- บัญชีแรก seed ผ่าน service-role (ดู "ค้างดำเนินการ")

## โครงสร้างเนื้อหา
| เมนู | ทำอะไร |
|------|--------|
| Dashboard | สรุปจำนวน projects/articles/messages |
| Projects | CRUD โปรเจกต์ — TH/EN, cover + gallery (อัปโหลดเข้า Supabase Storage), Tiptap content, SEO |
| Blog | CRUD บทความ — TH/EN, cover, Tiptap content, SEO, สถานะ draft/published |
| Media | คลังรูป — อัปโหลด/ลบ (เก็บใน Supabase Storage bucket `media`) |
| Pages | แก้ Home (hero TH/EN), About, Contact → เก็บใน `site_settings` |
| Messages | กล่องข้อความจากฟอร์มติดต่อ — อ่าน/archive/ลบ |
| Settings | ข้อมูลบริษัท, ช่องทางติดต่อ, social, SEO |
| Settings → Team | จัดการผู้ใช้ admin |

- หน้า public แสดงเฉพาะ projects/articles ที่สถานะ **published**
- Home hero ดึงจาก `site_settings` (Pages → Home); ถ้าเว้นว่างใช้ข้อความ default
- Blog/Project detail render เนื้อหา Tiptap จริง; ถ้าไม่มี content ใช้ excerpt/description

## ความปลอดภัย (ทำแล้ว)
- proxy.ts ตรวจ session ด้วย `getUser()` (verify JWT) — admin page ต้อง login
- ทุก `/api/admin/*` ตรวจ `requireAdmin()` — ไม่มี session = 401
- RLS เปิดทุกตาราง: public อ่านได้เฉพาะ published + site_settings + media
- หน้า public ใช้ anon client (ไม่ใช่ service role)
- Playwright: `admin-api-security.spec.ts`, `admin-auth.spec.ts` (12 เทสต์ผ่าน)

## Supabase
- project ref ที่ใช้จริง (canonical): `ivslfjtahzkpdgoqjobh`
  (เลิกใช้ `fvssgqjchklkmtkureag` แล้ว — schema/seed อยู่ตัว canonical ครบ)
- Storage bucket: `media` (public, จำกัด 10MB, เฉพาะ image)
- env ที่ต้องตั้ง (ดู `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
  `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media`

## ค้างดำเนินการ
- [ ] **Seed admin user แรก** — รอ email/password (สร้างผ่าน service-role)
- [ ] ตั้ง custom domain + เพิ่ม env บน Vercel
- [ ] (เลื่อนออกไป) Analytics GA4/page-view dashboard
- [ ] (เลื่อนออกไป) Email Resend: แจ้งเตือนข้อความใหม่ + Quick Reply
- [ ] (hardening เสริม) รัด RLS policy `messages` ให้แคบลง — ตอนนี้ permissive
      โดยตั้งใจเพื่อให้ฟอร์มติดต่อ (anon) ส่งได้
- ลิงต์เดิมของ repo มี warning/error ค้าง (set-state-in-effect, no-img-element)
  เป็น tech debt เดิมก่อนงานนี้ — `npm run build` ผ่านปกติ

## About / Contact (หมายเหตุ)
หน้า About/Contact ฝั่ง public ยังใช้ next-intl messages (TH/EN) เป็นหลัก
Pages editor บันทึกค่าเข้า `site_settings` ไว้แล้ว — ถ้าต้องการให้ public
อ่านจาก DB เต็มรูปแบบ ทำต่อได้โดยใช้ `getSiteSettings()` + `SETTINGS_KEYS`
(`src/lib/site-settings.ts`, `src/lib/site-settings-keys.ts`) แบบเดียวกับ Hero
