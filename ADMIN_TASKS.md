# Twodesk Admin — Task List (ละเอียด)

> อ้างอิงจาก `ADMIN_SYSTEM_PLAN.md` — อัปเดตล่าสุด: 2026-03-30

---

## Phase 1: Infrastructure Setup ✅ เสร็จ

### 1.1 Supabase Project
- [x] สมัคร/เข้า Supabase Dashboard → สร้าง project "twodesk-studio"
- [x] เลือก region: Singapore (ใกล้ไทยสุด)
- [x] จดค่า: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- [x] จดค่า: `DATABASE_URL` (PostgreSQL connection string)

### 1.2 Environment Variables
- [x] สร้างไฟล์ `twodesk-web/.env.local`
- [x] ใส่ค่า: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- [x] เพิ่ม `.env.local` ใน `.gitignore` (มีอยู่แล้ว)
- [ ] สร้าง `.env.example` สำหรับ reference

### 1.3 ติดตั้ง Prisma
- [ ] ~~ใช้ Supabase JS client แทน Prisma~~ (เลือกใช้ Supabase client โดยตรง ไม่ใช้ Prisma)

### 1.4 สร้าง Database Schema (ผ่าน Supabase MCP)
- [x] สร้าง enums: project_category, content_status, user_role
- [x] สร้างตาราง `projects` — พร้อม indexes, updated_at trigger
- [x] สร้างตาราง `articles` — พร้อม indexes, updated_at trigger
- [x] สร้างตาราง `messages` — พร้อม partial index (unread)
- [x] สร้างตาราง `media` — พร้อม indexes
- [x] สร้างตาราง `users` — linked to Supabase Auth
- [x] สร้างตาราง `site_settings` — key-value store
- [x] สร้างตาราง `page_views` — raw events
- [x] สร้างตาราง `page_views_daily` — aggregated daily
- [x] ตรวจสอบ 8 tables ใน Supabase Dashboard ✅

### 1.5 Seed ข้อมูล (ผ่าน Supabase MCP)
- [x] Seed projects: 5 projects (รวม Hidden Sunken Hub)
- [x] Seed articles: 7 articles
- [x] Seed site_settings: 13 keys (company info, social, SEO)
- [ ] Seed users: สร้าง admin user เริ่มต้น

### 1.6 Supabase Auth Setup
- [x] `npm install @supabase/supabase-js @supabase/ssr`
- [x] สร้าง `src/lib/supabase/client.ts` (browser client)
- [x] สร้าง `src/lib/supabase/server.ts` (server client)
- [x] สร้าง `src/lib/supabase/admin.ts` (service role client)
- [ ] เปิด Email/Password auth ใน Supabase Dashboard
- [ ] สร้าง admin user แรกผ่าน Supabase Dashboard

### 1.7 Supabase MCP + Skills
- [x] เชื่อม Supabase MCP (project ref: fvssgqjchklkmtkureag)
- [x] ติดตั้ง supabase-postgres-best-practices skill
- [x] เชื่อม Vercel MCP

---

## Phase 2: Admin Panel — Core UI ✅ เสร็จ

### 2.1 ติดตั้ง shadcn/ui
- [x] `npx shadcn@latest init` (base-nova style, neutral color)
- [x] ติดตั้ง 15 components: button, input, label, textarea, select, table, card, badge, separator, dialog, sheet, dropdown-menu, tabs, sonner, avatar
- [x] Theme: Twodesk DS (ขาว-ดำ-เทา)

### 2.2 Admin Layout
- [x] สร้าง `src/app/admin/layout.tsx` — root layout
- [x] สร้าง `src/app/admin/(dashboard)/layout.tsx` — layout มี sidebar + top bar
- [x] สร้าง `src/components/admin/AdminSidebar.tsx`
  - [x] Logo TWO DESK
  - [x] Search bar (⌘K)
  - [x] Section groups: General, Content, Communication, Settings
  - [x] Active state highlight
  - [x] Badge counts (messages unread)
  - [x] User profile ด้านล่าง
