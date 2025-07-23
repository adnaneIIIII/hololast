import fetch from "node-fetch";

const config = {
  siteUrl: "https://mntdigital.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/admin/*',
    '/api/*',
    '/private/*',
    '/404',
    '/500'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/private',
          '/api',
          '/404',
          '/500'
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_APP_URL}/server-sitemap.xml`,
    ],
  },
  async additionalPaths(config) {
    const result = [];
    
    // Add dynamic blog posts
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog`);
      const posts = await res.json();
      posts.forEach(post => {
        result.push({
          loc: `/post/${post.id}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8
        });
      });
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error);
    }
   try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/product`);
      const products = await res.json();
      
      if (Array.isArray(products)) {
        products.forEach(product => {
          result.push({
            loc: `/product/${product.id}`,
            lastmod: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.8
          });
        });
      }
    } catch (error) {
      console.error('Error fetching products for sitemap:', error);
    }
    // Add static priority pages
    const priorityPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/blog', priority: 0.9, changefreq: 'daily' },
      { url: '/how-it-work', priority: 0.8, changefreq: 'weekly' },
      { url: '/free-trial', priority: 0.8, changefreq: 'weekly' },
      { url: '/thank-you', priority: 0.8, changefreq: 'weekly' },
      { url: '/list-channels', priority: 0.8, changefreq: 'weekly' },
      { url: '/product', priority: 0.8, changefreq: 'weekly' },
    ];

    priorityPages.forEach(page => {
      result.push({
        loc: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString()
      });
    });

    return result;
  },
};

export default config;
