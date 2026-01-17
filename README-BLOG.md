# ระบบบทความสำหรับ SEO

ระบบนี้ช่วยให้คุณสามารถเขียนบทความด้วย Markdown และแปลงเป็น HTML อัตโนมัติเพื่อเพิ่ม SEO ให้กับเว็บไซต์

## 📁 โครงสร้าง

```
.
├── articles/          # ไฟล์ Markdown บทความ
├── articles/          # ไฟล์ HTML ที่ build แล้ว (จะสร้างอัตโนมัติ)
├── templates/         # HTML templates
├── blog.html          # หน้าบทความทั้งหมด (จะสร้างอัตโนมัติ)
├── build.js           # Script สำหรับ build
└── package.json       # Dependencies
```

## 🚀 เริ่มต้นใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. สร้างบทความใหม่

สร้างไฟล์ Markdown ในโฟลเดอร์ `articles/` โดยใช้รูปแบบนี้:

```markdown
---
title: "ชื่อบทความ"
description: "คำอธิบายสั้นๆ"
date: "2025-01-27"
author: "Nattapat Phungphugdee"
tags: ["Tag1", "Tag2"]
image: "Photo/Logo.png"  # (optional)
slug: "article-slug"      # (optional, จะใช้ชื่อไฟล์ถ้าไม่ระบุ)
---

# เนื้อหาบทความ

เขียนเนื้อหา Markdown ตรงนี้...
```

### 3. Build

```bash
npm run build
```

หรือใช้ watch mode เพื่อ build อัตโนมัติเมื่อมีการเปลี่ยนแปลง:

```bash
npm run watch
```

## 📝 ตัวอย่างบทความ

ดูตัวอย่างได้ที่:
- `articles/example-1.md`
- `articles/example-2.md`

## 🎨 Customize Templates

แก้ไข template ได้ที่:
- `templates/article.html` - Template สำหรับหน้าแต่ละบทความ
- `templates/blog-index.html` - Template สำหรับหน้าบทความทั้งหมด

## 🔍 SEO Features

ระบบจะสร้าง:
- ✅ Meta tags (title, description, Open Graph, Twitter Cards)
- ✅ Canonical URLs
- ✅ Sitemap.xml (อัพเดทอัตโนมัติ)
- ✅ Structured HTML
- ✅ Mobile responsive

## 📋 Front Matter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | ชื่อบทความ |
| `description` | ✅ | คำอธิบายสั้นๆ สำหรับ SEO |
| `date` | ✅ | วันที่ (รูปแบบ: YYYY-MM-DD) |
| `author` | ❌ | ผู้เขียน (default: Nattapat Phungphugdee) |
| `tags` | ❌ | Array ของ tags |
| `image` | ❌ | Path ไปยังรูปภาพ |
| `slug` | ❌ | URL slug (default: ชื่อไฟล์) |

## 🛠️ Commands

- `npm run build` - Build ทุกบทความครั้งเดียว
- `npm run watch` - Build และ watch สำหรับการเปลี่ยนแปลง
- `npm run dev` - เหมือน watch

## 📌 Tips

1. ใช้ slug ที่เป็นภาษาอังกฤษและไม่มีช่องว่าง
2. รูปภาพควรอยู่ในโฟลเดอร์ `Photo/` หรือใช้ path ที่ถูกต้อง
3. ตรวจสอบ `sitemap.xml` หลัง build เพื่อดูว่าบทความถูกเพิ่มแล้วหรือยัง
4. ใช้ Markdown syntax ตามปกติ

## 🔗 Links

- [Marked Documentation](https://marked.js.org/)
- [Front Matter](https://github.com/jxson/front-matter)
