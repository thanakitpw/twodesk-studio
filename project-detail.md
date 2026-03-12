# TWO DESKS STUDIO
## Website Project — Product Requirements Document

---

## 01 · Project Overview

Two Desks Studio ต้องการเว็บไซต์สำหรับ **Design Studio** ที่ครอบคลุมงานออกแบบทุกมิติ — ตั้งแต่ Interior Design, Architecture ไปจนถึง Furniture Design และงาน Craft ต่างๆ เพื่อแสดงผลงาน สร้างความน่าเชื่อถือ และเปิดรับลูกค้าใหม่อย่างเป็นระบบ

เว็บไซต์นี้จะเป็น **Digital Portfolio** หลักของบริษัท ออกแบบให้สอดคล้องกับ Brand Identity ที่มีอยู่ — เรียบ มีน้ำหนัก และดูเป็น Professional สูง รองรับทั้งภาษาไทยและอังกฤษ เพื่อรองรับลูกค้าทั้งในและต่างประเทศ และรองรับการขยาย service line ในอนาคต

---

## 02 · Target Audience

| กลุ่ม | คำอธิบาย |
|-------|---------|
| **ลูกค้าองค์กร / เจ้าของธุรกิจ** | ต้องการออกแบบพื้นที่เชิงพาณิชย์ เช่น ออฟฟิศ ร้านอาหาร คาเฟ่ |
| **เจ้าของบ้าน / คอนโด** | ต้องการออกแบบตกแต่งที่พักอาศัย |
| **นักลงทุน / Developer** | มองหาสตูดิโอที่มีผลงานและความน่าเชื่อถือก่อนตัดสินใจจ้าง |
| **สื่อมวลชน / สถาปนิกอื่น** | เยี่ยมชมผลงานเพื่อ Reference หรือโอกาสความร่วมมือ |

---

## 03 · Scope of Work

### สิ่งที่รวมอยู่ในโปรเจคนี้

- เว็บไซต์ 6 หน้าหลัก ครบทุก Section
- ระบบ 2 ภาษา ไทย / อังกฤษ สลับได้ทันที
- ระบบจัดการเนื้อหา (CMS) พัฒนาขึ้นเอง — ลูกค้าอัปเดตผลงาน บทความ และข้อมูลบริษัทได้เองโดยไม่ต้องใช้โปรแกรมเมอร์
- ฟอร์มติดต่อพร้อมระบบแจ้งเตือนทาง Email
- SEO พื้นฐานครบทุกหน้า
- รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์ทุกขนาด
- เชื่อมต่อ Google Analytics และ Google Search Console
- ระบบในการ login เข้าถึง CMS

---

## 04 · Sitemap

```
เว็บไซต์ Two Desks Studio
│
├── Home                    หน้าแรก
├── Portfolio               ผลงานทั้งหมด
│   └── Project Detail      รายละเอียดแต่ละโปรเจค
├── Blog                    บทความ
│   └── Article Detail      รายละเอียดบทความ
├── About                   เกี่ยวกับเรา
└── Contact                 ติดต่อ
```

---

## 05 · Feature Requirements

| # | Feature | รายละเอียด |
|---|---------|-----------|
| 1 | **Bilingual TH/EN** | สลับภาษาได้ทันทีทุกหน้า โดยไม่โหลดหน้าใหม่ |
| 2 | **Portfolio Grid** | แสดงผลงานแบบ Grid พร้อม Hover Effect |
| 3 | **Category Filter** | กรองผลงานตามประเภท All / Commercial / Café / Residential / Others |
| 4 | **Project Detail** | แกลเลอรีเต็มจอ, ข้อมูลโปรเจค, ผลงานที่เกี่ยวข้อง |
| 5 | **Blog / Articles** | รายการบทความ + หน้าบทความ รองรับ TH/EN |
| 6 | **Contact Form** | ชื่อ, Email, เบอร์โทร, ประเภทงาน, ข้อความ + แจ้งเตือน Email |
| 7 | **Responsive Design** | รองรับ Mobile / Tablet / Desktop ทุก Breakpoint |
| 8 | **SEO Basics** | Title, Meta Description, OG Tags, Sitemap |
| 9 | **Navigation + Footer** | Sticky Nav, Language Toggle, Social Icons, Copyright |
| 10 | **CMS (Custom)** | ระบบหลังบ้านพัฒนาขึ้นเอง — จัดการผลงาน บทความ และข้อมูลบริษัทได้เอง พร้อมระบบ Login |

