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
      developer: "a Developer Based in",
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
      title: "My Skills"
    },
    creator: {
      mode: "Creator mode",
      subtitle: "Quick snapshots from my dev-life TikTok channel.",
      title: "Tech Content Creator",
      description:
        "Follow my coding & dev lifestyle on TikTok 💻🎥<br class=\"d-md-none\" />" +
        "I drop code tips, build logs, and community stories in Thai & English.",
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
      }
    },
    automation: {
      title: "Automation & Integration",
      description: "Streamlining workflows and connecting systems with automation tools and integration platforms.",
      makecom: {
        title: "Make.com",
        description: "Workflow automation and integration platform. Building complex scenarios to connect apps, automate processes, and streamline business operations."
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
      title: "Visual Highlights",
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
      moreProjects: "MORE PROJECTS"
    },
    experience: {
      title: "EXPERIENCE & INTERNSHIP",
      description: "My professional journey from internship to full-time developer, building real-world solutions and growing with each opportunity."
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
      phoneLabel: "Phone",
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
      developer: "นักพัฒนาที่อยู่ใน",
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
      title: "ทักษะของฉัน"
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
      }
    },
    automation: {
      title: "ระบบอัตโนมัติและการเชื่อมต่อ",
      description: "ปรับปรุงเวิร์กโฟลว์และเชื่อมต่อระบบด้วยเครื่องมืออัตโนมัติและแพลตฟอร์ม integration",
      makecom: {
        title: "Make.com",
        description: "แพลตฟอร์มสำหรับทำ Workflow Automation และ Integration ช่วยเชื่อมแอป ทำงานซ้ำให้อัตโนมัติ และลดขั้นตอนการทำงานธุรกิจ"
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
      description: "เส้นทางการทำงานของผมตั้งแต่ฝึกงานจนถึงนักพัฒนาเต็มเวลา พร้อมการเติบโตจากงานจริงในแต่ละโอกาส"
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
      phoneLabel: "โทรศัพท์",
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
      backToTop: "กลับขึ้นบน",
      hireMe: "ร่วมงานกับผม"
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
      developer: "タイを拠点に活動する",
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
      title: "スキル"
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
      }
    },
    automation: {
      title: "自動化と連携",
      description: "自動化ツールと連携プラットフォームで、ワークフローの効率化とシステム接続を実現します。",
      makecom: {
        title: "Make.com",
        description: "ワークフロー自動化と連携のプラットフォーム。アプリ連携、業務自動化、運用効率化のための複雑なシナリオを構築します。"
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
      description: "インターンからフルタイム開発者まで、実務を通じて成長してきたプロフェッショナルの歩みです。"
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
      phoneLabel: "電話",
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
  }
};

const languageOrder = ['en', 'th', 'ja'];

let currentLang = localStorage.getItem('language') || 'en';
if (currentLang === 'jp') {
  currentLang = 'ja';
}
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
}

function setLanguage(lang) {
  if (!translations[lang]) {
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
