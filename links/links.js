// Shares the main portfolio's saved language without navigating away from /links/.
(() => {
  const translations = {
  "en": {
    "language": "Language",
    "role": "SOFTWARE DEVELOPER · THAILAND",
    "heading": "@nattazxin",
    "intro": "My contacts, work, and stories.",
    "introMore": "Get to know me through the links below.",
    "work": "Let's work together",
    "portfolio": "My Portfolio",
    "portfolioNote": "Get to know me and explore my work",
    "blog": "Blog",
    "blogNote": "Thoughts, notes, and things I learn",
    "elsewhere": "ELSEWHERE ON THE INTERNET",
    "thanks": "Thanks for stopping by",
    "social0": "Code & open source",
    "social1": "Experience & connections",
    "social2": "Connect with me",
    "social3": "A little of everyday life",
    "social4": "Stories & things I learn",
    "social5": "Short videos",
    "social6": "Videos & more"
  },
  "th": {
    "language": "ภาษา",
    "role": "นักพัฒนาซอฟต์แวร์ · ประเทศไทย",
    "heading": "@nattazxin",
    "intro": "ช่องทางติดต่อ ผลงาน และเรื่องราวของผม",
    "introMore": "เลือกทำความรู้จักกันได้จากลิงก์ด้านล่าง",
    "work": "มาร่วมงานกัน",
    "portfolio": "ผลงานของผม",
    "portfolioNote": "รู้จักผมและดูผลงานทั้งหมด",
    "blog": "บทความ",
    "blogNote": "บันทึกความคิดและแบ่งปันความรู้",
    "elsewhere": "พบกันได้ในช่องทางอื่น",
    "thanks": "ขอบคุณที่แวะมาครับ",
    "social0": "โค้ดและโอเพนซอร์ส",
    "social1": "ประสบการณ์และเครือข่ายการทำงาน",
    "social2": "มาพูดคุยกัน",
    "social3": "เรื่องราวในชีวิตประจำวัน",
    "social4": "เรื่องเล่าและสิ่งที่ได้เรียนรู้",
    "social5": "วิดีโอสั้น",
    "social6": "วิดีโอและเรื่องราวอื่น ๆ"
  },
  "ja": {
    "language": "言語",
    "role": "ソフトウェア開発者 · タイ",
    "heading": "@nattazxin",
    "intro": "連絡先、作品、日々のストーリー。",
    "introMore": "下のリンクから、私についてご覧ください。",
    "work": "一緒に仕事をしましょう",
    "portfolio": "ポートフォリオ",
    "portfolioNote": "自己紹介とこれまでの作品",
    "blog": "ブログ",
    "blogNote": "考えたことや学んだことを共有",
    "elsewhere": "その他のソーシャルリンク",
    "thanks": "ご覧いただきありがとうございます",
    "social0": "コードとオープンソース",
    "social1": "経歴とつながり",
    "social2": "気軽につながりましょう",
    "social3": "日々の暮らし",
    "social4": "ストーリーと学び",
    "social5": "ショート動画",
    "social6": "動画など"
  },
  "zh": {
    "language": "语言",
    "role": "软件开发者 · 泰国",
    "heading": "@nattazxin",
    "intro": "我的联系方式、作品与生活故事。",
    "introMore": "通过以下链接了解我。",
    "work": "一起合作吧",
    "portfolio": "我的作品集",
    "portfolioNote": "了解我并查看全部作品",
    "blog": "博客",
    "blogNote": "记录想法，分享知识",
    "elsewhere": "其他社交平台",
    "thanks": "感谢你的来访",
    "social0": "代码与开源项目",
    "social1": "工作经历与职业交流",
    "social2": "与我联系",
    "social3": "日常生活片段",
    "social4": "故事与学习心得",
    "social5": "短视频",
    "social6": "视频与更多内容"
  },
  "de": {
    "language": "Sprache",
    "role": "SOFTWAREENTWICKLER · THAILAND",
    "heading": "@nattazxin",
    "intro": "Kontakt, Projekte und Geschichten.",
    "introMore": "Lerne mich über die Links unten kennen.",
    "work": "Zusammenarbeiten",
    "portfolio": "Mein Portfolio",
    "portfolioNote": "Über mich und meine Projekte",
    "blog": "Blog",
    "blogNote": "Gedanken und neue Erkenntnisse",
    "elsewhere": "AUCH HIER ZU FINDEN",
    "thanks": "Danke für deinen Besuch",
    "social0": "Code & Open Source",
    "social1": "Erfahrung & Kontakte",
    "social2": "Bleiben wir in Kontakt",
    "social3": "Einblicke in meinen Alltag",
    "social4": "Geschichten und Erkenntnisse",
    "social5": "Kurzvideos",
    "social6": "Videos & mehr"
  },
  "ko": {
    "language": "언어",
    "role": "소프트웨어 개발자 · 태국",
    "heading": "@nattazxin",
    "intro": "연락처, 작업물, 그리고 저의 이야기.",
    "introMore": "아래 링크에서 저를 만나보세요.",
    "work": "함께 일해요",
    "portfolio": "포트폴리오",
    "portfolioNote": "소개와 작업물 둘러보기",
    "blog": "블로그",
    "blogNote": "생각과 배운 내용을 나눕니다",
    "elsewhere": "다른 채널에서 만나요",
    "thanks": "방문해 주셔서 감사합니다",
    "social0": "코드와 오픈 소스",
    "social1": "경력과 네트워크",
    "social2": "저와 소통해요",
    "social3": "소소한 일상",
    "social4": "이야기와 배운 것들",
    "social5": "짧은 영상",
    "social6": "영상과 더 많은 이야기"
  }
};
  const selector = document.getElementById('links-language');
  const aliases = { jp: 'ja', cn: 'zh', kr: 'ko' };
  function applyLanguage(value) {
    const lang = translations[value] ? value : 'en';
    document.documentElement.lang = lang;
    selector.value = lang;
    document.querySelectorAll('[data-link-i18n]').forEach(element => {
      const text = translations[lang][element.dataset.linkI18n];
      if (text) element.textContent = text;
    });
    document.querySelector('nav.links-nav').setAttribute('aria-label', translations[lang].intro);
    document.querySelector('nav.social-icons').setAttribute('aria-label', translations[lang].elsewhere);
    selector.setAttribute('aria-label', translations[lang].language);
    const home = { en: '/', th: '/th.html', ja: '/ja.html', zh: '/zh.html', de: '/de.html', ko: '/ko.html' }[lang];
    document.querySelectorAll('a[href="/"], a[data-home-link]').forEach(link => {
      link.dataset.homeLink = 'true';
      link.href = home;
    });
    try { localStorage.setItem('language', lang); } catch (_) { /* Language switching still works without storage. */ }
  }
  let saved = 'th';
  try { saved = localStorage.getItem('language') || saved; } catch (_) { /* Use the page default. */ }
  saved = saved.toLowerCase();
  applyLanguage(aliases[saved] || saved);
  selector.addEventListener('change', () => applyLanguage(selector.value));
})();
