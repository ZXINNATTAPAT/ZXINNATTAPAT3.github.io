const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('front-matter');

// Configuration
const ARTICLES_DIR = path.join(__dirname, 'articles');
const OUTPUT_DIR = path.join(__dirname, 'articles');
const TEMPLATE_DIR = path.join(__dirname, 'templates');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read template file
function getTemplate(templateName) {
  const templatePath = path.join(TEMPLATE_DIR, `${templateName}.html`);
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf-8');
  }
  return null;
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

  // Replace template variables
  let html = template
    .replace(/\{\{title\}\}/g, escapeHtml(title))
    .replace(/\{\{description\}\}/g, escapeHtml(description))
    .replace(/\{\{date\}\}/g, formatDate(date))
    .replace(/\{\{author\}\}/g, escapeHtml(author))
    .replace(/\{\{tags\}\}/g, tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join(''))
    .replace(/\{\{image\}\}/g, imageHtml)
    .replace(/\{\{ogImage\}\}/g, ogImage)
    .replace(/\{\{content\}\}/g, htmlContent)
    .replace(/\{\{slug\}\}/g, slug)
    .replace(/\{\{canonical\}\}/g, `https://zxinnattapat3.github.io/articles/${slug}.html`);

  // Save HTML file
  const outputPath = path.join(OUTPUT_DIR, `${slug}.html`);
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

// Build sitemap with articles
function updateSitemap(articles) {
  const baseUrl = 'https://zxinnattapat3.github.io';
  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/blog.html`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    }
  ];

  articles.forEach(article => {
    urls.push({
      loc: `${baseUrl}/articles/${article.slug}.html`,
      lastmod: article.date,
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
  console.log('🚀 เริ่ม build...');
  
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    console.log('✅ สร้างโฟลเดอร์ articles แล้ว');
  }

  const markdownFiles = fs.readdirSync(ARTICLES_DIR)
    .filter(file => file.endsWith('.md'));

  if (markdownFiles.length === 0) {
    console.log('⚠️  ไม่พบไฟล์ Markdown ในโฟลเดอร์ articles');
    return;
  }

  console.log(`📝 พบ ${markdownFiles.length} บทความ`);

  const articles = markdownFiles.map(file => {
    console.log(`  - กำลัง build: ${file}`);
    return buildArticle(file);
  });

  buildBlogIndex(articles);
  updateSitemap(articles);

  console.log('✅ Build เสร็จสิ้น!');
  console.log(`📄 สร้าง ${articles.length} บทความ HTML`);
  console.log(`📋 อัพเดท sitemap.xml แล้ว`);
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('👀 เปิดโหมด watch...');
  build();
  
  fs.watch(ARTICLES_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
      console.log(`\n🔄 ตรวจพบการเปลี่ยนแปลง: ${filename}`);
      build();
    }
  });
} else {
  build();
}
