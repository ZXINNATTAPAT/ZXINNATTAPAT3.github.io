// Internationalization (i18n) for Portfolio Website
const translations = {
  en: {
    nav: {
      contact: "CONTACT"
    },
    hero: {
      hi: "Hi, I'm",
      developer: "a Developer Based in",
      thailand: "Thailand",
      education: "B.Sc. in Computer and Information Science — Faculty of Applied Science"
    },
    sections: {
      profile: "PROFILE",
      portfolio: "PORTFOLIO",
      experience: "EXPERIENCE",
      certificate: "CERTIFICATE",
      contact: "CONTACT"
    },
    about: {
      title: "About Me",
      description: "Hi there! I'm Nattapat Phungphugdee — a Full Stack Developer in the making. Currently a 4th-year Computer Science student at King Mongkut's University of Technology North Bangkok. I'm seeking an internship or junior-level opportunity to deepen my skills in full stack development, backend engineering, or software architecture. I'm passionate about clean code, practical design, and building meaningful digital experiences.",
      languages: {
        title: "Languages",
        thai: "Native",
        english: "Good",
        german: "Newbie"
      }
    },
    skills: {
      title: "My Skills"
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
    portfolio: {
      title: "Visual Highlights",
      description: "A curated selection of my featured projects. Each work blends elegant design, smart functionality, and seamless user experiences."
    },
    contact: {
      title: "Get in Touch",
      description: "Have a project in mind or want to collaborate? Let's connect and bring your ideas to life.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Thank you! Your message has been sent successfully.",
      backToTop: "Back to Top"
    },
    footer: {
      copyright: "© 2025 Nattapat Phungphugdee"
    }
  },
  th: {
    nav: {
      contact: "CONTACT"
    },
    hero: {
      hi: "Hi, I'm",
      developer: "a Developer Based in",
      thailand: "Thailand",
      education: "B.Sc. in Computer and Information Science — Faculty of Applied Science"
    },
    sections: {
      profile: "PROFILE",
      portfolio: "PORTFOLIO",
      experience: "EXPERIENCE",
      certificate: "CERTIFICATE",
      contact: "CONTACT"
    },
    about: {
      title: "About Me",
      description: "สวัสดีครับ! ผมคือ ณัฐภัทร พึ่งภักดี — นักพัฒนา Full Stack ที่กำลังเรียนรู้อยู่ ตอนนี้เป็นนักศึกษาชั้นปีที่ 4 สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ ผมกำลังมองหาฝึกงานหรือตำแหน่งระดับ Junior เพื่อพัฒนาทักษะในด้าน Full Stack Development, Backend Engineering หรือ Software Architecture ผมมีความหลงใหลในโค้ดที่สะอาด การออกแบบที่ใช้งานได้จริง และการสร้างประสบการณ์ดิจิทัลที่มีความหมาย",
      languages: {
        title: "ภาษา",
        thai: "ภาษาแม่",
        english: "ดี",
        german: "เริ่มต้น"
      }
    },
    skills: {
      title: "My Skills"
    },
    automation: {
      title: "Automation & Integration",
      description: "ปรับปรุงกระบวนการทำงานและเชื่อมต่อระบบด้วยเครื่องมืออัตโนมัติและแพลตฟอร์มการเชื่อมต่อ",
      makecom: {
        title: "Make.com",
        description: "แพลตฟอร์มการทำงานอัตโนมัติและการเชื่อมต่อ สร้างสถานการณ์ที่ซับซ้อนเพื่อเชื่อมต่อแอปพลิเคชัน ทำงานอัตโนมัติ และปรับปรุงกระบวนการทางธุรกิจ"
      },
      playwright: {
        title: "Playwright",
        description: "เฟรมเวิร์กทดสอบแบบ End-to-end สำหรับแอปพลิเคชันเว็บ เขียนการทดสอบที่เชื่อถือได้ข้ามหลายเบราว์เซอร์ด้วยความสามารถอัตโนมัติสมัยใหม่"
      },
      cicd: {
        title: "CI/CD",
        description: "Pipeline การรวมและการส่งมอบอย่างต่อเนื่อง ทำให้กระบวนการสร้าง ทดสอบ และส่งมอบเป็นไปโดยอัตโนมัติเพื่อการปล่อยที่เร็วและเชื่อถือได้มากขึ้น"
      }
    },
    portfolio: {
      title: "Visual Highlights",
      description: "คอลเลกชันผลงานที่คัดสรรแล้ว แต่ละงานผสมผสานการออกแบบที่สวยงาม ฟังก์ชันการทำงานที่ชาญฉลาด และประสบการณ์ผู้ใช้ที่ราบรื่น"
    },
    contact: {
      title: "Get in Touch",
      description: "มีโปรเจกต์ในใจหรือต้องการร่วมงานกันไหม? มาเชื่อมต่อและทำให้ไอเดียของคุณเป็นจริงกันเถอะ",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "ขอบคุณ! ข้อความของคุณถูกส่งเรียบร้อยแล้ว",
      backToTop: "Back to Top"
    },
    footer: {
      copyright: "© 2025 Nattapat Phungphugdee"
    }
  }
};

// Get current language from localStorage or default to 'th'
let currentLang = localStorage.getItem('language') || 'th';

// Function to translate text
function translate(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  
  // Try to get translation from current language
  for (const k of keys) {
    if (value && typeof value === 'object' && value[k] !== undefined) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      value = translations.en;
      for (const k2 of keys) {
        if (value && typeof value === 'object' && value[k2] !== undefined) {
          value = value[k2];
        } else {
          value = undefined;
          break;
        }
      }
      break;
    }
  }
  
  return value || key;
}

// Function to update all translatable elements
function updateLanguage() {
  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translate(key);
    
    if (element.tagName === 'INPUT' && element.type === 'text') {
      element.placeholder = translation;
    } else if (element.tagName === 'TEXTAREA') {
      element.placeholder = translation;
    } else if (element.tagName === 'BUTTON') {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  });
  
  // Update language toggle button text
  const langText = document.getElementById('langText');
  if (langText) {
    langText.textContent = currentLang === 'en' ? 'TH' : 'EN';
  }
  
  // Save language preference
  localStorage.setItem('language', currentLang);
}

// Function to toggle language
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'th' : 'en';
  updateLanguage();
}

// Make toggleLanguage globally accessible
window.toggleLanguage = toggleLanguage;

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  updateLanguage();
});

