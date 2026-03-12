# Design Checklist — TWO DESK Studio Website

## Phase 1: Design System

### Colors & Typography
- [x] Color Palette — Primary Black `#000000` + grayscale
- [x] ปรับ Primary Black จาก `#0A0A0A` → `#000000` ตาม Brand CI (Pantone Black C)
- [x] เพิ่ม Category Colors (แดง `#C0392B`, น้ำเงิน `#2471A3`, เขียว `#1ABC9C`, เหลือง `#F1C40F`)
- [x] เพิ่ม Logo Color (เทา `#999999`) ตาม Brand CI จริง
- [x] Typography Scale — Display, H1, H2, H3, Body, Body Large, Label, Nav
- [x] เพิ่ม Subtitle style — Helvetica Bold Oblique ตาม CI
- [ ] หา fallback font สำหรับ ThaiSans Neue (ไม่มีใน Paper)

### Components
- [x] Buttons — Primary, Secondary, Text Link (Light + Dark variants)
- [x] Navigation Bar — Dark + Light
- [x] แก้ชื่อแบรนด์ใน Nav จาก "TWODESK" → "TWO DESK" (ไม่มี S)
- [x] ปรับสี wordmark ใน Nav + Footer ให้เป็นเทา `#999` ตาม Brand CI
- [x] Portfolio Card — Dark + Light variants
- [x] Form Elements — Input, Textarea, Category Filter Pills
- [x] ปรับสี Category Filter Pills ให้ใช้สีจริงตาม Brand CI
- [x] Footer Component — แก้ชื่อแบรนด์ + copyright ถูกต้อง

### Spacing & Grid
- [x] Spacing Scale — 7 ระดับ (4px–120px)
- [x] Grid System — 12 column, 1280px content
- [x] Breakpoints — Mobile 390, Tablet 768, Desktop 1440, Large 1920

### Design System Summary
- **Style:** Swiss Modernism 2.0 + Exaggerated Minimalism
- **Artboards:** 3 (Colors & Typography, Components, Spacing & Grid)
- **Skill ที่ใช้:** ui-ux-pro-max (design system + style + UX guidelines)

---

## Phase 2: Page Design (Desktop)

### Homepage (Light Theme — v2)
- [x] ปรับจาก Dark → Light tone (#FAFAF8 warm off-white) ตาม Reference Sites
- [x] Navigation Bar — TWO DESK logo เทา #999, nav links ดำ #1A1A1A, TH/EN toggle
- [x] Hero Section — Full-width image area (L-E-A-D style) + bold text overlay 56px
- [x] Selected Works — 4 projects, asymmetric grid (7:5 / 5:7), category dot colors
- [x] About Teaser — 6:4 split, border-top divider, warm tone
- [x] Contact CTA — Surface bg #F0EFED, outline button
- [x] Footer — 4 columns light, divider line, text #4A4A4A

### Design System Update (Light Theme)
- [x] Color Palette อัพเดท: Text Primary, Text Secondary, Muted/Logo, Divider, Surface, Background
- [x] Nav Dark → Nav Light (bg #FAFAF8, text #1A1A1A)
- [x] Card Dark → Card Light (bg #FAFAF8, border #E5E4E2)
- [x] Buttons "on Dark" → "on Surface" (bg #F0EFED)
- [x] Footer Component → Light (bg #FAFAF8, text #4A4A4A)

### Portfolio Page
- [x] Page Header — H1 "Portfolio" + description
- [x] Category Filter Bar — All (active), Commercial, Cafe/Bar, Residential, Others
- [x] Portfolio Grid — 3×3 (9 projects), equal columns, category dot colors
- [x] Contact CTA + Footer (reuse from Homepage)

### Project Detail
- [x] Hero Image (Full-width)
- [x] Project Info (type, year, location, area)
- [x] Image Gallery (mixed layout: 2col, full, 2:1, 3col)
- [x] Related Projects (3 cards with category dots)

### Blog Page
- [x] Featured Article (large card + detail)
- [x] Article Grid (3×2 = 6 articles)
- [x] Category Filter Pills (All, Design Trends, Behind the Scenes, Tips, Studio Life)
- [x] Contact CTA + Footer

### Article Detail
- [x] Article Header (title, date, category, read time — centered)
- [x] Article Hero Image (full-width)
- [x] Article Body (rich text with inline image)
- [x] Related Articles (3 cards)

### About Page
- [x] About Hero (text + studio photo)
- [x] Studio Philosophy (2-column layout)
- [x] Team Section (4 members — Nut, Gun, Ping, Yo)
- [x] Services (list style with descriptions on #F0EFED bg)
- [x] Contact CTA + Footer

### Contact Page
- [x] Contact Header (headline + studio info: email, social, location)
- [x] Contact Form (name, email, phone, project type, message + send button)
- [x] Map Placeholder (Google Maps — Bangkok)
- [x] Footer

---

## Phase 3: Mobile Design (390px)
- [x] Mobile Navigation (Hamburger)
- [x] Homepage Mobile
- [x] Portfolio Mobile
- [x] Project Detail Mobile
- [x] Blog Mobile
- [x] About Mobile
- [x] Contact Mobile

---

## UX Checklist (จาก ui-ux-pro-max skill)
- [ ] No emojis as icons — ใช้ SVG เท่านั้น
- [ ] cursor-pointer บน clickable elements ทั้งหมด
- [ ] Hover transitions 150-300ms, ease-out
- [ ] Color contrast 4.5:1 minimum
- [ ] Focus states สำหรับ keyboard navigation
- [ ] prefers-reduced-motion respected
- [ ] Responsive ครบ: 375px, 768px, 1024px, 1440px
- [ ] Smooth scroll สำหรับ anchor links
- [ ] Skeleton loading states
- [ ] No horizontal scroll on mobile
