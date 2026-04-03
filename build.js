const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('front-matter');

// Try to load sharp for image optimization (optional)
let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  // sharp not installed, image optimization will be skipped
}

// Configuration
const ARTICLES_DIR = path.join(__dirname, 'articles');
const PROJECTS_DIR = path.join(__dirname, 'projects');
const ARTICLES_OUTPUT_DIR = path.join(__dirname, 'articles');
const PROJECTS_OUTPUT_DIR = path.join(__dirname, 'projects'); // Outputting to projects/ for simpler URLs
const TEMPLATE_DIR = path.join(__dirname, 'templates');
const COMPONENTS_DIR = path.join(__dirname, 'components');
const PHOTO_DIR = path.join(__dirname, 'Photo');
const OPTIMIZED_PHOTO_DIR = path.join(__dirname, 'Photo', 'optimized');
const BASE_URL = 'https://zxinnattapat3.github.io';
const STATIC_PAGES = [
  {
    template: path.join(TEMPLATE_DIR, 'index.template.html'),
    output: path.join(__dirname, 'index.html'),
    label: 'index.html',
    replacements: {
      '{{htmlLang}}': 'en',
      '{{dataI18nLangAttr}}': ' data-i18n-lang="en"',
      '{{pageUrl}}': `${BASE_URL}/`,
      '{{ogLocale}}': 'en_US',
      '{{canonicalUrl}}': `${BASE_URL}/`,
      '{{root}}': ''
    }
  },
  {
    template: path.join(TEMPLATE_DIR, 'index.template.html'),
    output: path.join(__dirname, 'th.html'),
    label: 'th.html',
    replacements: {
      '{{htmlLang}}': 'th',
      '{{dataI18nLangAttr}}': ' data-i18n-lang="th"',
      '{{pageUrl}}': `${BASE_URL}/th.html`,
      '{{ogLocale}}': 'th_TH',
      '{{canonicalUrl}}': `${BASE_URL}/th.html`
    }
  },
  {
    template: path.join(TEMPLATE_DIR, 'index.template.html'),
    output: path.join(__dirname, 'ja.html'),
    label: 'ja.html',
    replacements: {
      '{{htmlLang}}': 'ja',
      '{{dataI18nLangAttr}}': ' data-i18n-lang="ja"',
      '{{pageUrl}}': `${BASE_URL}/ja.html`,
      '{{ogLocale}}': 'ja_JP',
      '{{canonicalUrl}}': `${BASE_URL}/ja.html`
    }
  },
  {
    template: path.join(TEMPLATE_DIR, 'index.template.html'),
    output: path.join(__dirname, 'zh.html'),
    label: 'zh.html',
    replacements: {
      '{{htmlLang}}': 'zh',
      '{{dataI18nLangAttr}}': ' data-i18n-lang="zh"',
      '{{pageUrl}}': `${BASE_URL}/zh.html`,
      '{{ogLocale}}': 'zh_CN',
      '{{canonicalUrl}}': `${BASE_URL}/zh.html`
    }
  },
  {
    template: path.join(TEMPLATE_DIR, 'index.template.html'),
    output: path.join(__dirname, 'ko.html'),
    label: 'ko.html',
    replacements: {
      '{{htmlLang}}': 'ko',
      '{{dataI18nLangAttr}}': ' data-i18n-lang="ko"',
      '{{pageUrl}}': `${BASE_URL}/ko.html`,
      '{{ogLocale}}': 'ko_KR',
      '{{canonicalUrl}}': `${BASE_URL}/ko.html`
    }
  }
];
const BUILD_PAGES_ONLY = process.argv.includes('--pages-only');

