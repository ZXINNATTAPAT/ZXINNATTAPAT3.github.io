# แผนที่ไฟล์ — nattazxin.com

เว็บพอร์ตโฟลิโอของ Nattapat Phungphugdee (NATTAZXIN) เป็นไซต์ static บน GitHub Pages
ที่ build ด้วย `build.js` ภาษาของหน้าแรกอยู่ใน `i18n.js`
สมุดเยี่ยมมี API แยกที่โฟลเดอร์พี่น้อง `../guestbook-api` (Cloudflare Worker + D1)

เปิดตารางนี้ก่อนแก้ แล้วค่อยลงไปที่ไฟล์ต้นทาง อย่าแก้ HTML ที่ build แล้ว

## ถ้าจะแก้อะไร เปิดไฟล์นี้

| อยากแก้ | เปิดไฟล์นี้ |
|---|---|
| ข้อความบนหน้าแรก (ทุกภาษา) | `i18n.js` — คีย์ตรงกับ `data-i18n` ใน HTML |
| เมนู / เปลี่ยนภาษา | `components/index/navigation.html` |
| Hero | `components/index/hero.html` + แอนิเมชัน `hero-gsap.js` |
| โปรไฟล์ + กองรูป | `components/index/profile.html` + `profile-cards.js` |
| ทักษะ (อยู่ในโปรไฟล์) | `components/index/skills.html` |
| ประสบการณ์ | `components/index/experience.html` + `experience-gsap.js` |
| Cloud & Hosting | `components/index/cloud-platforms.html` + `cloud-platforms-gsap.js` |
| การ์ดโปรเจกต์เด่น (PROJECTS) | `components/index/visual-highlights.html` + สายพาน `projects-gsap.js` |
| แกลเลอรี UI/UX (OLIF, Triple C) | `components/index/uiux-projects.html` + `uiux-gsap.js` |
| ใบประกาศ | `components/index/certificates.html` |
| ประตูสมุดเยี่ยมบนหน้าแรก | `components/index/guestbook.html` |
| หน้าสมุดเยี่ยมทั้งหน้า | `guestbook.html` + `stylesheets/guestbook.css` |
| API สมุดเยี่ยม | `../guestbook-api/src/index.js` |
| ติดต่อ / ฟุตเตอร์ | `components/index/contact.html`, `components/index/footer.html` |
| ป๊อปอัปโปรเจกต์ | มาร์กอัป `components/index/project-modal.html` สคริปต์อยู่ใน `templates/index.template.html` |
| หน้าลิงก์รวม (`/links/`) | `links/index.html`, `links/links.js`, `stylesheets/links.css` |
| บทความใหม่ | สร้าง `articles/<slug>.md` แล้ว `npm run build` |
| หน้ารายละเอียดโปรเจกต์ | แก้ `projects/<slug>.md` แล้ว `npm run build` |
| head, ฟอนต์, ลำดับสคริปต์, cache `?v=` | `templates/index.template.html` |
| สไตล์หน้าแรกส่วนใหญ่ | `stylesheets/index.css` |
| รูป | `Photo/optimized/` |

## อย่าแก้ไฟล์ที่ build แล้ว

`npm run build` เขียนทับไฟล์เหล่านี้ทุกครั้ง

- `index.html`, `th.html`, `ja.html`, `zh.html`, `de.html`, `ko.html` มาจาก `templates/index.template.html`
- `other-projects.html` มาจาก `templates/other-projects.template.html`
- `blog.html` มาจาก `templates/blog-index.html`
- `articles/*.html` มาจาก `articles/*.md` + `templates/article.html`
- `projects/*.html` มาจาก `projects/*.md` + `templates/project.template.html`
- `sitemap.xml` ถูกอัปเดตตอน build

แก้คอมโพเนนต์หรือเทมเพลต แล้วรัน build จากโฟลเดอร์นี้

```bash
npm install
npm run build          # ทั้งหน้าแรก บทความ โปรเจกต์ sitemap
npm run build:index    # เฉพาะหน้า locale + other-projects
npm run dev            # watch แล้ว build ใหม่ ไม่ได้เปิดเว็บเซิร์ฟเวอร์
```

ดูผลในเบราว์เซอร์ด้วยเซิร์ฟเวอร์ static เช่น `python3 -m http.server 8000`
แล้วเปิด `http://localhost:8000/index.html`

สคริปต์และ CSS ที่ลิงก์ด้วย `?v=` ต้องขึ้นเลขใน `templates/index.template.html`
แล้ว build ใหม่ ไม่งั้นเบราว์เซอร์ยังใช้ไฟล์เก่า
ตอนนี้เช่น `stylesheets/min/index.css?v=72`, `i18n.min.js?v=58`, `hero-gsap.min.js?v=10`

