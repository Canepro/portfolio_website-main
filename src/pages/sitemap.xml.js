// src/pages/sitemap.xml.js

const EXTERNAL_DATA_URL = 'https://portfolio.canepro.me';

function generateSiteMap(projects = []) {
  const now = new Date().toISOString();

  const staticUrls = [
    { loc: `${EXTERNAL_DATA_URL}`, priority: '1.0' },
    { loc: `${EXTERNAL_DATA_URL}/projects`, priority: '0.8' },
    { loc: `${EXTERNAL_DATA_URL}/contact`, priority: '0.6' },
  ];

  const projectUrls = projects.map((p) => ({
    loc: `${EXTERNAL_DATA_URL}/projects/${p.slug}`,
    priority: '0.7',
  }));

  const allUrls = [...staticUrls, ...projectUrls]
    .map(
      ({ loc, priority }) => `
     <url>
       <loc>${loc}</loc>
       <lastmod>${now}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>${priority}</priority>
     </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allUrls}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Dynamically import projects for sitemap generation
  const { projects } = await import('../constants/constants');
  const sitemap = generateSiteMap(projects);

  res.setHeader('Content-Type', 'text/xml');
  // We send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