const PROJECT_TECH_ICON_MAP = {
  'Angular': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  'ASP.NET Core': { type: 'image', src: 'https://cdn.simpleicons.org/dotnet/512BD4' },
  'Blockchain': { type: 'fa', icon: 'fas fa-link' },
  'C#': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  'Dev Blog': { type: 'fa', icon: 'fas fa-feather-alt' },
  'Django': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  'Express': { type: 'image', src: 'https://cdn.simpleicons.org/express/000000' },
  'Government': { type: 'fa', icon: 'fas fa-landmark' },
  'IPFS': { type: 'image', src: 'https://cdn.simpleicons.org/ipfs/65C2CB' },
  'Markdown': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg' },
  'MongoDB': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  'Node.js': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  'PostgreSQL': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  'Python': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  'React': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  'REST API': { type: 'image', src: 'https://cdn.simpleicons.org/openapiinitiative/6BA539' },
  'SQL Server': { type: 'image', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
  'Solidity': { type: 'image', src: 'https://cdn.simpleicons.org/solidity/363636' }
};

// Cache for templates
const templateCache = {};

// Configure marked for better performance
marked.setOptions({
  breaks: false,
  gfm: true,
  headerIds: false,
  mangle: false
});

// Ensure output directory exists
if (!fs.existsSync(ARTICLES_OUTPUT_DIR)) {
  fs.mkdirSync(ARTICLES_OUTPUT_DIR, { recursive: true });
}

// Read template file with caching
function getTemplate(templateName) {
  if (templateCache[templateName]) {
    return templateCache[templateName];
  }
  
  const templatePath = path.join(TEMPLATE_DIR, `${templateName}.html`);
  if (fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    templateCache[templateName] = template;
    return template;
  }
  return null;
}

function resolveIncludes(content, baseDir, seen = new Set()) {
  return content.replace(/<!--\s*@include\s+(.+?)\s*-->/g, (_, includePath) => {
    const resolvedPath = path.resolve(baseDir, includePath.trim());

    if (seen.has(resolvedPath)) {
      throw new Error(`Circular include detected: ${resolvedPath}`);
    }

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Include file not found: ${resolvedPath}`);
    }

    seen.add(resolvedPath);
    const includeContent = fs.readFileSync(resolvedPath, 'utf-8');
    const compiledContent = resolveIncludes(includeContent, path.dirname(resolvedPath), seen);
    seen.delete(resolvedPath);

    return compiledContent.trimEnd();
  });
}

function applyReplacements(content, replacements = {}) {
  let output = content;

  for (const [key, value] of Object.entries(replacements)) {
    output = output.split(key).join(value);
  }

  return output;
}

function buildStaticPages() {
  let builtCount = 0;

  for (const page of STATIC_PAGES) {
    if (!fs.existsSync(page.template)) {
      continue;
    }

    const templateContent = fs.readFileSync(page.template, 'utf-8');
    const compiledContent = resolveIncludes(templateContent, path.dirname(page.template));
    const outputContent = applyReplacements(compiledContent, page.replacements);
    fs.writeFileSync(page.output, outputContent, 'utf-8');
    builtCount++;
    console.log(`📄 ประกอบหน้า static: ${page.label}`);
  }

  return builtCount;
}

// Convert Markdown to HTML
function markdownToHtml(markdown) {
  return marked.parse(markdown);
}

// Build article HTML
function buildArticle(markdownFile) {
  const filePath = path.join(ARTICLES_DIR, markdownFile);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { attributes, body } = matter(content);
  
  // Get article metadata
  const {
    title = 'Untitled',
    description = '',
    date = new Date().toISOString().split('T')[0],
    author = 'Nattapat Phungphugdee',
    tags = [],
    image = '',
    slug = path.basename(markdownFile, '.md')
  } = attributes;

  // Convert markdown body to HTML
  const htmlContent = markdownToHtml(body);

  // Get template
  const template = getTemplate('article') || getDefaultTemplate();

  // Prepare image HTML
  const imageHtml = image ? `<img src="../${escapeHtml(image)}" alt="${escapeHtml(title)}" class="article-image">` : '';
  const ogImage = image ? `https://zxinnattapat3.github.io/${escapeHtml(image)}` : 'https://zxinnattapat3.github.io/Photo/DSCF2374.jpg';

  // Prepare all replacements at once for better performance
  const replacements = {
    '{{title}}': escapeHtml(title),
    '{{description}}': escapeHtml(description),
    '{{date}}': formatDate(date),
    '{{author}}': escapeHtml(author),
    '{{tags}}': tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join(''),
    '{{image}}': imageHtml,
    '{{ogImage}}': ogImage,
    '{{content}}': htmlContent,
    '{{slug}}': slug,
    '{{canonical}}': `https://zxinnattapat3.github.io/articles/${slug}.html`
  };

  // Replace all variables in one pass
  let html = template;
  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value);
  }

  // Save HTML file
  const outputPath = path.join(ARTICLES_OUTPUT_DIR, `${slug}.html`);
  fs.writeFileSync(outputPath, html, 'utf-8');
  
  return {
    slug,
    title,
    description,
    date,
    author,
    tags,
    image
  };
}

// Build project HTML
function buildProject(markdownFile) {
  const filePath = path.join(PROJECTS_DIR, markdownFile);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { attributes, body } = matter(content);
  
  const {
    title = 'Untitled Project',
    description = '',
    date = new Date().toISOString().split('T')[0],
    author = 'Nattapat Phungphugdee',
    tags = [],
    image = '',
    slug = path.basename(markdownFile, '.md')
  } = attributes;

  const htmlContent = markdownToHtml(body);
  const template = getTemplate('project.template') || getTemplate('project') || getDefaultTemplate();

  const imageHtml = image ? `<img src="{{root}}${escapeHtml(image)}" alt="${escapeHtml(title)}" class="project-showcase-img">` : '';
  const ogImage = image ? `https://zxinnattapat3.github.io/${escapeHtml(image)}` : 'https://zxinnattapat3.github.io/Photo/DSCF2374.jpg';

  const replacements = {
    '{{title}}': escapeHtml(title),
    '{{description}}': escapeHtml(description),
    '{{date}}': formatDate(date),
    '{{author}}': escapeHtml(author),
    '{{tags}}': renderProjectTechStack(tags),
    '{{image}}': imageHtml,
    '{{ogImage}}': ogImage,
    '{{content}}': htmlContent,
    '{{slug}}': slug,
    '{{canonical}}': `https://zxinnattapat3.github.io/projects/${slug}.html`,
    '{{root}}': '../'
  };

  let html = template;
  // Resolve includes first
  let compiledContent = resolveIncludes(html, TEMPLATE_DIR);
  
  // Fix asset paths in includes for subpages (e.g. Photo/ -> {{root}}Photo/)
  // Only apply this if {{root}} is not empty (i.e. we are in a subfolder)
  if (replacements['{{root}}'] && replacements['{{root}}'] !== '') {
    const root = replacements['{{root}}'];
    // Match common asset paths that don't already have http or root prefix
    compiledContent = compiledContent.replace(/(src|href)="(?!(http|https|\{\{root\}\}|\/))((Photo|stylesheets|js|node_modules)\/)/g, `$1="${root}$3`);
    
    // Fix hash links in navbar/footer to point to main page (e.g. href="#home" -> href="../index.html#home")
    // We assume any href starting with # should be prefixed with {{root}}index.html
    compiledContent = compiledContent.replace(/href="(#[a-zA-Z0-9_-]+)"/g, `href="${root}index.html$1"`);
    compiledContent = compiledContent.replace(/href="blog\.html"/g, `href="${root}blog.html"`);
  }

  html = applyReplacements(compiledContent, replacements);

  const outputPath = path.join(PROJECTS_OUTPUT_DIR, `${slug}.html`);
  fs.writeFileSync(outputPath, html, 'utf-8');
  
  return { slug, title, description, date, author, tags, image };
}

// Build blog index
function buildBlogIndex(articles) {
  const template = getTemplate('blog-index') || getDefaultBlogIndexTemplate();
  
  // Sort articles by date (newest first)
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const articlesList = articles.map(article => `
    <article class="article-preview">
      <h2><a href="articles/${article.slug}.html">${escapeHtml(article.title)}</a></h2>
      <div class="article-meta">
        <span class="date">${formatDate(article.date)}</span>
        <span class="author">${escapeHtml(article.author)}</span>
      </div>
      ${article.image ? `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" class="preview-image">` : ''}
      <p class="description">${escapeHtml(article.description)}</p>
      <div class="tags">${article.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
      <a href="articles/${article.slug}.html" class="read-more">อ่านต่อ →</a>
    </article>
  `).join('\n');

  const html = template.replace(/\{\{articles\}\}/g, articlesList);
  
  fs.writeFileSync(path.join(__dirname, 'blog.html'), html, 'utf-8');
}

// Build sitemap with articles and projects
function updateSitemap(articles, projects) {
  const urls = [
    {
      loc: `${BASE_URL}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '1.0'
    },
    {
      loc: `${BASE_URL}/blog.html`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    }
  ];

  articles.forEach(article => {
    urls.push({
      loc: `${BASE_URL}/articles/${article.slug}.html`,
      lastmod: article.date,
      changefreq: 'monthly',
      priority: '0.7'
    });
  });

  projects.forEach(project => {
    urls.push({
      loc: `${BASE_URL}/projects/${project.slug}.html`,
      lastmod: project.date,
      changefreq: 'monthly',
      priority: '0.7'
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf-8');
}

// Helper functions
function renderProjectTechStack(tags) {
  return tags.map(renderProjectTechTag).join('');
}

function renderProjectTechTag(tag) {
  const safeTag = escapeHtml(tag);
  const techMeta = PROJECT_TECH_ICON_MAP[tag];

  let iconMarkup = `<span class="project-tech-icon-fallback">${escapeHtml(getTagMonogram(tag))}</span>`;

  if (techMeta?.type === 'image') {
    iconMarkup = `<img src="${techMeta.src}" alt="${safeTag}" class="project-tech-icon-img" loading="lazy">`;
  } else if (techMeta?.type === 'fa') {
    iconMarkup = `<i class="${techMeta.icon} project-tech-fa" aria-hidden="true"></i>`;
  }

  return `
    <span class="project-tech-item" title="${safeTag}">
      <span class="project-tech-icon">
        ${iconMarkup}
      </span>
      <span class="project-tech-label">${safeTag}</span>
    </span>
  `;
}

function getTagMonogram(tag) {
  const words = String(tag)
    .replace(/[^\w\s+.#-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return words
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Optimize image using sharp
async function optimizeImage(inputPath, outputPath, options = {}) {
  if (!sharp) {
    console.log('  ⚠️  sharp ไม่ได้ติดตั้ง - ข้าม image optimization');
    return false;
  }

  try {
    const {
      quality = 85,
      maxWidth = 1920,
      maxHeight = 1920,
      format = null // auto-detect
    } = options;

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Determine output format
    let outputFormat = format || metadata.format;
    if (outputFormat === 'jpeg' || outputFormat === 'jpg') {
      outputFormat = 'jpeg';
    } else if (outputFormat === 'png') {
      outputFormat = 'png';
    } else if (outputFormat === 'webp') {
      outputFormat = 'webp';
    } else {
      // Convert unsupported formats to jpeg
      outputFormat = 'jpeg';
    }

    // Resize if needed
    let pipeline = image;
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Apply format-specific optimizations
    if (outputFormat === 'jpeg') {
      pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    } else if (outputFormat === 'png') {
      pipeline = pipeline.png({ quality, compressionLevel: 9 });
    } else if (outputFormat === 'webp') {
      pipeline = pipeline.webp({ quality });
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await pipeline.toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
    
    return {
      success: true,
      originalSize,
      optimizedSize,
      savings: parseFloat(savings),
      format: outputFormat
    };
  } catch (error) {
    console.error(`  ❌ Error optimizing ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Optimize all images in Photo directory
async function optimizeAllImages() {
  if (!sharp) {
    console.log('⚠️  sharp ไม่ได้ติดตั้ง - ข้าม image optimization');
    console.log('   💡 รัน: npm install sharp');
    return;
  }

  console.log('🖼️  เริ่ม optimize images...');
  
  if (!fs.existsSync(PHOTO_DIR)) {
    console.log('⚠️  ไม่พบโฟลเดอร์ Photo');
    return;
  }

  // Find all image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.jpeg', '.jfif'];
  const imageFiles = [];
  
  function findImages(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const relativePath = path.join(basePath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip optimized directory
        if (file !== 'optimized') {
          findImages(fullPath, relativePath);
        }
      } else {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          imageFiles.push({
            input: fullPath,
            output: path.join(OPTIMIZED_PHOTO_DIR, relativePath),
            relative: relativePath
          });
        }
      }
    }
  }

  findImages(PHOTO_DIR);

  if (imageFiles.length === 0) {
    console.log('⚠️  ไม่พบไฟล์รูปภาพ');
    return;
  }

  console.log(`📸 พบ ${imageFiles.length} ไฟล์รูปภาพ`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let successCount = 0;

  for (const { input, output, relative } of imageFiles) {
    process.stdout.write(`  - Optimizing: ${relative}... `);
    
    const result = await optimizeImage(input, output, {
      quality: 85,
      maxWidth: 1920,
      maxHeight: 1920
    });

    if (result.success) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
      successCount++;
      const sizeMB = (result.optimizedSize / 1024 / 1024).toFixed(2);
      console.log(`✅ (${sizeMB}MB, -${result.savings}%)`);
    } else {
      console.log(`❌`);
    }
  }

  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
  const totalOptimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);

  console.log(`\n✅ Optimize เสร็จสิ้น!`);
  console.log(`   📊 ${successCount}/${imageFiles.length} ไฟล์`);
  console.log(`   📦 ขนาดเดิม: ${totalOriginalMB}MB`);
  console.log(`   📦 ขนาดใหม่: ${totalOptimizedMB}MB`);
  console.log(`   💾 ประหยัด: ${totalSavings}%`);
}

// Default templates
function getDefaultTemplate() {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}} | Nattapat Phungphugdee</title>
  <meta name="description" content="{{description}}">
  <meta name="author" content="{{author}}">
  <link rel="canonical" href="{{canonical}}">
  <link rel="stylesheet" href="../stylesheets/index.css">
  <style>
    .article-container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .article-header { margin-bottom: 2rem; }
    .article-meta { color: #666; font-size: 0.9rem; margin: 1rem 0; }
    .article-image { width: 100%; border-radius: 8px; margin: 2rem 0; }
    .article-content { line-height: 1.8; }
    .tags { margin: 1rem 0; }
    .tag { display: inline-block; background: #f0f0f0; padding: 0.3rem 0.8rem; border-radius: 20px; margin-right: 0.5rem; font-size: 0.85rem; }
    .back-link { display: inline-block; margin-top: 2rem; color: #0066cc; text-decoration: none; }
  </style>
</head>
<body>
  <div class="article-container">
    <a href="../blog.html" class="back-link">← กลับไปหน้าบทความ</a>
    <article class="article-content">
      <header class="article-header">
        <h1>{{title}}</h1>
        <div class="article-meta">
          <span>วันที่: {{date}}</span> | 
          <span>ผู้เขียน: {{author}}</span>
        </div>
        {{image}}
        <div class="tags">{{tags}}</div>
      </header>
      <div class="article-content">
        {{content}}
      </div>
    </article>
  </div>
</body>
</html>`;
}

function getDefaultBlogIndexTemplate() {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>บทความ | Nattapat Phungphugdee</title>
  <meta name="description" content="บทความเกี่ยวกับการพัฒนาเว็บ, เทคโนโลยี, และประสบการณ์การทำงาน">
  <link rel="canonical" href="https://zxinnattapat3.github.io/blog.html">
  <link rel="stylesheet" href="stylesheets/index.css">
  <style>
    .blog-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
    .blog-header { text-align: center; margin-bottom: 3rem; }
    .articles-list { display: grid; gap: 2rem; }
    .article-preview { border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; }
    .article-preview h2 { margin-top: 0; }
    .article-preview h2 a { color: #333; text-decoration: none; }
    .article-preview h2 a:hover { color: #0066cc; }
    .article-meta { color: #666; font-size: 0.9rem; margin: 1rem 0; }
    .preview-image { width: 100%; border-radius: 8px; margin: 1rem 0; }
    .description { color: #555; line-height: 1.6; }
    .tags { margin: 1rem 0; }
    .tag { display: inline-block; background: #f0f0f0; padding: 0.3rem 0.8rem; border-radius: 20px; margin-right: 0.5rem; font-size: 0.85rem; }
    .read-more { display: inline-block; margin-top: 1rem; color: #0066cc; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="blog-container">
    <header class="blog-header">
      <h1>บทความ</h1>
      <p>บทความเกี่ยวกับการพัฒนาเว็บ, เทคโนโลยี, และประสบการณ์การทำงาน</p>
    </header>
    <div class="articles-list">
      {{articles}}
    </div>
  </div>
</body>
</html>`;
}

// Main build function
function build() {
  const startTime = Date.now();
  console.log('🚀 เริ่ม build...');

  const staticPagesBuilt = buildStaticPages();

  if (BUILD_PAGES_ONLY) {
    const buildTime = ((Date.now() - startTime) / 1000).toFixed(3);
    console.log('✅ Build หน้า static เสร็จสิ้น!');
    console.log(`📦 สร้างหน้า static ${staticPagesBuilt} หน้า`);
    console.log(`⚡ ใช้เวลา: ${buildTime} วินาที`);
    return;
  }
  
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    console.log('✅ สร้างโฟลเดอร์ articles แล้ว');
  }

  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
    console.log('✅ สร้างโฟลเดอร์ projects แล้ว');
  }

  // Pre-load templates to cache
  getTemplate('article');
  getTemplate('project');
  getTemplate('blog-index');

  // Build articles
  const markdownArticles = fs.readdirSync(ARTICLES_DIR)
    .filter(file => file.endsWith('.md'));
  
  console.log(`📝 พบ ${markdownArticles.length} บทความ`);
  const articles = markdownArticles.map(file => {
    console.log(`  - กำลัง build article: ${file}`);
    return buildArticle(file);
  });

  // Build projects
  const markdownProjects = fs.readdirSync(PROJECTS_DIR)
    .filter(file => file.endsWith('.md'));
  
  console.log(`🛠️ พบ ${markdownProjects.length} โปรเจกต์`);
  const projects = markdownProjects.map(file => {
    console.log(`  - กำลัง build project: ${file}`);
    return buildProject(file);
  });

  buildBlogIndex(articles);
  updateSitemap(articles, projects);

  const buildTime = ((Date.now() - startTime) / 1000).toFixed(3);
  console.log('✅ Build เสร็จสิ้น!');
  console.log(`📦 สร้างหน้า static ${staticPagesBuilt} หน้า`);
  console.log(`📄 สร้าง ${articles.length} บทความ HTML`);
  console.log(`🛠️ สร้าง ${projects.length} โปรเจกต์ HTML`);
  console.log(`📋 อัพเดท sitemap.xml แล้ว`);
  console.log(`⚡ ใช้เวลา: ${buildTime} วินาที`);
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('👀 เปิดโหมด watch...');
  build();

  const watchTargets = [
    { dir: TEMPLATE_DIR, test: filename => filename.endsWith('.html') },
    { dir: COMPONENTS_DIR, test: filename => filename.endsWith('.html') }
  ];

  if (!BUILD_PAGES_ONLY) {
    watchTargets.unshift({ dir: ARTICLES_DIR, test: filename => filename.endsWith('.md') });
    watchTargets.unshift({ dir: PROJECTS_DIR, test: filename => filename.endsWith('.md') });
  }

  watchTargets.forEach(({ dir, test }) => {
    if (!fs.existsSync(dir)) {
      return;
    }

    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (filename && test(filename)) {
        console.log(`\n🔄 ตรวจพบการเปลี่ยนแปลง: ${filename}`);
        build();
      }
    });
  });
} else if (process.argv.includes('--optimize-images')) {
  // Optimize images only
  optimizeAllImages().catch(console.error);
} else {
  build();
}