Build อาจเปลี่ยนวันที่ใน `sitemap.xml` และหน้าบทความแม้เนื้อหาไม่เปลี่ยน
อย่า commit ส่วนต่างแค่นั้น

รายละเอียด front matter ของบทความอยู่ใน `README-BLOG.md`
วิธีรันในสภาพแวดล้อมคลาวด์อยู่ใน `AGENTS.md`

## หน้าแรกประกอบยังไง

`templates/index.template.html` ดึงชิ้นส่วนด้วย `<!-- @include ../components/index/... -->`
ลำดับบนหน้า

1. `navigation.html` — เมนู, `#langSelect`
2. `hero.html` — `#home`
3. `profile.html` — `#profile` และ include `skills.html` ที่ `#skills`
4. `experience.html` — `#experience`
5. `cloud-platforms.html` — `#cloud-platforms`
6. `visual-highlights.html` — `#portfolio` การ์ด asm, olaf, homema, votemai
7. `uiux-projects.html` — `#uiux-projects`
8. `certificates.html` — `#certificates`
9. `guestbook.html` — `#guestbook-section` ลิงก์ไป `guestbook.html`
10. `contact.html` — `#contact`
11. `footer.html` — `#footer`
12. `project-modal.html` — `#projectModal`

สคริปต์ที่ยังอยู่ในเทมเพลต (ไม่ได้อยู่ไฟล์แยก) อยู่ท้าย `templates/index.template.html`

- เปิด/ปิด project modal
- สถานะ nav ตอนเลื่อน
- carousel ใน `#portfolio` (ของเก่า; สายพานจริงอยู่ที่ `projects-gsap.js`)
- การ์ดใบประกาศ
- เมนูมือถือ
- เริ่ม AOS
- โหลด Google Analytics `G-NNJBFHP6S8` หลังโหลดหน้า
- แถบความคืบหน้าการเลื่อน `#scroll-progress-bar`

ภาษาของหน้ามาจากไฟล์คนละใบที่ build จากเทมเพลตเดียวกัน
`index.html` คืออังกฤษ, ที่เหลือคือ `th.html` `ja.html` `zh.html` `de.html` `ko.html`

## ภาษา

ข้อความที่ผู้ใช้เห็นบนหน้าแรกอยู่ใน `i18n.js` ก้อน `translations`
ภาษา: `en` `th` `ja` `zh` `de` `ko`
คีย์ชั้นบน: `nav` `hero` `profile` `about` `education` `skills` `cloud` `creator`
`automation` `visual` `modal` `portfolioList` `experience` `extracurricular`
`certificates` `contact` `footer`

HTML ใส่ข้อความอังกฤษไว้เป็นค่าเริ่มต้น และใส่ `data-i18n="hero.hi"`
`i18n.js` สลับข้อความหลังโหลด และจำภาษาใน `localStorage` คีย์ `language`
หน้า `/links/` ไม่ใช้ไฟล์นี้ มันมีก้อนแปลของตัวเองใน `links/links.js`
แต่อ่านภาษาที่บันทึกไว้ก้อนเดียวกัน

เพิ่มประโยคใหม่ต้องใส่ครบทุกภาษา แล้วขึ้น `?v=` ของ `i18n.js` ในเทมเพลต

## สไตล์และแอนิเมชัน

| ไฟล์ | ใช้กับ |
|---|---|
| `stylesheets/index.css` | หน้าแรกเกือบทั้งหมด รวม nav, hero, profile, skills, projects, cloud |
| `stylesheets/fontsex.css` | ฟอนต์และ fallback กันตัวหนังสือกระโดด |
| `stylesheets/guestbook.css` | ประตูสมุดเยี่ยมและหน้า `guestbook.html` |
| `stylesheets/links.css` | หน้า `/links/` |
| `stylesheets/contact.css` | ไม่ได้ลิงก์แล้ว คลาสปุ่มโซเชียลเก่าไม่มีในหน้า |
| `stylesheets/buttonprofile.css` | ไม่ได้ลิงก์แล้ว |
| `stylesheets/cardblock2.css` | ไม่ได้ลิงก์แล้ว |
| `stylesheets/cardslide.css` | ไม่ได้ลิงก์แล้ว |
| `stylesheets/baseblock.css` | ไม่ได้ลิงก์แล้ว |
| `stylesheets/skeleton.css` | หน้าโหลดของหน้ารายละเอียดโปรเจกต์ |

แอนิเมชัน GSAP อยู่คนละไฟล์กับ HTML และถูกโหลดจากเทมเพลต

