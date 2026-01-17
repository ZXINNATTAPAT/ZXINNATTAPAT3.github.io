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
const OUTPUT_DIR = path.join(__dirname, 'articles');
const TEMPLATE_DIR = path.join(__dirname, 'templates');
const PHOTO_DIR = path.join(__dirname, 'Photo');
const OPTIMIZED_PHOTO_DIR = path.join(__dirname, 'Photo', 'optimized');

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
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
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
  
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    console.log('✅ สร้างโฟลเดอร์ articles แล้ว');
  }

  // Pre-load templates to cache
  getTemplate('article');
  getTemplate('blog-index');

  const markdownFiles = fs.readdirSync(ARTICLES_DIR)
    .filter(file => file.endsWith('.md'));

  if (markdownFiles.length === 0) {
    console.log('⚠️  ไม่พบไฟล์ Markdown ในโฟลเดอร์ articles');
    return;
  }

  console.log(`📝 พบ ${markdownFiles.length} บทความ`);

  // Build articles in parallel for better performance
  const articles = markdownFiles.map(file => {
    console.log(`  - กำลัง build: ${file}`);
    return buildArticle(file);
  });

  buildBlogIndex(articles);
  updateSitemap(articles);

  const buildTime = ((Date.now() - startTime) / 1000).toFixed(3);
  console.log('✅ Build เสร็จสิ้น!');
  console.log(`📄 สร้าง ${articles.length} บทความ HTML`);
  console.log(`📋 อัพเดท sitemap.xml แล้ว`);
  console.log(`⚡ ใช้เวลา: ${buildTime} วินาที`);
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
} else if (process.argv.includes('--optimize-images')) {
  // Optimize images only
  optimizeAllImages().catch(console.error);
} else {
  build();
}