---

## 06 · Design Guidelines

แนวทางการออกแบบยึดตาม **Brand Identity Manual** ของ Two Desks Studio

**โทนภาพรวม:** เรียบ · มีน้ำหนัก · Minimal
| รายการ | รายละเอียด |
|--------|-----------|
| **สีหลัก** | Black `#000000` + White `#FFFFFF` + โทนเทา |
| **สีรอง** | ไม่มี Accent Color — ใช้ Mono-chromatic ตลอด |
| **ฟอนต์ภาษาอังกฤษ** | Helvetica — Bold (หัวข้อ), Light (เนื้อหา) |
| **ฟอนต์ภาษาไทย** | ThaiSans Neue — Extra Bold (หัวข้อ), Light (เนื้อหา) |
| **Animation** | Subtle — Fade, Scroll Effect, Hover Scale เบาๆ ไม่รก |
| **รูปภาพ** | High Resolution, สีธรรมชาติ ไม่ตัดต่อสีจัด |
| **โลโก้** | TD Symbol + Wordmark ตาม Primary / Secondary ที่กำหนด |

**Reference Sites**
- [ksbarchitect.com](https://www.ksbarchitect.com)
- [me-miti.com](https://www.me-miti.com)
- [amberinteriordesign.com](https://amberinteriordesign.com)
- [l-e-a-d.pro](https://l-e-a-d.pro/home)

---


## 07 · Google Tools Integration

| เครื่องมือ | วัตถุประสงค์ |
|-----------|------------|
| **Google Analytics 4** | ติดตามจำนวนผู้เข้าชม, พฤติกรรมผู้ใช้, หน้าที่ได้รับความนิยม |
| **Google Search Console** | ติดตามการจัดอันดับใน Google, ตรวจสอบ SEO, ส่ง Sitemap |
| **Google Tag Manager** | จัดการ Tracking Code ทั้งหมดในที่เดียว รองรับการเพิ่มในอนาคต |

---

## 08 · Tech Stack

| Layer | เทคโนโลยี |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Multilingual** | next-intl |
| **CMS** | Custom-built (พัฒนาเอง) |
| **Email** | Resend |
| **Hosting** | Vercel |
| **Image CDN** | Cloudinary |

---

## 10 · Timeline

| Phase | งาน | ระยะเวลา |
|-------|-----|---------|
| **Phase 1** · วางโครงสร้าง | กำหนด Sitemap, โครงสร้างฐานข้อมูล, Design System และ Component Library | 1 สัปดาห์ |
| **Phase 2** · ดีไซน์ | ออกแบบ UI ทุกหน้า ให้สอดคล้อง Brand CI — ทั้ง Desktop และ Mobile | 1 สัปดาห์ |
| **Phase 3** · พัฒนาเว็บไซต์ | พัฒนาหน้าเว็บทั้งหมด, ระบบ 2 ภาษา, CMS หลังบ้าน, Contact Form | 2 สัปดาห์ |
| **Phase 4** · Google Tools & Deploy | ติดตั้ง Analytics, Search Console, Tag Manager, SEO, Testing และ Deploy | 1 สัปดาห์ |
| | **รวม** | **~1 เดือน** |

> **หมายเหตุ:** ระยะเวลาข้างต้นไม่รวมช่วงที่ลูกค้าตรวจงานและเตรียมส่งข้อมูล