- `hero-gsap.js` — hero
- `profile-cards.js` — ลากรูปโปรไฟล์สลับใบ
- `experience-gsap.js` — ประสบการณ์
- `cloud-platforms-gsap.js` — cloud
- `projects-gsap.js` — สายพานโปรเจกต์เด่น
- `uiux-gsap.js` — แกลเลอรีเอียง

ไลบรารี Bootstrap 5.3.3, AOS 2.3.1, GSAP 3.12.7 + ScrollTrigger และ Font Awesome 5 อยู่ใน `vendor/`
Google Fonts ยังโหลดจาก Google หนึ่งชุดต่อหน้า
`npm run build` minify CSS ไปที่ `stylesheets/min/` และเขียน `.min.js` คู่กับสคริปต์เดิม

## บทความและโปรเจกต์

เขียน Markdown ที่มี front matter แล้ว build
URL ใช้ฟิลด์ `slug` ถ้าไม่ใส่ slug จะใช้ชื่อไฟล์

บทความที่มีต้นฉบับ Markdown

- `articles/nextjs-beginner-guide.md`
- `articles/clean-code-techniques.md`
- `articles/cs-kmutnb-course-review.md`
- `articles/cs-kmutnb-student-life-review.md`

`articles/git-amend-guide.html` ไม่มีไฟล์ `.md` แก้ที่ HTML ได้เลย build จะไม่เขียนทับ

โปรเจกต์ (แก้ `.md` เท่านั้น)

- `projects/asm.md`
- `projects/olaf.md`
- `projects/homema.md`
- `projects/votemai.md`
- `projects/coffee-shop-web-application.md`
- `projects/point-of-sale-web-application.md`
- `projects/numerical-methods-calculator.md`

เทมเพลตหน้ารายละเอียดคือ `templates/project.template.html`
`templates/project.html` เป็นเทมเพลตสำรองที่ `build.js` ใช้เมื่อไฟล์แรกหาย
ไอคอนแท็กเทคโนโลยีอยู่ใน `PROJECT_TECH_ICON_MAP` ใน `build.js`

รูปโปรเจกต์และรูปโปรไฟล์อยู่ใน `Photo/optimized/`
รูป mockup อยู่ใน `Photo/optimized/Mockup/`
ย่อรูปด้วย `npm run optimize-images` ผลไปที่ `Photo/optimized/`

## หน้าที่ไม่ได้มาจาก build

แก้ไฟล์เหล่านี้ตรง ๆ ไม่ต้องรัน `build.js`

- `guestbook.html` — ฟอร์ม โน้ตบนผนัง และปุ่มแอดมิน เรียก `https://api.nattazxin.com` มี Turnstile
- `links/index.html` + `links/links.js` + `stylesheets/links.css` — หน้าลิงก์รวม ไอคอนโซเชียลและการ์ดติดต่อ
- `articles/git-amend-guide.html`
- `robots.txt`

## สมุดเยี่ยม

บนหน้าแรกมีแค่ประตูใน `components/index/guestbook.html`
หน้าจริงคือ `guestbook.html` (สไตล์ `stylesheets/guestbook.css`)
API อยู่คนละโฟลเดอร์ ไม่ได้อยู่ใน git ของเว็บนี้

| ไฟล์ | หน้าที่ |
|---|---|
| `../guestbook-api/src/index.js` | Worker: `GET/POST /entries`, ซ่อน/โชว์, ตรวจแอดมิน |
| `../guestbook-api/schema.sql` | ตาราง `entries` และ `post_limits` |
| `../guestbook-api/wrangler.jsonc` | ชื่อ worker, D1 `cmmnattazxin`, โดเมน `api.nattazxin.com` |

ต้นทางที่อนุญาตมีแค่ `https://nattazxin.com` และ `https://www.nattazxin.com`
ความลับ `ADMIN_TOKEN` กับ `TURNSTILE_SECRET` อยู่ใน env ของ Worker ไม่ได้อยู่ใน repo

## ไฟล์ที่พักไว้ ยังไม่โผล่บนหน้า

- `components/index/content-creator.html` — ส่วน TikTok บนหน้าแรกยังถูกพักไว้ สไตล์เก่าอยู่ใน `stylesheets/index.css` ใต้ `#content-creator`
- `components/index/automation-tools.html` — ไม่มีใคร include
- `components/index/loading-screen.html` — ใช้ในเทมเพลตหน้ารายละเอียดโปรเจกต์ หน้าแรกเอาออกแล้ว
- บล็อก Tawk.to ใน `templates/index.template.html` ถูกคอมเมนต์ไว้
