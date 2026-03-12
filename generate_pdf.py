#!/usr/bin/env python3
"""Generate Two Desks Studio PRD PDF"""

import os, subprocess, tempfile

BASE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.expanduser("~/Library/Fonts")

html_content = """<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<style>
  @font-face {
    font-family: 'DBHelvethaica';
    src: url('""" + FONTS + """/DB Helvethaica X Li v3.2.ttf');
    font-weight: 300;
  }
  @font-face {
    font-family: 'DBHelvethaica';
    src: url('""" + FONTS + """/DB Helvethaica X v3.2.ttf');
    font-weight: 400;
  }
  @font-face {
    font-family: 'DBHelvethaica';
    src: url('""" + FONTS + """/DB Helvethaica X Med v3.2.ttf');
    font-weight: 500;
  }
  @font-face {
    font-family: 'DBHelvethaica';
    src: url('""" + FONTS + """/DB Helvethaica X Bd v3.2.ttf');
    font-weight: 700;
  }
  @font-face {
    font-family: 'DBHelvethaica';
    src: url('""" + FONTS + """/DB Helvethaica X Blk v3.2.ttf');
    font-weight: 900;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DBHelvethaica', sans-serif;
    font-weight: 300;
    font-size: 11pt;
    color: #1a1a1a;
    background: #ffffff;
    line-height: 1.7;
  }

  /* COVER PAGE */
  .cover {
    width: 100%;
    height: 100vh;
    background: #000000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 60px;
    page-break-after: always;
  }
  .cover-label {
    font-size: 9pt;
    color: #666;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 16px;
    font-weight: 400;
  }
  .cover-title {
    font-size: 38pt;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 12px;
  }
  .cover-subtitle {
    font-size: 13pt;
    color: #999;
    font-weight: 300;
    letter-spacing: 1px;
    margin-bottom: 60px;
  }
  .cover-meta {
    border-top: 1px solid #333;
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
  }
  .cover-meta span {
    font-size: 8pt;
    color: #555;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* CONTENT */
  .page {
    padding: 56px 64px;
    page-break-after: always;
  }
  .page:last-child { page-break-after: auto; }

  /* Section header */
  .section-number {
    font-size: 8pt;
    color: #999;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 400;
    margin-bottom: 6px;
  }
  h2 {
    font-size: 20pt;
    font-weight: 900;
    color: #000;
    letter-spacing: -0.5px;
    margin-bottom: 28px;
    padding-bottom: 12px;
    border-bottom: 2px solid #000;
  }
  h3 {
    font-size: 11pt;
    font-weight: 700;
    color: #000;
    margin: 20px 0 8px;
  }
  p {
    font-size: 10.5pt;
    color: #333;
    line-height: 1.8;
    margin-bottom: 12px;
    font-weight: 300;
  }

  /* TABLE */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 24px;
    font-size: 10pt;
  }
  thead tr {
    background: #000;
    color: #fff;
  }
  thead th {
    padding: 10px 14px;
    text-align: left;
    font-weight: 500;
    font-size: 9pt;
    letter-spacing: 0.5px;
  }
  tbody tr:nth-child(even) { background: #f8f8f8; }
  tbody tr:nth-child(odd)  { background: #ffffff; }
  tbody td {
    padding: 10px 14px;
    color: #333;
    border-bottom: 1px solid #e8e8e8;
    font-weight: 300;
  }
  tbody td:first-child { font-weight: 500; color: #000; }
  tbody td strong { font-weight: 700; color: #000; }

  /* LIST */
  ul {
    list-style: none;
    margin: 8px 0 20px;
  }
  ul li {
    padding: 7px 0 7px 20px;
    position: relative;
    font-size: 10.5pt;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 300;
  }
  ul li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #999;
    font-weight: 300;
  }
  ul li strong { font-weight: 700; color: #000; }

  /* SITEMAP BOX */
  .sitemap {
    background: #f5f5f5;
    border-left: 3px solid #000;
    padding: 20px 24px;
    font-family: 'DBHelvethaica', monospace;
    font-size: 10pt;
    line-height: 2;
    color: #333;
    margin: 16px 0 24px;
    white-space: pre;
  }

  /* PHASE TABLE highlight */
  .phase-num {
    font-weight: 900;
    font-size: 10pt;
    color: #000;
  }
  .total-row td {
    font-weight: 700 !important;
    color: #000 !important;
    background: #000 !important;
    color: #fff !important;
    padding: 12px 14px !important;
  }

  /* NOTE */
  .note {
    background: #f5f5f5;
    border-left: 3px solid #ccc;
    padding: 12px 16px;
    font-size: 9.5pt;
    color: #555;
    margin-top: 16px;
    font-weight: 300;
  }

  /* PAGE NUMBER */
  @page {
    size: A4;
    margin: 0;
    @bottom-right {
      content: counter(page);
      font-family: 'DBHelvethaica', sans-serif;
      font-size: 8pt;
      color: #999;
      margin-right: 40px;
      margin-bottom: 24px;
    }
  }
  @page :first { @bottom-right { content: none; } }
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="cover-label">Product Requirements Document</div>
  <div class="cover-title">TWO DESK<br>STUDIO</div>
  <div class="cover-subtitle">Website Project · 2026</div>
  <div class="cover-meta">
    <span>Two Desks Studio · Confidential</span>
    <span>Version 1.0 · March 2026</span>
  </div>
</div>

<!-- 01 PROJECT OVERVIEW -->
<div class="page">
  <div class="section-number">01</div>
  <h2>Project Overview</h2>
  <p>Two Desks Studio ต้องการเว็บไซต์สำหรับ <strong>Design Studio</strong> ที่ครอบคลุมงานออกแบบทุกมิติ — ตั้งแต่ Interior Design, Architecture ไปจนถึง Furniture Design และงาน Craft ต่างๆ เพื่อแสดงผลงาน สร้างความน่าเชื่อถือ และเปิดรับลูกค้าใหม่อย่างเป็นระบบ</p>
  <p>เว็บไซต์นี้จะเป็น <strong>Digital Portfolio</strong> หลักของบริษัท ออกแบบให้สอดคล้องกับ Brand Identity ที่มีอยู่ — เรียบ มีน้ำหนัก และดูเป็น Professional สูง รองรับทั้งภาษาไทยและอังกฤษ เพื่อรองรับลูกค้าทั้งในและต่างประเทศ และรองรับการขยาย service line ในอนาคต</p>

  <div class="section-number" style="margin-top:36px">02</div>
  <h2>Target Audience</h2>
  <table>
    <thead><tr><th>กลุ่มเป้าหมาย</th><th>คำอธิบาย</th></tr></thead>
    <tbody>
      <tr><td><strong>ลูกค้าองค์กร / เจ้าของธุรกิจ</strong></td><td>ต้องการออกแบบพื้นที่เชิงพาณิชย์ เช่น ออฟฟิศ ร้านอาหาร คาเฟ่</td></tr>
      <tr><td><strong>เจ้าของบ้าน / คอนโด</strong></td><td>ต้องการออกแบบตกแต่งที่พักอาศัย</td></tr>
      <tr><td><strong>นักลงทุน / Developer</strong></td><td>มองหาสตูดิโอที่มีผลงานและความน่าเชื่อถือก่อนตัดสินใจจ้าง</td></tr>
      <tr><td><strong>สื่อมวลชน / สถาปนิกอื่น</strong></td><td>เยี่ยมชมผลงานเพื่อ Reference หรือโอกาสความร่วมมือ</td></tr>
    </tbody>
  </table>
</div>

<!-- 03 SCOPE -->
<div class="page">
  <div class="section-number">03</div>
  <h2>Scope of Work</h2>
  <h3>สิ่งที่รวมอยู่ในโปรเจคนี้</h3>
  <ul>
    <li>เว็บไซต์ 6 หน้าหลัก ครบทุก Section</li>
    <li>ระบบ 2 ภาษา ไทย / อังกฤษ สลับได้ทันที</li>
    <li><strong>ระบบจัดการเนื้อหา (CMS) พัฒนาขึ้นเอง</strong> — ลูกค้าอัปเดตผลงาน บทความ และข้อมูลบริษัทได้เองโดยไม่ต้องใช้โปรแกรมเมอร์</li>
    <li>ฟอร์มติดต่อพร้อมระบบแจ้งเตือนทาง Email</li>
    <li>SEO พื้นฐานครบทุกหน้า</li>
    <li>รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์ทุกขนาด</li>
    <li>เชื่อมต่อ Google Analytics และ Google Search Console</li>
    <li>ระบบ Login สำหรับเข้าถึง CMS</li>
  </ul>

  <div class="section-number" style="margin-top:36px">04</div>
  <h2>Sitemap</h2>
  <div class="sitemap">เว็บไซต์ Two Desks Studio
│
├── Home                    หน้าแรก
├── Portfolio               ผลงานทั้งหมด
│   └── Project Detail      รายละเอียดแต่ละโปรเจค
├── Blog                    บทความ
│   └── Article Detail      รายละเอียดบทความ
├── About                   เกี่ยวกับเรา
└── Contact                 ติดต่อ</div>
</div>

<!-- 05 FEATURES -->
<div class="page">
  <div class="section-number">05</div>
  <h2>Feature Requirements</h2>
  <table>
    <thead><tr><th>#</th><th>Feature</th><th>รายละเอียด</th></tr></thead>
    <tbody>
      <tr><td>1</td><td><strong>Bilingual TH/EN</strong></td><td>สลับภาษาได้ทันทีทุกหน้า โดยไม่โหลดหน้าใหม่</td></tr>
      <tr><td>2</td><td><strong>Portfolio Grid</strong></td><td>แสดงผลงานแบบ Grid พร้อม Hover Effect</td></tr>
      <tr><td>3</td><td><strong>Category Filter</strong></td><td>กรองผลงานตามประเภท: All / Commercial / Café / Residential / Others</td></tr>
      <tr><td>4</td><td><strong>Project Detail</strong></td><td>แกลเลอรีเต็มจอ, ข้อมูลโปรเจค, ผลงานที่เกี่ยวข้อง</td></tr>
      <tr><td>5</td><td><strong>Blog / Articles</strong></td><td>รายการบทความ + หน้าบทความ รองรับ TH/EN</td></tr>
      <tr><td>6</td><td><strong>Contact Form</strong></td><td>ชื่อ, Email, เบอร์โทร, ประเภทงาน, ข้อความ + แจ้งเตือน Email</td></tr>
      <tr><td>7</td><td><strong>Responsive Design</strong></td><td>รองรับ Mobile / Tablet / Desktop ทุก Breakpoint</td></tr>
      <tr><td>8</td><td><strong>SEO Basics</strong></td><td>Title, Meta Description, OG Tags, Sitemap</td></tr>
      <tr><td>9</td><td><strong>Navigation + Footer</strong></td><td>Sticky Nav, Language Toggle, Social Icons, Copyright</td></tr>
      <tr><td>10</td><td><strong>CMS (Custom)</strong></td><td>ระบบหลังบ้านพัฒนาขึ้นเอง — จัดการผลงาน บทความ และข้อมูลบริษัทได้เอง พร้อมระบบ Login</td></tr>
    </tbody>
  </table>
</div>

<!-- 06 DESIGN -->
<div class="page">
  <div class="section-number">06</div>
  <h2>Design Guidelines</h2>
  <p>แนวทางการออกแบบยึดตาม <strong>Brand Identity Manual</strong> ของ Two Desks Studio</p>
  <p style="color:#666; font-size:9.5pt; letter-spacing:2px; text-transform:uppercase; margin-bottom:16px;">โทนภาพรวม: เรียบ · มีน้ำหนัก · Minimal · ให้พื้นที่หายใจ</p>
  <table>
    <thead><tr><th>รายการ</th><th>รายละเอียด</th></tr></thead>
    <tbody>
      <tr><td><strong>สีหลัก</strong></td><td>Black #000000 + White #FFFFFF + โทนเทา</td></tr>
      <tr><td><strong>สีรอง</strong></td><td>ไม่มี Accent Color — ใช้ Mono-chromatic ตลอด</td></tr>
      <tr><td><strong>ฟอนต์ภาษาอังกฤษ</strong></td><td>Helvetica — Bold (หัวข้อ), Light (เนื้อหา)</td></tr>
      <tr><td><strong>ฟอนต์ภาษาไทย</strong></td><td>ThaiSans Neue — Extra Bold (หัวข้อ), Light (เนื้อหา)</td></tr>
      <tr><td><strong>Animation</strong></td><td>Subtle — Fade, Scroll Effect, Hover Scale เบาๆ ไม่รก</td></tr>
      <tr><td><strong>รูปภาพ</strong></td><td>High Resolution, สีธรรมชาติ ไม่ตัดต่อสีจัด</td></tr>
      <tr><td><strong>โลโก้</strong></td><td>TD Symbol + Wordmark ตาม Primary / Secondary ที่กำหนด</td></tr>
    </tbody>
  </table>
</div>

<!-- 07 CONTENT -->
<div class="page">
  <div class="section-number">07</div>
  <h2>Content ที่ลูกค้าต้องเตรียม</h2>

  <h3>ผลงาน (Portfolio)</h3>
  <ul>
    <li>รูปภาพผลงานแต่ละโปรเจค ความละเอียดสูง (ไม่จำกัดจำนวนรูปต่อโปรเจค)</li>
    <li>ชื่อโปรเจค ทั้งภาษาไทยและอังกฤษ</li>
    <li>คำอธิบายโปรเจค ทั้งภาษาไทยและอังกฤษ</li>
    <li>ข้อมูลโปรเจค: ปีที่ทำ, สถานที่, ขนาดพื้นที่, ประเภทงาน</li>
  </ul>

  <h3>หน้า About</h3>
  <ul>
    <li>รูปถ่ายทีมงานทั้ง 4 คน (พื้นหลังเรียบ หรือ On-site)</li>
    <li>ข้อความแนะนำบริษัท ทั้งภาษาไทยและอังกฤษ</li>
    <li>ข้อความแนะนำแต่ละคน ทั้งภาษาไทยและอังกฤษ</li>
  </ul>

  <h3>Blog / Articles</h3>
  <ul>
    <li>บทความที่ต้องการลง (ถ้ามีในระยะแรก)</li>
    <li>รูปภาพประกอบบทความ</li>
  </ul>

  <h3>ทั่วไป</h3>
  <ul>
    <li>ไฟล์โลโก้ในรูปแบบ SVG หรือ AI</li>
    <li>Email ที่ต้องการรับแจ้งเตือนจาก Contact Form</li>
    <li>ข้อมูล Social Media: Instagram Handle, Facebook Page URL</li>
  </ul>
</div>

<!-- 08 GOOGLE TOOLS -->
<div class="page">
  <div class="section-number">08</div>
  <h2>Google Tools Integration</h2>
  <table>
    <thead><tr><th>เครื่องมือ</th><th>วัตถุประสงค์</th></tr></thead>
    <tbody>
      <tr><td><strong>Google Analytics 4</strong></td><td>ติดตามจำนวนผู้เข้าชม, พฤติกรรมผู้ใช้, หน้าที่ได้รับความนิยม</td></tr>
      <tr><td><strong>Google Search Console</strong></td><td>ติดตามการจัดอันดับใน Google, ตรวจสอบ SEO, ส่ง Sitemap</td></tr>
      <tr><td><strong>Google Tag Manager</strong></td><td>จัดการ Tracking Code ทั้งหมดในที่เดียว รองรับการเพิ่มในอนาคต</td></tr>
    </tbody>
  </table>

  <div class="section-number" style="margin-top:36px">09</div>
  <h2>Tech Stack (Recommended)</h2>
  <table>
    <thead><tr><th>Layer</th><th>เทคโนโลยี</th></tr></thead>
    <tbody>
      <tr><td><strong>Framework</strong></td><td>Next.js 14 (App Router)</td></tr>
      <tr><td><strong>Styling</strong></td><td>Tailwind CSS</td></tr>
      <tr><td><strong>Animation</strong></td><td>Framer Motion</td></tr>
      <tr><td><strong>Multilingual</strong></td><td>next-intl</td></tr>
      <tr><td><strong>CMS</strong></td><td>Custom-built (พัฒนาเอง)</td></tr>
      <tr><td><strong>Email</strong></td><td>Resend</td></tr>
      <tr><td><strong>Hosting</strong></td><td>Vercel</td></tr>
      <tr><td><strong>Image CDN</strong></td><td>Cloudinary</td></tr>
    </tbody>
  </table>
</div>

<!-- 10 TIMELINE -->
<div class="page">
  <div class="section-number">10</div>
  <h2>Timeline</h2>
  <table>
    <thead><tr><th>Phase</th><th>งาน</th><th>ระยะเวลา</th></tr></thead>
    <tbody>
      <tr>
        <td><span class="phase-num">Phase 1</span><br><span style="font-size:9pt;color:#666">วางโครงสร้าง</span></td>
        <td>กำหนด Sitemap, โครงสร้างฐานข้อมูล, Design System และ Component Library</td>
        <td style="white-space:nowrap">1 สัปดาห์</td>
      </tr>
      <tr>
        <td><span class="phase-num">Phase 2</span><br><span style="font-size:9pt;color:#666">ดีไซน์</span></td>
        <td>ออกแบบ UI ทุกหน้า ให้สอดคล้อง Brand CI — ทั้ง Desktop และ Mobile</td>
        <td style="white-space:nowrap">1 สัปดาห์</td>
      </tr>
      <tr>
        <td><span class="phase-num">Phase 3</span><br><span style="font-size:9pt;color:#666">พัฒนาเว็บไซต์</span></td>
        <td>พัฒนาหน้าเว็บทั้งหมด, ระบบ 2 ภาษา, CMS หลังบ้าน, Contact Form</td>
        <td style="white-space:nowrap">2 สัปดาห์</td>
      </tr>
      <tr>
        <td><span class="phase-num">Phase 4</span><br><span style="font-size:9pt;color:#666">Google Tools & Deploy</span></td>
        <td>ติดตั้ง Analytics, Search Console, Tag Manager, SEO, Testing และ Deploy</td>
        <td style="white-space:nowrap">1 สัปดาห์</td>
      </tr>
      <tr class="total-row">
        <td colspan="2">รวมระยะเวลาพัฒนา</td>
        <td>~1 เดือน</td>
      </tr>
    </tbody>
  </table>
  <div class="note">หมายเหตุ: ระยะเวลาข้างต้นไม่รวมช่วงที่ลูกค้าตรวจงานและเตรียมส่งข้อมูล</div>
</div>

</body>
</html>"""

html_path = os.path.join(BASE, "prd_temp.html")
output_path = os.path.join(BASE, "Two Desks Studio — PRD.pdf")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

result = subprocess.run(
    ["/opt/homebrew/bin/weasyprint", html_path, output_path],
    capture_output=True, text=True
)
os.remove(html_path)

if result.returncode == 0:
    print(f"PDF saved: {output_path}")
else:
    print("Error:", result.stderr)
