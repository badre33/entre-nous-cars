import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Articles de blog - à synchroniser avec src/data/blogArticles.ts
const blogArticles = [
  { slug: "pourquoi-benatna", date: "2025-01-05" },
  { slug: "louer-voiture-marrakech", date: "2025-01-04" },
  { slug: "guide-conduire-maroc", date: "2025-01-03" },
  { slug: "assurance-location-voiture", date: "2025-01-02" },
  { slug: "road-trip-maroc", date: "2025-01-01" },
  { slug: "choisir-voiture-location", date: "2024-12-30" },
  { slug: "meilleure-saison-maroc", date: "2024-12-29" },
];

// Pages statiques
const staticPages = [
  { loc: 'https://benatna.ma/', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://benatna.ma/louer', priority: '0.9', changefreq: 'daily' },
  { loc: 'https://benatna.ma/partenaires', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://benatna.ma/a-propos', priority: '0.7', changefreq: 'monthly' },
  { loc: 'https://benatna.ma/blog', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://benatna.ma/contact', priority: '0.6', changefreq: 'monthly' },
  { loc: 'https://benatna.ma/faq', priority: '0.7', changefreq: 'monthly' },
  { loc: 'https://benatna.ma/location-voiture-casablanca', priority: '0.9', changefreq: 'weekly' },
  { loc: 'https://benatna.ma/location-voiture-marrakech', priority: '0.9', changefreq: 'weekly' },
  { loc: 'https://benatna.ma/location-voiture-rabat', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://benatna.ma/location-voiture-tanger', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://benatna.ma/location-voiture-agadir', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://benatna.ma/location-voiture-fes', priority: '0.8', changefreq: 'weekly' },
];

// Générer les URLs des articles
const blogUrls = blogArticles.map(article => ({
  loc: `https://benatna.ma/blog/${article.slug}`,
  lastmod: article.date,
  priority: '0.8',
  changefreq: 'monthly'
}));

// Générer le XML
const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Ajouter les pages statiques
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Ajouter les articles de blog
  blogUrls.forEach(article => {
    xml += `  <url>
    <loc>${article.loc}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>${article.changefreq}</changefreq>
    <priority>${article.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  
  return xml;
};

// Écrire le fichier
const sitemap = generateSitemap();
const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');

console.log('✅ Sitemap généré avec succès !');
console.log(`📄 ${staticPages.length} pages statiques`);
console.log(`📝 ${blogArticles.length} articles de blog`);
console.log(`📍 Total: ${staticPages.length + blogArticles.length} URLs`);
