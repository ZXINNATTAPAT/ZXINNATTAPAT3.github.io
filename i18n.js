// Internationalization (i18n) for Portfolio Website
const translations = {
  en: {
    nav: {
      home: "Home",
      profile: "Profile",
      portfolio: "Portfolio",
      experience: "Experience",
      certificates: "Certificates",
      blog: "Blog",
      language: "Language",
      contact: "Contact"
    },
    hero: {
      hi: "Hi, I'm",
      developer: "A Software Developer",
      location: "Based in",
      thailand: "Thailand",
      education: "B.Sc. in Computer and Information Science — Faculty of Applied Science"
    },
    profile: {
      title: "PROFILE",
      airdrop: "AirDrop",
      myProfile: "MY PROFILE",
      decline: "Decline",
      accept: "Accept"
    },
    about: {
      title: "About Me",
      letsWork: "Let's Work together",
      resume: "Resume",
      description:
        "My name is Nattapat Phungphugdee.<br/>" +
        "I'm a <strong>frontend-focused full stack developer</strong> currently working full-time on real-world web applications.<br/><br/>" +
        "My primary focus is <strong>frontend development</strong>. I build clean, reliable user interfaces with attention to usability, consistency, and long-term maintainability. I prefer simple and clear solutions that work well in production, rather than overly complex designs.<br/><br/>" +
        "On the backend side, I work comfortably at an intermediate level. I regularly integrate APIs, handle data flows, and understand system logic well enough to design frontend features that fit properly into the overall system.<br/><br/>" +
        "In my daily work, I value readable code, practical design decisions, and teamwork. I'm used to working in real development environments—collaborating with others, handling feedback, and improving existing systems over time.<br/><br/>" +
        "I'm open to opportunities as a <strong>Frontend Developer</strong> or <strong>Full Stack Developer</strong>, where I can continue delivering production-level frontend work while growing deeper in backend engineering and system design."
    },
    education: {
      title: "Education",
      kmutnb: {
        year: "2021 - Present",
        achievements: "Achievements",
        scienceDay: "Science Exhibition Day 2025",
        goldAward: "🥇 Gold Award Winner - Asset Management System for ECT Central Office",
        coursework: "Key Coursework",
        web: "Web Development",
        software: "Software Engineering",
        python: "Python Programming",
        dataStructure: "Data Structure"
      },
      sarasas: {
        year: "2009 - 2015 (Elementary)"
      }
    },
    skills: {
      title: "Tech Stack",
      listAll: "List all skills"
    },
    cloud: {
      kicker: "Deployment Picks",
      title: "Cloud & Hosting",
      description: "Platforms I like using when shipping and hosting products."
    },
    creator: {
      mode: "Creator mode",
      subtitle: "Quick snapshots from my dev-life TikTok channel.",
      title: "Tech Content Creator",
      description: "",
      cards: {
        teamwork: {
          title: "Teamwork & Git",
          description: "First team project shipped with Git—messy process, solid lesson learned together."
        },
        framework: {
          title: "Framework Experiments",
          description: "Comparing Tailwind vs Bootstrap in real projects to find the right fit."
        },
        ui: {
          title: "UI Components",
          description: "Sharing how I add motion and polish to Bootstrap card components."
        }
      },
      experimentsTitle: "Experiments",
      experimentsHtml:
        '<section class="creator-exp-org mb-3">' +
        '<h3 class="h6 mb-1 fw-semibold" style="color:#1d1d1f;"><a href="https://www.balives.com/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">Business ALive Co., Ltd (Thailand) <i class="fas fa-external-link-alt ms-1" style="font-size: 0.7rem; opacity: 0.7;"></i></a></h3>' +
        '<p class="small text-muted mb-2 mb-md-3">Hybrid · 10 mos</p>' +
        '<p class="small fw-semibold mb-1" style="color:#2c2c2c;">Software Developer · Full-time</p>' +
        '<p class="small text-muted mb-2">Aug 2025 – Present · 9 mos · Bangkok, Thailand</p>' +
        '<ul class="small ps-3 mb-2 creator-exp-list">' +
        "<li>Work directly with clients to understand requirements, discuss workflows, and refine features so the system matches real business needs.</li>" +
        "<li>Handle primary frontend responsibilities and contribute to backend development when features require full end-to-end implementation.</li>" +
        "<li>Participate in API and system design with a focus on scalability and performance, including reducing unnecessary response data and improving API efficiency.</li>" +
        "<li>Build reusable and tailored UI components to solve product-specific problems, such as custom search comboboxes that combine dropdown interactions with pagination.</li>" +
        "<li>Collaborate with the team in an Agile workflow using Azure DevOps for task management, code reviews, and sprint discussions.</li>" +
        "</ul>" +
        '<p class="small text-secondary mb-3">Next.js · NestJS · +1</p>' +
        '<p class="small fw-semibold mb-1" style="color:#2c2c2c;">Next.js Developer · Part-time</p>' +
        '<p class="small text-muted mb-2">Jul 2025 – Aug 2025 · 2 mos · Bangkok, Thailand</p>' +
        '<ul class="small ps-3 mb-2 creator-exp-list">' +
        "<li>Implemented specific features and fixed bugs in ongoing projects.</li>" +
        "<li>Gained hands-on experience in an Agile, task-based development environment alongside full-time developers.</li>" +
        "</ul>" +
        '<p class="small text-secondary mb-0">Next.js · NestJS</p>' +
        "</section>" +
        '<section class="creator-exp-org">' +
        '<h3 class="h6 mb-1 fw-semibold" style="color:#1d1d1f;">Office of the Election Commission of Thailand</h3>' +
        '<p class="small text-muted mb-2">Internship · May 2024 – Jul 2024 · 3 mos · Bangkok · On-site</p>' +
        '<p class="small fw-semibold mb-2" style="color:#2c2c2c;">Developer — Internship &amp; Capstone: Asset Management System</p>' +
        '<ul class="small ps-3 mb-2 creator-exp-list">' +
        "<li>Developed and maintained an internal Asset Management System using C# and Microsoft SQL Server.</li>" +
        "<li>Designed and implemented a web application to streamline equipment and asset tracking across departments.</li>" +
        "<li>Collaborated with IT officers to test, refine, and enhance the system for better data accessibility and operational efficiency.</li>" +
        "</ul>" +
        '<p class="small text-secondary mb-0">C# · Microsoft SQL Server · +1</p>' +
        "</section>"
    },
    automation: {
      title: "Workflow Automation",
      description: "Using automation to connect services, reduce repetitive work, and create smoother digital workflows.",
      makecom: {
        title: "Make.com",
        tags: {
          automation: "Automation",
          integration: "Integration",
          notifications: "Notifications"
        },
        description: "Building connected workflows across APIs, notifications, and business processes with a focus on simplicity and reliability."
      },
      playwright: {
        title: "Playwright",
        description: "End-to-end testing framework for web applications. Writing reliable tests across multiple browsers with modern automation capabilities."
      },
      cicd: {
        title: "CI/CD",
        description: "Continuous Integration and Deployment pipelines. Automating build, test, and deployment processes for faster and more reliable releases."
      }
    },
    visual: {
      title: "Projects",
      description: "A curated selection of my featured projects. Each work blends elegant design, smart functionality, and seamless user experiences."
    },
    modal: {
      technologies: "Technologies",
      viewGithub: "View on GitHub",
      liveDemo: "Live Demo"
    },
    portfolioList: {
      portfolio: "Portfolio",
      project: "PROJECT",
      moreProjects: "More projects"
    },
    experience: {
      title: "EXPERIENCE & INTERNSHIP",
      description: "My professional journey from internship to full-time developer, building real-world solutions and growing with each opportunity.",
      hint: "Click a widget to view details"
    },
    extracurricular: {
      title: "EXTRACURRICULAR & COMMUNITY"
    },
    certificates: {
      title: "Browse My Achievements",
      description: "A collection of certifications and skills I've earned through real projects and continuous learning.",
      viewMore: "View more on LinkedIn"
    },
    contact: {
      title: "Get in Touch",
      description: "Ready to collaborate? Reach out through email or connect on social platforms.",
      emailLabel: "Email",
      locationLabel: "Location",
      availableLabel: "Availability",
      availableValue: "Open for freelance and full-time opportunities",
      socialLabel: "Social",
      ctaTitle: "Let's build something together",
      ctaDescription: "Share your idea, timeline, and goals. I will get back to you as soon as possible.",
      sendEmail: "Send Email",
      openLinkedIn: "Open LinkedIn"
    },
    footer: {
      brandCopy: "Full-stack developer crafting beautiful interfaces and dependable systems across web, cloud, and mobile.",
      portfolioHeading: "Portfolio",
      portfolioVisual: "Visual Highlights",
      portfolioProfile: "Profile",
      portfolioCertificates: "Certificates",
      experienceHeading: "Experience",
      experienceWorkHistory: "Work History",
      experienceInternships: "Internships",
      experienceAwards: "Awards",
      resourcesHeading: "Resources",
      contactHeading: "Contact",
      contactEmail: "Email",
      contactLabel: "Contact",
      copyright: "© 2025 Nattapat Phungphugdee. All rights reserved.",
      backToTop: "Back to top",
      hireMe: "Hire me"
    }
  },
  th: {
    nav: {
      home: "หน้าแรก",
      profile: "โปรไฟล์",
      portfolio: "ผลงาน",
      experience: "ประสบการณ์",
      certificates: "ใบรับรอง",
      blog: "บล็อก",
      language: "ภาษา",
      contact: "ติดต่อ"
    },
    hero: {
      hi: "สวัสดีครับ ผมคือ",
      developer: "ซอฟต์แวร์ดีเวลลอปเปอร์",
      location: "ที่ทำงานอยู่ใน",
      thailand: "ประเทศไทย",
      education: "วท.บ. วิทยาการคอมพิวเตอร์และสารสนเทศ — คณะวิทยาศาสตร์ประยุกต์"
    },
    profile: {
      title: "โปรไฟล์",
      airdrop: "AirDrop",
      myProfile: "โปรไฟล์ของฉัน",
      decline: "ปฏิเสธ",
      accept: "ยอมรับ"
    },
    about: {
      title: "เกี่ยวกับผม",
      letsWork: "มาร่วมงานกัน",
      resume: "เรซูเม่",
      description:
        "ผมชื่อ ณัฐภัทร พึ่งภักดี<br/>" +
        "ปัจจุบันทำงานเป็น <strong>นักพัฒนา Full Stack ที่เน้น Frontend</strong> แบบเต็มเวลา บนงานเว็บแอปพลิเคชันจริง<br/><br/>" +
        "โฟกัสหลักของผมคือ <strong>การพัฒนา Frontend</strong> ผมชอบสร้าง UI ที่สะอาด ใช้งานง่าย และดูแลต่อได้ในระยะยาว โดยเน้นทางออกที่เรียบง่ายแต่ใช้งานได้จริงในโปรดักชัน<br/><br/>" +
        "ฝั่ง Backend ผมทำงานได้ในระดับกลาง ทั้งการเชื่อมต่อ API การจัดการข้อมูล และเข้าใจตรรกะระบบมากพอที่จะออกแบบฟีเจอร์ฝั่ง Frontend ให้เข้ากับระบบภาพรวมได้อย่างเหมาะสม<br/><br/>" +
        "ในการทำงานประจำวัน ผมให้ความสำคัญกับโค้ดที่อ่านง่าย การตัดสินใจเชิงออกแบบที่ใช้งานได้จริง และการทำงานเป็นทีม ผมคุ้นเคยกับการทำงานร่วมกับผู้อื่น รับฟีดแบ็ก และพัฒนาระบบเดิมให้ดีขึ้นอย่างต่อเนื่อง<br/><br/>" +
        "ผมเปิดรับโอกาสในตำแหน่ง <strong>Frontend Developer</strong> หรือ <strong>Full Stack Developer</strong> เพื่อส่งมอบงานหน้าเว็บระดับโปรดักชัน พร้อมเติบโตต่อในด้าน Backend และ System Design"
    },
    education: {
      title: "การศึกษา",
      kmutnb: {
        year: "2021 - ปัจจุบัน",
        achievements: "ผลงานเด่น",
        scienceDay: "งาน Science Exhibition Day 2025",
        goldAward: "🥇 รางวัลเหรียญทอง - ระบบบริหารครุภัณฑ์สำหรับสำนักงาน กกต. ส่วนกลาง",
        coursework: "รายวิชาที่เกี่ยวข้อง",
        web: "การพัฒนาเว็บ",
        software: "วิศวกรรมซอฟต์แวร์",
        python: "การเขียนโปรแกรม Python",
        dataStructure: "โครงสร้างข้อมูล"
      },
      sarasas: {
        year: "2009 - 2015 (ประถมศึกษา)"
      }
    },
    skills: {
      title: "Tech Stack",
      listAll: "สกิลทั้งหมด"
    },
    cloud: {
      kicker: "Deployment Picks",
      title: "Cloud & Hosting",
      description: "แพลตฟอร์มที่ผมชอบใช้เวลาปล่อยงานและโฮสต์โปรเจกต์"
    },
    creator: {
      mode: "โหมดครีเอเตอร์",
      subtitle: "ภาพสั้น ๆ จากช่อง TikTok สายเดฟของผม",
      title: "คอนเทนต์ครีเอเตอร์สายเทค",
      description:
        "ติดตามชีวิตการโค้ดและสายเดฟของผมบน TikTok 💻🎥<br class=\"d-md-none\" />" +
        "ผมแชร์ทั้งเทคนิคโค้ด บันทึกการพัฒนา และเรื่องราวคอมมูนิตี้ทั้งไทยและอังกฤษ",
      cards: {
        teamwork: {
          title: "การทำงานเป็นทีมและ Git",
          description: "โปรเจกต์ทีมครั้งแรกที่ส่งงานด้วย Git แม้กระบวนการจะยังไม่เป๊ะ แต่ได้บทเรียนที่ดีมาก"
        },
        framework: {
          title: "ลองใช้ Framework",
          description: "เปรียบเทียบ Tailwind กับ Bootstrap ในงานจริง เพื่อหาจุดที่เหมาะกับงาน"
        },
        ui: {
          title: "UI Components",
          description: "แชร์วิธีเพิ่มโมชั่นและความเนี๊ยบให้ Bootstrap card components"
        }
      },
      experimentsTitle: "การทดลองและประสบการณ์",
      experimentsHtml:
        '<section class="creator-exp-org mb-3">' +
        '<h3 class="h6 mb-1 fw-semibold" style="color:#1d1d1f;"><a href="https://www.balives.com/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">Business ALive Co., Ltd (ประเทศไทย) <i class="fas fa-external-link-alt ms-1" style="font-size: 0.7rem; opacity: 0.7;"></i></a></h3>' +
        '<p class="small text-muted mb-2 mb-md-3">Hybrid · 10 เดือน</p>' +
        '<p class="small fw-semibold mb-1" style="color:#2c2c2c;">Software Developer · เต็มเวลา</p>' +
        '<p class="small text-muted mb-2">ส.ค. 2025 – ปัจจุบัน · 9 เดือน · กรุงเทพฯ</p>' +
        '<ul class="small ps-3 mb-2 creator-exp-list">' +
        "<li>ทำงานร่วมกับลูกค้าโดยตรงเพื่อรับความต้องการ ออกแบบเวิร์กโฟลว์ และปรับฟีเจอร์ให้ระบบสอดคล้องกับการใช้งานจริง</li>" +
        "<li>รับผิดชอบหลักฝั่ง frontend และช่วยงาน backend เมื่อฟีเจอร์ต้องทำแบบ end-to-end</li>" +
        "<li>มีส่วนร่วมออกแบบ API และระบบ โดยเน้นความสามารถในการขยายและประสิทธิภาพ รวมถึงลดข้อมูล response ที่ไม่จำเป็น</li>" +
        "<li>สร้าง UI component ที่นำกลับมาใช้ได้และเหมาะกับผลิตภัณฑ์ เช่น combobox ค้นหาแบบผสม dropdown กับ pagination</li>" +
        "<li>ทำงานแบบ Agile กับทีม ใช้ Azure DevOps จัดงาน รีวิวโค้ด และประชุมสปรินต์</li>" +
        "</ul>" +
        '<p class="small text-secondary mb-3">Next.js · NestJS · +1</p>' +
        '<p class="small fw-semibold mb-1" style="color:#2c2c2c;">Next.js Developer · พาร์ทไทม์</p>' +
        '<p class="small text-muted mb-2">ก.ค. 2025 – ส.ค. 2025 · 2 เดือน · กรุงเทพฯ</p>' +
        '<ul class="small ps-3 mb-2 creator-exp-list">' +
        "<li>พัฒนาฟีเจอร์และแก้บั๊กในโปรเจกต์ที่มีอยู่</li>" +
        "<li>ได้ประสบการณ์จริงในสภาพแวดล้อม Agile แบบจัดงานเป็นทาสก์ ร่วมกับทีมพัฒนาเต็มเวลา</li>" +
        "</ul>" +
        '<p class="small text-secondary mb-0">Next.js · NestJS</p>' +
        "</section>" +
        '<section class="creator-exp-org">' +
        '<h3 class="h6 mb-1 fw-semibold" style="color:#1d1d1f;">สำนักงานคณะกรรมการการเลือกตั้ง (กกต.)</h3>' +
        '<p class="small text-muted mb-2">ฝึกงาน · พ.ค. 2024 – ก.ค. 2024 · 3 เดือน · กรุงเทพฯ · On-site</p>' +
        '<p class="small fw-semibold mb-2" style="color:#2c2c2c;">Developer — ฝึกงานและโครงการ Capstone: ระบบบริหารทรัพย์สิน (Asset Management System)</p>' +
        '<ul class="small ps-3 mb-2 creator-exp-list">' +
        "<li>พัฒนาและดูแลระบบบริหารทรัพย์สินภายในองค์กรด้วย C# และ Microsoft SQL Server</li>" +
        "<li>ออกแบบและพัฒนาเว็บแอปเพื่อติดตามครุภัณฑ์และทรัพย์สินข้ามหน่วยงาน</li>" +
        "<li>ประสานงานเจ้าหน้าที่ IT ในการทดสอบ ปรับปรุง และยกระดับระบบให้เข้าถึงข้อมูลและใช้งานได้มีประสิทธิภาพขึ้น</li>" +
        "</ul>" +
        '<p class="small text-secondary mb-0">C# · Microsoft SQL Server · +1</p>' +
        "</section>"
    },
    automation: {
      title: "ระบบอัตโนมัติเวิร์กโฟลว์",
      description: "ใช้ระบบอัตโนมัติเพื่อเชื่อมต่อบริการ ลดงานซ้ำซ้อน และทำให้เวิร์กโฟลว์ดิจิทัลลื่นไหลยิ่งขึ้น",
      makecom: {
        title: "Make.com",
        tags: {
          automation: "อัตโนมัติ",
          integration: "การเชื่อมต่อ",
          notifications: "การแจ้งเตือน"
        },
        description: "สร้างเวิร์กโฟลว์ที่เชื่อมต่อกันระหว่าง API ระบบแจ้งเตือน และกระบวนการธุรกิจ โดยเน้นความเรียบง่ายและความน่าเชื่อถือ"
      },
      playwright: {
        title: "Playwright",
        description: "เฟรมเวิร์กทดสอบแบบ End-to-end สำหรับเว็บแอป เขียนเทสที่เชื่อถือได้ข้ามหลายเบราว์เซอร์ด้วยความสามารถอัตโนมัติสมัยใหม่"
      },
      cicd: {
        title: "CI/CD",
        description: "Pipeline สำหรับ Continuous Integration และ Deployment ที่ทำให้ขั้นตอน build, test และ deploy อัตโนมัติ รวดเร็ว และเชื่อถือได้มากขึ้น"
      }
    },
    visual: {
      title: "ผลงานเด่น",
      description: "คัดสรรโปรเจกต์เด่นที่ผสมผสานงานออกแบบ ฟังก์ชันที่ใช้งานจริง และประสบการณ์ใช้งานที่ลื่นไหล"
    },
    modal: {
      technologies: "เทคโนโลยี",
      viewGithub: "ดูบน GitHub",
      liveDemo: "ดูเดโม"
    },
    portfolioList: {
      portfolio: "ผลงาน",
      project: "โปรเจกต์",
      moreProjects: "ดูโปรเจกต์เพิ่มเติม"
    },
    experience: {
      title: "ประสบการณ์และการฝึกงาน",
      description: "เส้นทางการทำงานของผมตั้งแต่ฝึกงานจนถึงนักพัฒนาเต็มเวลา พร้อมการเติบโตจากงานจริงในแต่ละโอกาส",
      hint: "กดที่วิดเจ็ตเพื่อดูรายละเอียด"
    },
    extracurricular: {
      title: "กิจกรรมนอกหลักสูตรและชุมชน"
    },
    certificates: {
      title: "ใบรับรองและความสำเร็จ",
      description: "รวมใบรับรองและทักษะที่ผมสะสมจากโปรเจกต์จริงและการเรียนรู้อย่างต่อเนื่อง",
      viewMore: "ดูเพิ่มเติมบน LinkedIn"
    },
    contact: {
      title: "ติดต่อผม",
      description: "พร้อมร่วมงานแล้วไหม? ติดต่อผ่านอีเมลหรือช่องทางโซเชียลได้เลย",
      emailLabel: "อีเมล",
      locationLabel: "ที่อยู่",
      availableLabel: "สถานะ",
      availableValue: "เปิดรับงาน Freelance และโอกาส Full-time",
      socialLabel: "โซเชียล",
      ctaTitle: "มาสร้างอะไรดี ๆ ร่วมกัน",
      ctaDescription: "ส่งรายละเอียดไอเดีย ช่วงเวลา และเป้าหมายของคุณมาได้เลย ผมจะรีบตอบกลับให้เร็วที่สุด",
      sendEmail: "ส่งอีเมล",
      openLinkedIn: "เปิด LinkedIn"
    },
    footer: {
      brandCopy: "นักพัฒนา Full-stack ที่เน้นสร้างอินเทอร์เฟซที่สวยงามและระบบที่เชื่อถือได้ทั้งบนเว็บ คลาวด์ และมือถือ",
      portfolioHeading: "ผลงาน",
      portfolioVisual: "ผลงานเด่น",
      portfolioProfile: "โปรไฟล์",
      portfolioCertificates: "ใบรับรอง",
      experienceHeading: "ประสบการณ์",
      experienceWorkHistory: "ประวัติการทำงาน",
      experienceInternships: "การฝึกงาน",
      experienceAwards: "รางวัล",
      resourcesHeading: "แหล่งข้อมูล",
      contactHeading: "ติดต่อ",
      contactEmail: "อีเมล",
      contactLabel: "ติดต่อ",
      copyright: "© 2025 Nattapat Phungphugdee. สงวนลิขสิทธิ์",
      backToTop: "กลับไปด้านบน",
      hireMe: "จ้างงานผม"
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      profile: "プロフィール",
      portfolio: "ポートフォリオ",
      experience: "経験",
      certificates: "資格",
      blog: "ブログ",
      language: "言語",
      contact: "お問い合わせ"
    },
    hero: {
      hi: "こんにちは、私は",
      developer: "ソフトウェア開発者",
      location: "活動拠点は",
      thailand: "タイ",
      education: "応用科学部 コンピュータ・情報科学 学士"
    },
    profile: {
      title: "プロフィール",
      airdrop: "AirDrop",
      myProfile: "マイプロフィール",
      decline: "拒否",
      accept: "承認"
    },
    about: {
      title: "私について",
      letsWork: "一緒に働きましょう",
      resume: "履歴書",
      description:
        "私の名前はナッタパット・プンパクディーです。<br/>" +
        "現在、実務のWebアプリ開発で <strong>フロントエンド重視のフルスタック開発者</strong> としてフルタイムで働いています。<br/><br/>" +
        "主な強みは <strong>フロントエンド開発</strong> です。使いやすさ・一貫性・保守性を重視し、クリーンで信頼できるUIを構築します。複雑すぎる設計より、本番で確実に機能するシンプルで明確な解決策を好みます。<br/><br/>" +
        "バックエンドは中級レベルで対応できます。API連携、データフロー処理、システムロジックの理解を活かし、全体設計に適合するフロントエンド機能を実装します。<br/><br/>" +
        "日々の開発では、読みやすいコード、実用的な設計判断、チームワークを大切にしています。実開発環境での協業、フィードバック対応、既存システムの継続的改善に慣れています。<br/><br/>" +
        "<strong>フロントエンド開発者</strong> または <strong>フルスタック開発者</strong> として、実運用レベルのフロントエンド提供を続けながら、バックエンドとシステム設計の領域をさらに深めていきたいと考えています。"
    },
    education: {
      title: "学歴",
      kmutnb: {
        year: "2021 - 現在",
        achievements: "実績",
        scienceDay: "Science Exhibition Day 2025",
        goldAward: "🥇 金賞 - ECT中央オフィス向け資産管理システム",
        coursework: "主な履修科目",
        web: "Web開発",
        software: "ソフトウェア工学",
        python: "Pythonプログラミング",
        dataStructure: "データ構造"
      },
      sarasas: {
        year: "2009 - 2015 (小学校)"
      }
    },
    skills: {
      title: "Tech Stack",
      listAll: "全スキル"
    },
    cloud: {
      kicker: "Deployment Picks",
      title: "Cloud & Hosting",
      description: "プロダクトの公開やホスティングでよく使うプラットフォームです。"
    },
    creator: {
      mode: "クリエイターモード",
      subtitle: "開発系TikTokチャンネルからのショートスナップ",
      title: "テックコンテンツクリエイター",
      description:
        "TikTokで私のコーディングと開発ライフをフォローしてください 💻🎥<br class=\"d-md-none\" />" +
        "コードのコツ、開発ログ、コミュニティの話題をタイ語と英語で発信しています。",
      cards: {
        teamwork: {
          title: "チームワーク & Git",
          description: "Gitで出荷した初めてのチーム開発。プロセスは荒削りでも、確かな学びが得られました。"
        },
        framework: {
          title: "フレームワーク実験",
          description: "実案件でTailwindとBootstrapを比較し、目的に合う選択を見極めています。"
        },
        ui: {
          title: "UIコンポーネント",
          description: "Bootstrapカードにモーションと仕上げを加える方法を共有しています。"
        }
      },
      experimentsTitle: "実験・実務ハイライト"
    },
    automation: {
      title: "ワークフロー自動化",
      description: "自動化を活用してサービスをつなぎ、繰り返し作業を減らし、よりスムーズなデジタルワークフローを実現します。",
      makecom: {
        title: "Make.com",
        tags: {
          automation: "自動化",
          integration: "連携",
          notifications: "通知"
        },
        description: "API、通知、業務プロセスをまたぐ連携ワークフローを、シンプルさと信頼性を重視して構築します。"
      },
      playwright: {
        title: "Playwright",
        description: "Webアプリ向けのE2Eテストフレームワーク。複数ブラウザで信頼性の高い自動テストを実装します。"
      },
      cicd: {
        title: "CI/CD",
        description: "継続的インテグレーションとデプロイのパイプライン。build・test・deployを自動化し、リリースを高速かつ安定化します。"
      }
    },
    visual: {
      title: "ビジュアルハイライト",
      description: "代表的なプロジェクトを厳選して紹介。デザイン、機能性、シームレスなUXを融合しています。"
    },
    modal: {
      technologies: "使用技術",
      viewGithub: "GitHubで見る",
      liveDemo: "デモを見る"
    },
    portfolioList: {
      portfolio: "ポートフォリオ",
      project: "プロジェクト",
      moreProjects: "さらにプロジェクトを見る"
    },
    experience: {
      title: "経験とインターンシップ",
      description: "インターンからフルタイム開発者まで、実務を通じて成長してきたプロフェッショナルの歩みです。",
      hint: "ウィジェットをクリックして詳細を見る"
    },
    extracurricular: {
      title: "課外活動とコミュニティ"
    },
    certificates: {
      title: "実績と資格",
      description: "実プロジェクトと継続学習を通じて取得した資格とスキルの一覧です。",
      viewMore: "LinkedInでさらに見る"
    },
    contact: {
      title: "お問い合わせ",
      description: "コラボレーションのご相談は、メールまたはSNSからお気軽にご連絡ください。",
      emailLabel: "メール",
      locationLabel: "所在地",
      availableLabel: "対応状況",
      availableValue: "フリーランスとフルタイムの機会を受け付けています",
      socialLabel: "ソーシャル",
      ctaTitle: "一緒に何かを作りましょう",
      ctaDescription: "アイデア、スケジュール、目標を共有してください。できるだけ早くご返信します。",
      sendEmail: "メールを送る",
      openLinkedIn: "LinkedInを開く"
    },
    footer: {
      brandCopy: "Web、クラウド、モバイルで、美しいUIと信頼できるシステムを構築するフルスタック開発者です。",
      portfolioHeading: "ポートフォリオ",
      portfolioVisual: "ビジュアルハイライト",
      portfolioProfile: "プロフィール",
      portfolioCertificates: "資格",
      experienceHeading: "経験",
      experienceWorkHistory: "職務経歴",
      experienceInternships: "インターンシップ",
      experienceAwards: "受賞歴",
      resourcesHeading: "リソース",
      contactHeading: "お問い合わせ",
      contactEmail: "メール",
      contactLabel: "お問い合わせ",
      copyright: "© 2025 Nattapat Phungphugdee. All rights reserved.",
      backToTop: "上に戻る",
      hireMe: "相談する"
    }
  },
  zh: {
    nav: {
      home: "首页",
      profile: "个人简介",
      portfolio: "作品集",
      experience: "经验",
      certificates: "证书",
      blog: "博客",
      language: "语言",
      contact: "联系"
    },
    hero: {
      hi: "你好，我是",
      developer: "一名软件开发者",
      location: "常驻",
      thailand: "泰国",
      education: "计算机与信息科学学士 — 应用科学学院"
    },
    profile: {
      title: "个人简介",
      airdrop: "AirDrop",
      myProfile: "我的资料",
      decline: "拒绝",
      accept: "接受"
    },
    about: {
      title: "关于我",
      letsWork: "一起合作吧",
      resume: "简历",
      description:
        "我叫 Nattapat Phungphugdee。<br/>" +
        "目前是一名 <strong>以前端为核心的全栈开发者</strong>，全职参与真实业务场景的 Web 应用开发。<br/><br/>" +
        "我的主要方向是 <strong>前端开发</strong>。我专注于构建干净、可靠且易用的界面，重视可用性、一致性和长期可维护性。相比复杂冗余的设计，我更偏好能在生产环境稳定落地的简洁方案。<br/><br/>" +
        "后端方面我具备中级能力，能熟练进行 API 集成、数据流处理，并理解系统逻辑，从而让前端功能与整体系统架构更好地协同。<br/><br/>" +
        "在日常工作中，我重视代码可读性、务实的设计决策以及团队协作。对真实开发流程、跨角色沟通、持续迭代和系统优化都有成熟经验。<br/><br/>" +
        "我目前开放 <strong>前端开发工程师</strong> 或 <strong>全栈开发工程师</strong> 的机会，期待持续交付生产级前端成果，并进一步深化后端工程与系统设计能力。"
    },
    education: {
      title: "教育经历",
      kmutnb: {
        year: "2021 - 至今",
        achievements: "成果",
        scienceDay: "Science Exhibition Day 2025",
        goldAward: "🥇 金奖 - 泰国选举委员会中央办公室资产管理系统",
        coursework: "核心课程",
        web: "Web 开发",
        software: "软件工程",
        python: "Python 编程",
        dataStructure: "数据结构"
      },
      sarasas: {
        year: "2009 - 2015（小学）"
      }
    },
    skills: {
      title: "Tech Stack",
      listAll: "全部技能"
    },
    cloud: {
      kicker: "Deployment Picks",
      title: "Cloud & Hosting",
      description: "我在部署与托管产品时常用的平台。"
    },
    creator: {
      mode: "创作者模式",
      subtitle: "来自我技术向 TikTok 频道的开发日常片段。",
      title: "科技内容创作者",
      description:
        "欢迎在 TikTok 关注我的编程与开发生活 💻🎥<br class=\"d-md-none\" />" +
        "我会分享代码技巧、构建日志，以及泰语与英语社区内容。",
      cards: {
        teamwork: {
          title: "团队协作与 Git",
          description: "首次团队项目通过 Git 交付。过程不完美，但收获了扎实经验。"
        },
        framework: {
          title: "框架实践",
          description: "在真实项目中比较 Tailwind 与 Bootstrap，选择更合适的方案。"
        },
        ui: {
          title: "UI 组件",
          description: "分享如何为 Bootstrap 卡片组件加入动效与细节打磨。"
        }
      },
      experimentsTitle: "实践与经历"
    },
    automation: {
      title: "工作流自动化",
      description: "通过自动化连接各类服务，减少重复工作，让数字化工作流更顺畅。",
      makecom: {
        title: "Make.com",
        tags: {
          automation: "自动化",
          integration: "集成",
          notifications: "通知"
        },
        description: "围绕 API、通知与业务流程构建互联工作流，重点关注简洁性与可靠性。"
      },
      playwright: {
        title: "Playwright",
        description: "Web 应用端到端测试框架。可在多浏览器环境中编写稳定可靠的自动化测试。"
      },
      cicd: {
        title: "CI/CD",
        description: "持续集成与持续部署流水线。自动化 build、test、deploy 流程，加速并稳定发布。"
      }
    },
    visual: {
      title: "视觉精选",
      description: "精选代表项目，融合优雅设计、实用功能与流畅的用户体验。"
    },
    modal: {
      technologies: "技术栈",
      viewGithub: "在 GitHub 查看",
      liveDemo: "在线演示"
    },
    portfolioList: {
      portfolio: "作品集",
      project: "项目",
      moreProjects: "查看更多项目"
    },
    experience: {
      title: "经验与实习",
      description: "从实习到全职开发者的成长路径，在每一次真实项目中持续进步。",
      hint: "点击卡片查看详情"
    },
    extracurricular: {
      title: "课外活动与社区"
    },
    certificates: {
      title: "成果与证书",
      description: "汇总我在真实项目与持续学习中获得的证书与技能。",
      viewMore: "在 LinkedIn 查看更多"
    },
    contact: {
      title: "联系我",
      description: "如果你准备合作，欢迎通过邮件或社交平台与我联系。",
      emailLabel: "邮箱",
      locationLabel: "所在地",
      availableLabel: "可用状态",
      availableValue: "开放自由职业与全职机会",
      socialLabel: "社交平台",
      ctaTitle: "一起做点有意思的项目",
      ctaDescription: "欢迎分享你的想法、时间线和目标，我会尽快回复你。",
      sendEmail: "发送邮件",
      openLinkedIn: "打开 LinkedIn"
    },
    footer: {
      brandCopy: "全栈开发者，专注于打造精致界面与可靠系统，覆盖 Web、云端与移动端。",
      portfolioHeading: "作品集",
      portfolioVisual: "视觉精选",
      portfolioProfile: "个人简介",
      portfolioCertificates: "证书",
      experienceHeading: "经验",
      experienceWorkHistory: "工作经历",
      experienceInternships: "实习经历",
      experienceAwards: "奖项",
      resourcesHeading: "资源",
      contactHeading: "联系",
      contactEmail: "邮箱",
      contactLabel: "联系",
      copyright: "© 2025 Nattapat Phungphugdee. 保留所有权利。",
      backToTop: "回到顶部",
      hireMe: "合作咨询"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      profile: "Profil",
      portfolio: "Portfolio",
      experience: "Erfahrung",
      certificates: "Zertifikate",
      blog: "Blog",
      language: "Sprache",
      contact: "Kontakt"
    },
    hero: {
      hi: "Hallo, ich bin",
      developer: "Ein Softwareentwickler",
      location: "mit Standort in",
      thailand: "Thailand",
      education: "B.Sc. in Informatik und Informationswissenschaft — Fakultät für Angewandte Wissenschaften"
    },
    profile: {
      title: "PROFIL",
      airdrop: "AirDrop",
      myProfile: "MEIN PROFIL",
      decline: "Ablehnen",
      accept: "Annehmen"
    },
    about: {
      title: "Über mich",
      letsWork: "Lass uns zusammenarbeiten",
      resume: "Lebenslauf",
      description:
        "Mein Name ist Nattapat Phungphugdee.<br/>" +
        "Ich arbeite derzeit Vollzeit als <strong>Full-Stack-Entwickler mit Fokus auf Frontend</strong> an realen Webanwendungen.<br/><br/>" +
        "Mein Hauptfokus liegt auf <strong>Frontend-Entwicklung</strong>. Ich baue saubere, zuverlässige Benutzeroberflächen mit Blick auf Usability, Konsistenz und langfristige Wartbarkeit. Ich bevorzuge einfache und klare Lösungen, die in der Produktion stabil funktionieren, statt unnötig komplexer Designs.<br/><br/>" +
        "Im Backend arbeite ich auf solidem Mittelstufenniveau. Ich integriere regelmäßig APIs, verarbeite Datenflüsse und verstehe Systemlogik gut genug, um Frontend-Features sinnvoll in das Gesamtsystem einzubetten.<br/><br/>" +
        "In meiner täglichen Arbeit lege ich Wert auf gut lesbaren Code, pragmatische Designentscheidungen und Teamarbeit. Ich bin es gewohnt, in realen Entwicklungsumgebungen zu arbeiten: mit anderen zu kollaborieren, Feedback umzusetzen und bestehende Systeme kontinuierlich zu verbessern.<br/><br/>" +
        "Ich bin offen für Rollen als <strong>Frontend Developer</strong> oder <strong>Full Stack Developer</strong>, in denen ich produktionsreife Frontend-Lösungen liefern und mich gleichzeitig in Backend-Engineering und Systemdesign weiterentwickeln kann."
    },
    education: {
      title: "Ausbildung",
      kmutnb: {
        year: "2021 - Heute",
        achievements: "Erfolge",
        scienceDay: "Science Exhibition Day 2025",
        goldAward: "🥇 Gold-Auszeichnung - Asset-Management-System für das zentrale ECT-Büro",
        coursework: "Relevante Kurse",
        web: "Webentwicklung",
        software: "Software Engineering",
        python: "Python-Programmierung",
        dataStructure: "Datenstrukturen"
      },
      sarasas: {
        year: "2009 - 2015 (Grundschule)"
      }
    },
    skills: {
      title: "Tech Stack",
      listAll: "Alle Skills"
    },
    cloud: {
      kicker: "Deployment Picks",
      title: "Cloud & Hosting",
      description: "Plattformen, die ich gerne zum Deployen und Hosten von Projekten nutze."
    },
    creator: {
      mode: "Creator-Modus",
      subtitle: "Kurze Einblicke aus meinem Dev-Life TikTok-Kanal.",
      title: "Tech-Content-Creator",
      description:
        "Folge meinem Coding- und Dev-Lifestyle auf TikTok 💻🎥<br class=\"d-md-none\" />" +
        "Ich teile Code-Tipps, Build-Logs und Community-Stories auf Thai und Englisch.",
      cards: {
        teamwork: {
          title: "Teamwork & Git",
          description: "Erstes Teamprojekt mit Git ausgeliefert – chaotischer Prozess, aber starke Lernerfahrung."
        },
        framework: {
          title: "Framework-Experimente",
          description: "Vergleich von Tailwind und Bootstrap in realen Projekten, um die beste Wahl zu treffen."
        },
        ui: {
          title: "UI-Komponenten",
          description: "Ich zeige, wie ich Bootstrap-Karten mit Motion und Feinschliff aufwerte."
        }
      },
      experimentsTitle: "Experimente & Praxis"
    },
    automation: {
      title: "Workflow-Automatisierung",
      description: "Automatisierung nutzen, um Services zu verbinden, repetitive Arbeit zu reduzieren und digitale Workflows reibungsloser zu gestalten.",
      makecom: {
        title: "Make.com",
        tags: {
          automation: "Automatisierung",
          integration: "Integration",
          notifications: "Benachrichtigungen"
        },
        description: "Verbundene Workflows über APIs, Benachrichtigungen und Geschäftsprozesse hinweg aufbauen, mit Fokus auf Einfachheit und Zuverlässigkeit."
      },
      playwright: {
        title: "Playwright",
        description: "End-to-End-Testframework für Webanwendungen. Zuverlässige Tests über mehrere Browser mit moderner Automatisierung."
      },
      cicd: {
        title: "CI/CD",
        description: "Pipelines für Continuous Integration und Deployment. Build-, Test- und Deploy-Prozesse werden automatisiert – schneller und zuverlässiger."
      }
    },
    visual: {
      title: "Projekte",
      description: "Eine kuratierte Auswahl meiner wichtigsten Projekte – mit elegantem Design, smarten Funktionen und nahtloser User Experience."
    },
    modal: {
      technologies: "Technologien",
      viewGithub: "Auf GitHub ansehen",
      liveDemo: "Live-Demo"
    },
    portfolioList: {
      portfolio: "Portfolio",
      project: "PROJEKTE",
      moreProjects: "Weitere Projekte"
    },
    experience: {
      title: "ERFAHRUNG & PRAKTIKUM",
      description: "Mein beruflicher Weg vom Praktikum bis zur Vollzeit-Entwicklung, mit Wachstum durch reale Projekte.",
      hint: "Klicke auf ein Widget, um Details zu sehen"
    },
    extracurricular: {
      title: "AUSSERSCHULISCHE AKTIVITÄTEN & COMMUNITY"
    },
    certificates: {
      title: "Meine Erfolge ansehen",
      description: "Eine Sammlung von Zertifikaten und Skills, die ich durch reale Projekte und kontinuierliches Lernen erworben habe.",
      viewMore: "Mehr auf LinkedIn ansehen"
    },
    contact: {
      title: "Kontakt aufnehmen",
      description: "Bereit zur Zusammenarbeit? Schreib mir per E-Mail oder verbinde dich über Social Media.",
      emailLabel: "E-Mail",
      locationLabel: "Standort",
      availableLabel: "Verfügbarkeit",
      availableValue: "Offen für Freelance- und Vollzeit-Möglichkeiten",
      socialLabel: "Social",
      ctaTitle: "Lass uns gemeinsam etwas bauen",
      ctaDescription: "Teile deine Idee, deinen Zeitplan und deine Ziele mit mir. Ich melde mich schnellstmöglich zurück.",
      sendEmail: "E-Mail senden",
      openLinkedIn: "LinkedIn öffnen"
    },
    footer: {
      brandCopy: "Full-Stack-Entwickler, der schöne Interfaces und zuverlässige Systeme für Web, Cloud und Mobile entwickelt.",
      portfolioHeading: "Portfolio",
      portfolioVisual: "Visuelle Highlights",
      portfolioProfile: "Profil",
      portfolioCertificates: "Zertifikate",
      experienceHeading: "Erfahrung",
      experienceWorkHistory: "Berufserfahrung",
      experienceInternships: "Praktika",
      experienceAwards: "Auszeichnungen",
      resourcesHeading: "Ressourcen",
      contactHeading: "Kontakt",
      contactEmail: "E-Mail",
      contactLabel: "Kontakt",
      copyright: "© 2025 Nattapat Phungphugdee. Alle Rechte vorbehalten.",
      backToTop: "Nach oben",
      hireMe: "Mit mir arbeiten"
    }
  },
  ko: {
    nav: {
      home: "홈",
      profile: "프로필",
      portfolio: "포트폴리오",
      experience: "경력",
      certificates: "자격증",
      blog: "블로그",
      language: "언어",
      contact: "연락처"
    },
    hero: {
      hi: "안녕하세요, 저는",
      developer: "소프트웨어 개발자",
      location: "활동 기반은",
      thailand: "태국",
      education: "컴퓨터 및 정보과학 학사 — 응용과학부"
    },
    profile: {
      title: "프로필",
      airdrop: "AirDrop",
      myProfile: "내 프로필",
      decline: "거절",
      accept: "수락"
    },
    about: {
      title: "소개",
      letsWork: "함께 일해요",
      resume: "이력서",
      description:
        "제 이름은 Nattapat Phungphugdee입니다.<br/>" +
        "현재 실무 웹 애플리케이션을 개발하는 환경에서 <strong>프론트엔드 중심의 풀스택 개발자</strong>로 풀타임 근무 중입니다.<br/><br/>" +
        "제 주요 강점은 <strong>프론트엔드 개발</strong>입니다. 사용성, 일관성, 장기 유지보수성을 고려해 깔끔하고 신뢰할 수 있는 UI를 구현합니다. 과도하게 복잡한 설계보다 실제 서비스에서 안정적으로 동작하는 단순하고 명확한 해법을 선호합니다.<br/><br/>" +
        "백엔드도 중급 수준으로 다룰 수 있습니다. API 연동, 데이터 흐름 처리, 시스템 로직 이해를 바탕으로 프론트엔드 기능이 전체 시스템과 자연스럽게 맞물리도록 설계합니다.<br/><br/>" +
        "일상적인 개발에서는 읽기 쉬운 코드, 실용적인 설계 판단, 팀 협업을 중요하게 생각합니다. 실제 개발 환경에서 협업하고 피드백을 반영하며 기존 시스템을 지속적으로 개선해 온 경험이 있습니다.<br/><br/>" +
        "저는 <strong>프론트엔드 개발자</strong> 또는 <strong>풀스택 개발자</strong> 역할에 열려 있으며, 프로덕션 수준의 프론트엔드 결과물을 꾸준히 제공하면서 백엔드 엔지니어링과 시스템 설계 역량도 더 깊게 확장하고자 합니다."
    },
    education: {
      title: "학력",
      kmutnb: {
        year: "2021 - 현재",
        achievements: "성과",
        scienceDay: "Science Exhibition Day 2025",
        goldAward: "🥇 금상 - ECT 중앙사무소 자산관리 시스템",
        coursework: "주요 과목",
        web: "웹 개발",
        software: "소프트웨어 공학",
        python: "Python 프로그래밍",
        dataStructure: "자료구조"
      },
      sarasas: {
        year: "2009 - 2015 (초등학교)"
      }
    },
    skills: {
      title: "Tech Stack",
      listAll: "전체 스킬"
    },
    cloud: {
      kicker: "Deployment Picks",
      title: "Cloud & Hosting",
      description: "프로덕트를 배포하고 호스팅할 때 자주 사용하는 플랫폼입니다."
    },
    creator: {
      mode: "크리에이터 모드",
      subtitle: "개발 라이프 TikTok 채널의 짧은 스냅샷",
      title: "테크 콘텐츠 크리에이터",
      description:
        "TikTok에서 제 코딩 및 개발 라이프를 팔로우해 보세요 💻🎥<br class=\"d-md-none\" />" +
        "코드 팁, 빌드 로그, 커뮤니티 이야기를 태국어와 영어로 공유합니다.",
      cards: {
        teamwork: {
          title: "팀워크 & Git",
          description: "Git으로 첫 팀 프로젝트를 배포했습니다. 과정은 거칠었지만 확실한 배움을 얻었습니다."
        },
        framework: {
          title: "프레임워크 실험",
          description: "실제 프로젝트에서 Tailwind와 Bootstrap을 비교해 상황에 맞는 선택을 찾고 있습니다."
        },
        ui: {
          title: "UI 컴포넌트",
          description: "Bootstrap 카드 컴포넌트에 모션과 디테일을 더하는 방법을 공유합니다."
        }
      },
      experimentsTitle: "실험 및 경험"
    },
    automation: {
      title: "워크플로 자동화",
      description: "자동화를 활용해 서비스를 연결하고 반복 업무를 줄여 더 매끄러운 디지털 워크플로를 만듭니다.",
      makecom: {
        title: "Make.com",
        tags: {
          automation: "자동화",
          integration: "통합",
          notifications: "알림"
        },
        description: "API, 알림, 비즈니스 프로세스를 연결하는 워크플로를 단순함과 안정성에 초점을 맞춰 구축합니다."
      },
      playwright: {
        title: "Playwright",
        description: "웹 애플리케이션용 E2E 테스트 프레임워크입니다. 여러 브라우저에서 신뢰도 높은 자동화 테스트를 구현합니다."
      },
      cicd: {
        title: "CI/CD",
        description: "지속적 통합 및 배포 파이프라인으로 build, test, deploy를 자동화해 더 빠르고 안정적인 릴리스를 만듭니다."
      }
    },
    visual: {
      title: "비주얼 하이라이트",
      description: "대표 프로젝트를 엄선해 소개합니다. 세련된 디자인, 실용적인 기능, 매끄러운 사용자 경험을 함께 담았습니다."
    },
    modal: {
      technologies: "기술 스택",
      viewGithub: "GitHub에서 보기",
      liveDemo: "라이브 데모"
    },
    portfolioList: {
      portfolio: "포트폴리오",
      project: "프로젝트",
      moreProjects: "프로젝트 더 보기"
    },
    experience: {
      title: "경력 및 인턴십",
      description: "인턴에서 풀타임 개발자로 성장해 온 과정과 실제 프로젝트를 통한 발전 기록입니다.",
      hint: "위젯을 눌러 상세 정보를 확인하세요"
    },
    extracurricular: {
      title: "비교과 활동 및 커뮤니티"
    },
    certificates: {
      title: "성과 둘러보기",
      description: "실제 프로젝트와 지속적인 학습을 통해 얻은 자격증과 기술을 모았습니다.",
      viewMore: "LinkedIn에서 더 보기"
    },
    contact: {
      title: "연락하기",
      description: "협업을 원하시나요? 이메일 또는 소셜 채널로 편하게 연락주세요.",
      emailLabel: "이메일",
      locationLabel: "위치",
      availableLabel: "가능 여부",
      availableValue: "프리랜서 및 정규직 기회를 열어두고 있습니다",
      socialLabel: "소셜",
      ctaTitle: "함께 멋진 것을 만들어봐요",
      ctaDescription: "아이디어, 일정, 목표를 공유해 주세요. 최대한 빠르게 답변드리겠습니다.",
      sendEmail: "이메일 보내기",
      openLinkedIn: "LinkedIn 열기"
    },
    footer: {
      brandCopy: "웹, 클라우드, 모바일 전반에서 아름다운 인터페이스와 신뢰할 수 있는 시스템을 만드는 풀스택 개발자입니다.",
      portfolioHeading: "포트폴리오",
      portfolioVisual: "비주얼 하이라이트",
      portfolioProfile: "프로필",
      portfolioCertificates: "자격증",
      experienceHeading: "경력",
      experienceWorkHistory: "업무 이력",
      experienceInternships: "인턴십",
      experienceAwards: "수상",
      resourcesHeading: "리소스",
      contactHeading: "연락처",
      contactEmail: "이메일",
      contactLabel: "연락처",
      copyright: "© 2025 Nattapat Phungphugdee. 모든 권리 보유.",
      backToTop: "맨 위로",
      hireMe: "협업 문의"
    }
  }
};