- [x] Top bar: date + notification icon
- [x] Route group: login ไม่มี sidebar, dashboard มี sidebar

### 2.3 Auth — Login Page
- [x] สร้าง `src/app/admin/login/page.tsx`
  - [x] Layout split: brand ซ้าย (dark) + form ขวา (light)
  - [x] Email + Password fields
  - [x] Sign In button → Supabase Auth `signInWithPassword`
  - [x] Error handling
  - [x] Redirect ไป `/admin` หลัง login
- [ ] สร้าง middleware: ถ้าไม่ได้ login → redirect ไป `/admin/login`
- [ ] สร้าง logout function

### 2.4 Dashboard
- [x] สร้าง `src/app/admin/(dashboard)/page.tsx`
- [x] Stat cards (4 ใบ): Projects, Articles, Messages, Page Views — ดึง live data จาก Supabase
- [x] Recent Projects table (4 อันล่าสุด) พร้อม category colors
- [x] Recent Messages list (4 อันล่าสุด) พร้อม unread indicator
- [x] Page Views bar chart (placeholder)
- [x] Quick action buttons: + New Project, + New Article
- [x] ทดสอบ: data แสดงถูก ✅

---

## Phase 3: Admin Panel — CRUD Pages 🔄 กำลังทำ

### 3.1 Projects List
- [x] สร้าง `src/app/admin/(dashboard)/projects/page.tsx`
- [x] สร้าง API route `src/app/api/admin/projects/route.ts` (GET + POST)
- [x] สร้าง API route `src/app/api/admin/projects/[id]/route.ts` (GET + PUT + DELETE)
- [x] Table: title, category, location, area, year, status, actions
- [x] Category filter pills (All, Commercial, Cafe, Residential, Others)
- [x] Search bar — filter by title
- [x] Pagination component
- [x] Delete confirmation dialog
- [x] ทดสอบ: API returns 5 projects, filter works ✅

### 3.2 Project Editor
- [x] สร้าง `src/app/admin/(dashboard)/projects/[id]/page.tsx` (new + edit)
- [x] EN/TH language tabs
- [x] Fields: Title, Slug (auto-generate), Description, Category, Location, Area, Year
- [x] Sidebar: Status toggle, Category selector, Cover image URL, Project info
- [x] SEO section: Title, Meta Description, Keywords (tag input)
- [x] Save Draft / Publish buttons
- [ ] Tiptap Rich Text Editor (content field)
- [ ] Cover image upload (Cloudinary)
- [ ] Gallery images upload
- [ ] Form validation + toast notifications

### 3.3 Tiptap Rich Text Editor
- [ ] ติดตั้ง Tiptap packages
- [ ] สร้าง RichTextEditor component
- [ ] Toolbar: Bold, Italic, H1, H2, List, Quote, Image, Link
- [ ] ทดสอบ

### 3.4 Blog List
- [x] สร้าง blog list page
- [x] สร้าง API routes (GET + POST /api/admin/articles, GET + PUT + DELETE /api/admin/articles/[id])
- [x] Table + category filters + search + pagination + delete dialog
- [x] ทดสอบ: build ผ่าน ✅

### 3.5 Blog Editor
- [x] สร้าง blog editor page (/admin/blog/[id])
- [x] Fields: Title TH/EN, Slug, Excerpt TH/EN, Category, Cover Image, SEO (title, desc, keywords), Published Date
- [x] EN/TH tabs, Status toggle, Save Draft / Publish
- [ ] Rich Text Editor (Tiptap) — ยังไม่ได้เพิ่ม
- [ ] ทดสอบ CRUD flow

### 3.6 Messages Inbox
- [x] สร้าง messages page — split layout (list ซ้าย + detail ขวา)
- [x] สร้าง API routes (GET /api/admin/messages, GET + PUT + DELETE /api/admin/messages/[id])
- [x] Filter tabs: All, Unread, Archived
- [x] Mark as Read (คลิกเปิด = อ่านแล้ว), Archive, Delete
- [x] Contact info cards (email, phone, project type)
- [ ] Quick Reply (ส่ง email ผ่าน Resend)
- [ ] ทดสอบ CRUD flow

