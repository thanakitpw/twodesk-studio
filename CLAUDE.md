# CLAUDE.md — Two Desks Studio

## ภาษา
- **ตอบเป็นภาษาไทยเสมอ** ในทุกการสนทนา
- ยกเว้น code, ชื่อตัวแปร, และ technical terms ที่ต้องเป็นภาษาอังกฤษตามมาตรฐาน

---

## การใช้ Skills
- **ใช้ skill ที่เหมาะสมทุกครั้ง** ก่อนเริ่มงานใดๆ ให้เลือก skill ที่ตรงกับงานแล้ว invoke ผ่าน Skill tool
- Skills อยู่ที่ `.claude/skills/` ในโปรเจคนี้

### จับคู่งานกับ skill
| งาน | Skill |
|-----|-------|
| React component | `react-best-practices`, `react-patterns` |
| Next.js | `nextjs-best-practices`, `nextjs-app-router-patterns` |
| UI/UX ออกแบบ | `ui-ux-pro-max`, `frontend-design`, `web-design-guidelines` |
| Animation / Motion | `animejs-animation`, `fixing-motion-performance` |
| TypeScript | `typescript-expert`, `typescript-pro` |
| Python | `python-pro`, `python-patterns` |
| API | `api-design-principles`, `api-patterns` |
| Database | `database-design`, `postgresql` |
| Security | `security-audit`, `web-security-testing` |
| Deploy | `deployment-engineer`, `devops-deploy` |
| Test | `test-driven-development`, `e2e-testing` |
| SEO | `seo-fundamentals`, `seo-audit` |
| Performance | `web-performance-optimization`, `performance-optimizer` |
| Social/Marketing content | `social-content`, `content-creator` |
| Instagram automation | `instagram-automation`, `instagram` |

---

## ข้อมูลโปรเจค — Two Desks Studio

### บริษัท
- **ชื่อ:** TWO DESKS / ทูเดสก์
- **ประเภท:** Design Studio — ครอบคลุมงานออกแบบทุกประเภท ทั้ง Interior, Architecture, Furniture และ Craft Design (ไม่จำกัดเพียงงานออกแบบภายใน)
- **Instagram:** [@twodesk.studio](https://www.instagram.com/twodesk.studio)
- **Facebook:** Twodesk Studio

### ทีมงาน
| ชื่อ | ชื่อเล่น | ตำแหน่ง |
|------|----------|---------|
| ณัฐวัตร จินอยู่ยงค์ (Nutthawat Jinyuyong) | ณัฐ / Nut | Partner / Architect |
| สหรัฐ พรศิริพิทักษ์ (Saharath Pornsiripithak) | กัน / Gun | Partner / Architect |
| ชนิสรา ปิยะสุวรรณ (Chanisara Piyasuwan) | ปิ้ง / Ping | Partner / Architect |
| ชนวีร์ เอี่ยมวุฒิกร (Chonnavee Eiamvuttikorn) | โย / Yo | Civil Engineer |

### ประเภทงานที่รับ
- **Commercial** (แดง) — Office, ร้านค้า
- **Cafe / Bar / Restaurant** (น้ำเงิน)
- **Residential** (เขียว) — บ้าน, คอนโด
- **Others** (เหลือง)

---

## Brand Identity

### โลโก้
- **Symbol:** รูปแบบ 3D ของตัว T และ D จาก "TWODESK" — สื่อถึง "Creative table legs" ที่แข็งแกร่ง, ใช้งานได้จริง, และมีเอกลักษณ์
- **Primary Logo:** Symbol + Wordmark (แนวตั้ง)
- **Secondary Logo:** Symbol + Wordmark (แนวนอน)

### สีหลัก
| | ค่าสี |
|-|-------|
| **Pantone** | Black C |
| **CMYK** | 0 / 0 / 0 / 100 |
| **Hex** | `#000000` |

- ใช้ palette ขาว-ดำ-เทา เป็นหลัก
- ไม่มี accent color — ความเรียบง่ายคือ identity

### Typography
**ภาษาอังกฤษ — Helvetica**
| Role | Weight |
|------|--------|
| Title | Bold |
| Subtitle | Bold Oblique / Oblique |
| Body | Light |

**ภาษาไทย — ThaiSans Neue**
| Role | Weight |
|------|--------|
| Title | Extra Bold |
| Subtitle | Regular / Italic |
| Body | Light |

### โทนแบรนด์
- เรียบ, มีน้ำหนัก, modern, professional
- ไม่ใช้สีฉูดฉาด — mono-chromatic เป็นหลัก
- ภาษาที่ใช้ในงาน: กระชับ, ตรงประเด็น, ไม่ฟุ่มเฟือย

---

## เว็บไซต์อ้างอิง (Reference Sites)
เว็บเหล่านี้เป็น reference สำหรับ design direction และ UX pattern:
- [KSB Architect](https://www.ksbarchitect.com/)
- [Me-Miti](https://www.me-miti.com/)
- [Amber Interior Design](https://amberinteriordesign.com/)
- [L-E-A-D Pro](https://l-e-a-d.pro/home/)

---

## รายละเอียดโปรเจคเว็บไซต์

### Scope
- เว็บไซต์ 6 หน้าหลัก: Home, Portfolio, Blog, About, Contact + Project/Article Detail
- ระบบ 2 ภาษา TH/EN สลับทันทีไม่ reload
- CMS พัฒนาเอง (Custom-built) — ลูกค้าจัดการเนื้อหาได้เอง
- Contact Form + Email notification
- SEO พื้นฐาน, Google Analytics, Search Console, Tag Manager
- Responsive: Mobile / Tablet / Desktop

### Tech Stack
| Layer | เทคโนโลยี |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| i18n | next-intl |
| CMS | Custom-built |
| Email | Resend |
| Hosting | Vercel |
| Image CDN | Cloudinary |

### Timeline (4 Phases, ~1 เดือน)
| Phase | งาน |
|-------|-----|
| Phase 1 | วางโครงสร้าง, Design System, DB Schema |
| Phase 2 | ออกแบบ UI ทุกหน้า (Desktop + Mobile) |
| Phase 3 | พัฒนาเว็บ + CMS + ระบบ 2 ภาษา |
| Phase 4 | Google Tools, SEO, Testing, Deploy |

### แนวทางการพัฒนา
- UI สะท้อน brand: มืด, เรียบ, whitespace มาก
- Animation เบา — subtle scroll effects, hover scale
- Portfolio showcase คือ core feature
- Mobile-first เสมอ
- ไฟล์ PRD ฉบับเต็ม: `project-detail.md` | PDF: `Two Desks Studio — PRD.pdf`