const languageOrder = ['en', 'th', 'ja', 'zh', 'de', 'ko'];
const languageAliases = {
  jp: 'ja',
  cn: 'zh',
  'zh-cn': 'zh',
  'zh_cn': 'zh',
  'zh-hans': 'zh',
  'de-de': 'de',
  'de_de': 'de',
  ger: 'de',
  kr: 'ko',
  'ko-kr': 'ko',
  'ko_kr': 'ko',
  kor: 'ko'
};

const seoLanguagePages = {
  en: 'index.html',
  th: 'th.html',
  ja: 'ja.html',
  zh: 'zh.html',
  ko: 'ko.html'
};

function getCurrentPageName(pathname) {
  const rawPath = (pathname || window.location.pathname || '').toLowerCase();
  const cleanPath = rawPath.split('?')[0].split('#')[0];
  if (!cleanPath || cleanPath === '/' || cleanPath.endsWith('/')) {
    return 'index.html';
  }

  const segments = cleanPath.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';
  if (!lastSegment || !lastSegment.includes('.')) {
    return 'index.html';
  }

  return lastSegment;
}

function getLanguageFromCurrentPage() {
  const htmlLang = (document.documentElement.getAttribute('data-i18n-lang') || '').toLowerCase();
  const mappedHtmlLang = languageAliases[htmlLang] || htmlLang;
  if (translations[mappedHtmlLang]) {
    return mappedHtmlLang;
  }

  const currentPage = getCurrentPageName();
  for (const [lang, pageName] of Object.entries(seoLanguagePages)) {
    if (currentPage === pageName) {
      return lang;
    }
  }

  return '';
}