### 3.7 Media Library
- [ ] สร้าง media page (มี placeholder แล้ว)
- [ ] Cloudinary integration
- [ ] Upload, delete, grid/list view
- [ ] ทดสอบ

### 3.8 Placeholder Pages (เสร็จ)
- [x] Analytics placeholder
- [x] Blog placeholder
- [x] Messages placeholder
- [x] Media placeholder
- [x] Pages selector (Home/About/Contact)
- [x] Pages Home/About/Contact placeholders
- [x] Settings placeholder
- [x] Team placeholder

---

## Phase 4: Admin Panel — Website Pages

### 4.1 Pages Editor — Home
- [ ] สร้าง editor (มี placeholder แล้ว)
- [ ] API route + site_settings integration
- [ ] EN/TH tabs, Preview, Save

### 4.2 Pages Editor — About
- [ ] สร้าง editor (มี placeholder แล้ว)
- [ ] Team members CRUD
- [ ] Philosophy text

### 4.3 Pages Editor — Contact
- [ ] สร้าง editor (มี placeholder แล้ว)
- [ ] Contact info fields

---

## Phase 5: เชื่อม Frontend กับ Database

### 5.1 Projects — Frontend
- [ ] แก้ projects pages → ดึงจาก Supabase แทน data.ts
- [ ] ดึง locale-specific fields

### 5.2 Blog — Frontend
- [ ] แก้ blog pages → ดึงจาก Supabase
- [ ] Render Tiptap JSON → HTML

### 5.3 Contact Form → Database
- [ ] สร้าง API route → บันทึก messages + ส่ง email (Resend)
- [ ] แก้ ContactForm → call API

### 5.4 Page Content → Database
- [ ] แก้ Home/About/Contact → ดึงจาก site_settings

---

## Phase 6: Analytics + Settings

### 6.1 Google Analytics 4 Setup
- [ ] สร้าง GA4 Property + Service Account
- [ ] API routes for analytics data

### 6.2 Supabase Page View Counter
- [ ] Middleware บันทึก views
- [ ] Cron aggregate รายวัน

### 6.3 Analytics Dashboard Page
- [ ] Charts: page views, traffic sources
- [ ] Date range selector

### 6.4 Settings Pages
- [ ] General Settings (มี placeholder แล้ว)
- [ ] Team Management (มี placeholder แล้ว)

---

## Phase 7: Testing + Deploy

### 7.1 Testing
- [ ] Auth flow, CRUD, Messages, Media, Pages, Settings, Responsive, 2 ภาษา

### 7.2 Deploy to Vercel
- [x] เพิ่ม env variables ใน Vercel (3 ตัว)
- [x] เชื่อม GitHub repo → auto deploy
- [x] ทดสอบ production: twodesk-studio.vercel.app ✅
- [ ] ตั้งค่า custom domain

### 7.3 Handover
- [ ] สร้าง admin users สำหรับทีม Twodesk
- [ ] เขียนคู่มือใช้งาน
- [ ] ส่งมอบ credentials

---

## สรุปจำนวน Tasks

| Phase | จำนวน Tasks | เสร็จ | ประมาณเวลา |
|-------|------------|-------|-----------|
| Phase 1: Infrastructure | ~25 tasks | ~20 ✅ | เสร็จ |
| Phase 2: Core UI | ~20 tasks | ~18 ✅ | เสร็จ |
| Phase 3: CRUD Pages | ~45 tasks | ~28 ✅ | กำลังทำ |
| Phase 4: Website Pages | ~15 tasks | 0 | ยังไม่ได้ทำ |
| Phase 5: Connect Frontend | ~15 tasks | 0 | ยังไม่ได้ทำ |
| Phase 6: Analytics + Settings | ~20 tasks | 0 | ยังไม่ได้ทำ |
| Phase 7: Testing + Deploy | ~15 tasks | ~3 ✅ | deploy เสร็จ |
| **รวม** | **~155 tasks** | **~56 ✅** | **~36% เสร็จ** |
