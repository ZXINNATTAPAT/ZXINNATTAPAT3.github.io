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
    "social6": "Videos & more",
    "clipsLabel": "SHORT CLIPS",
    "clipCsTitle": "CS student life",
    "clipCsNote": "Year 1 to year 3",
    "clipGitTitle": "Teamwork & Git",
    "clipGitNote": "First project with friends",
    "clipTwTitle": "Tailwind vs Bootstrap",
    "clipTwNote": "First time trying Tailwind",
    "clipArticle": "Read the article",
    "clipPlay": "Play clip",
    "clipPause": "Pause clip",
    "clipPrev": "Previous clip",
    "clipNext": "Next clip"
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
    "social6": "วิดีโอและเรื่องราวอื่น ๆ",
    "clipsLabel": "คลิปสั้น",
    "clipCsTitle": "ชีวิตวิทย์คอม มจพ",
    "clipCsNote": "ปี 1 ถึงปี 3",
    "clipGitTitle": "ทีมเวิร์กกับ Git",
    "clipGitNote": "โปรเจกต์แรกกับเพื่อน",
    "clipTwTitle": "Tailwind กับ Bootstrap",
    "clipTwNote": "ลอง Tailwind ครั้งแรก",
    "clipArticle": "อ่านบทความ",
    "clipPlay": "เล่นคลิป",
    "clipPause": "หยุดคลิป",
    "clipPrev": "คลิปก่อนหน้า",
    "clipNext": "คลิปถัดไป"
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
    "social6": "動画など",
    "clipsLabel": "ショートクリップ",
    "clipCsTitle": "CS学生生活",
    "clipCsNote": "1年生から3年生まで",
    "clipGitTitle": "チームと Git",
    "clipGitNote": "友達との初めての課題",
    "clipTwTitle": "Tailwind と Bootstrap",
    "clipTwNote": "Tailwind を初めて試した話",
    "clipArticle": "記事を読む",
    "clipPlay": "クリップを再生",
    "clipPause": "一時停止",
    "clipPrev": "前のクリップ",
    "clipNext": "次のクリップ"
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
    "social6": "视频与更多内容",
    "clipsLabel": "短片",
    "clipCsTitle": "计算机学生活",
    "clipCsNote": "大一到大三",
    "clipGitTitle": "团队合作与 Git",
    "clipGitNote": "和朋友的第一个项目",
    "clipTwTitle": "Tailwind 与 Bootstrap",
    "clipTwNote": "第一次尝试 Tailwind",
    "clipArticle": "阅读文章",
    "clipPlay": "播放短片",
    "clipPause": "暂停",
    "clipPrev": "上一段",
    "clipNext": "下一段"
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
    "social6": "Videos & mehr",
    "clipsLabel": "KURZE CLIPS",
    "clipCsTitle": "CS-Studentenleben",
    "clipCsNote": "Jahr 1 bis Jahr 3",
    "clipGitTitle": "Teamarbeit & Git",
    "clipGitNote": "Erstes Projekt mit Freunden",
    "clipTwTitle": "Tailwind vs Bootstrap",
    "clipTwNote": "Tailwind zum ersten Mal",
    "clipArticle": "Artikel lesen",
    "clipPlay": "Clip abspielen",
    "clipPause": "Pause",
    "clipPrev": "Vorheriger Clip",
    "clipNext": "Nächster Clip"
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
    "social6": "영상과 더 많은 이야기",
    "clipsLabel": "짧은 클립",
    "clipCsTitle": "컴퓨터 학과 생활",
    "clipCsNote": "1학년부터 3학년까지",
    "clipGitTitle": "팀워크와 Git",
    "clipGitNote": "친구들과의 첫 프로젝트",
    "clipTwTitle": "Tailwind와 Bootstrap",
    "clipTwNote": "Tailwind를 처음 써 본 이야기",
    "clipArticle": "글 읽기",
    "clipPlay": "클립 재생",
    "clipPause": "일시정지",
    "clipPrev": "이전 클립",
    "clipNext": "다음 클립"
  }
};
  const selector = document.getElementById('links-language');
  const fonts = { ja: 'Noto Sans JP', zh: 'Noto Sans SC', ko: 'Noto Sans KR' };
  const aliases = { jp: 'ja', cn: 'zh', kr: 'ko' };
  function applyLanguage(value) {
    const lang = translations[value] ? value : 'en';
    document.documentElement.lang = lang;
    selector.value = lang;
    document.querySelectorAll('[data-link-i18n]').forEach(element => {
      element.textContent = translations[lang][element.dataset.linkI18n];
    });
    document.querySelectorAll('[data-link-i18n-aria]').forEach(element => {
      if (element.classList.contains('clip-play')) return;
      const label = translations[lang][element.dataset.linkI18nAria];
      if (label) element.setAttribute('aria-label', label);
    });
    document.querySelectorAll('.clip').forEach(syncClipLabel);
    document.querySelector('nav.links-nav').setAttribute('aria-label', translations[lang].intro);
    document.querySelector('nav.social-icons').setAttribute('aria-label', translations[lang].elsewhere);
    selector.setAttribute('aria-label', translations[lang].language);
    const home = { en: '/', th: '/th.html', ja: '/ja.html', zh: '/zh.html', de: '/de.html', ko: '/ko.html' }[lang];
    document.querySelectorAll('a[href="/"], a[data-home-link]').forEach(link => {
      link.dataset.homeLink = 'true';
      link.href = home;
    });
    if (fonts[lang] && !document.getElementById('font-' + lang)) {
      const stylesheet = document.createElement('link');
      stylesheet.id = 'font-' + lang;
      stylesheet.rel = 'stylesheet';
      stylesheet.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(fonts[lang]) + ':wght@400;500;600;700&display=swap';
      document.head.appendChild(stylesheet);
    }
    try { localStorage.setItem('language', lang); } catch (_) { /* Language switching still works without storage. */ }
  }
  let saved = 'th';
  try { saved = localStorage.getItem('language') || saved; } catch (_) { /* Use the page default. */ }
  saved = saved.toLowerCase();
  function syncClipLabel(clip) {
    const button = clip.querySelector('.clip-play');
    if (!button) return;
    const lang = translations[selector.value] ? selector.value : 'en';
    const key = clip.classList.contains('is-playing') ? 'clipPause' : 'clipPlay';
    button.setAttribute('aria-label', translations[lang][key]);
  }

  function stopClip(clip) {
    const video = clip.querySelector('video');
    if (!video) return;
    video.pause();
    video.controls = false;
    clip.classList.remove('is-playing');
    syncClipLabel(clip);
  }

  const track = document.querySelector('.clip-track');
  const clips = [...document.querySelectorAll('.clip')];
  const dots = [...document.querySelectorAll('.clip-dot')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clipIndex() {
    const left = track.scrollLeft;
    let closest = 0;
    let best = Infinity;
    clips.forEach((clip, i) => {
      const distance = Math.abs(clip.offsetLeft - left);
      if (distance < best) {
        best = distance;
        closest = i;
      }
    });
    return closest;
  }

  function goToClip(index) {
    const nextIndex = Math.max(0, Math.min(clips.length - 1, index));
    track.scrollTo({ left: clips[nextIndex].offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function syncSlider() {
    const index = clipIndex();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    clips.forEach((clip, i) => {
      if (i !== index) stopClip(clip);
    });
  }

  clips.forEach(clip => {
    const video = clip.querySelector('video');
    const button = clip.querySelector('.clip-play');
    if (!video || !button) return;

    button.addEventListener('click', async () => {
      clips.forEach(other => {
        if (other !== clip) stopClip(other);
      });
      video.controls = true;
      video.muted = false;
      clip.classList.add('is-playing');
      syncClipLabel(clip);
      try {
        await video.play();
      } catch (_) {
        video.muted = true;
        await video.play().catch(() => {});
      }
    });

    video.addEventListener('ended', () => stopClip(clip));
  });

  dots.forEach((dot, index) => dot.addEventListener('click', () => goToClip(index)));
  if (track) {
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); goToClip(clipIndex() + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); goToClip(clipIndex() - 1); }
    });
    let scrollTimer = 0;
    const onSlide = () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(syncSlider, 80);
    };
    track.addEventListener('scroll', onSlide, { passive: true });
    track.addEventListener('scrollend', syncSlider);
    syncSlider();
  }

  applyLanguage(aliases[saved] || saved);
  selector.addEventListener('change', () => applyLanguage(selector.value));
})();