function getSeoPagePath(lang) {
  return seoLanguagePages[lang] || '';
}

function shouldNavigateToLanguagePage(lang) {
  const targetPage = getSeoPagePath(lang);
  if (!targetPage) {
    return false;
  }

  const currentPage = getCurrentPageName();
  return currentPage !== targetPage;
}

function getSeoPageUrl(lang) {
  const targetPage = getSeoPagePath(lang);
  if (!targetPage) {
    return '';
  }

  // Get root path (up one level if in a subdirectory)
  const isSubdirectory = window.location.pathname.includes('/projects/') || window.location.pathname.includes('/articles/');
  const rootPrefix = isSubdirectory ? '../' : '';
  
  return rootPrefix + targetPage;
}

const storedLangRaw = (localStorage.getItem('language') || 'en').toLowerCase();
const storedLang = languageAliases[storedLangRaw] || storedLangRaw;
const pageLang = getLanguageFromCurrentPage();

let currentLang = pageLang || storedLang || 'en';
if (!translations[currentLang]) {
  currentLang = 'en';
}

function resolveTranslation(lang, key) {
  const keys = key.split('.');
  let value = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && value[k] !== undefined) {
      value = value[k];
    } else {
      return undefined;
    }
  }

  return value;
}

function translate(key) {
  return resolveTranslation(currentLang, key) || resolveTranslation('en', key) || key;
}

function syncLanguageSelectors() {
  const desktopSelector = document.getElementById('langSelect');
  if (desktopSelector && desktopSelector.value !== currentLang) {
    desktopSelector.value = currentLang;
  }

  const mobileSelector = document.getElementById('mobileLangSelect');
  if (mobileSelector && mobileSelector.value !== currentLang) {
    mobileSelector.value = currentLang;
  }
}

function updateLanguage() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translate(key);
  });

  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const key = element.getAttribute('data-i18n-html');
    element.innerHTML = translate(key);
  });

  syncLanguageSelectors();

  localStorage.setItem('language', currentLang);
  window.dispatchEvent(new CustomEvent('i18n:updated', { detail: { lang: currentLang } }));
}

function setLanguage(lang) {
  lang = (lang || '').toLowerCase();
  lang = languageAliases[lang] || lang;

  if (!translations[lang]) {
    return;
  }

  localStorage.setItem('language', lang);

  if (shouldNavigateToLanguagePage(lang)) {
    window.location.href = getSeoPageUrl(lang);
    return;
  }

  currentLang = lang;
  updateLanguage();
}

function bindLanguageSelectors() {
  const desktopSelector = document.getElementById('langSelect');
  if (desktopSelector && !desktopSelector.dataset.i18nBound) {
    desktopSelector.addEventListener('change', function () {
      setLanguage(desktopSelector.value);
    });
    desktopSelector.dataset.i18nBound = 'true';
  }

  const mobileSelector = document.getElementById('mobileLangSelect');
  if (mobileSelector && !mobileSelector.dataset.i18nBound) {
    mobileSelector.addEventListener('change', function () {
      setLanguage(mobileSelector.value);
      if (typeof window.closeMobileMenu === 'function') {
        window.closeMobileMenu();
      }
    });
    mobileSelector.dataset.i18nBound = 'true';
  }
}

function toggleLanguage() {
  const currentIndex = languageOrder.indexOf(currentLang);
  const nextIndex = (currentIndex + 1) % languageOrder.length;
  setLanguage(languageOrder[nextIndex]);
}

window.toggleLanguage = toggleLanguage;
window.setLanguage = setLanguage;

document.addEventListener('DOMContentLoaded', function () {
  bindLanguageSelectors();
  updateLanguage();
});
