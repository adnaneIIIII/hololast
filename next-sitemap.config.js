import fetch from 'node-fetch';

module.exports = {
  siteUrl: 'https://holo-olive.vercel.app/',
  generateRobotsTxt: true,
  async additionalPaths(config) {
    const res = await fetch('https://yourapi.com/blogs');
    const posts = await res.json();

    return posts.map(post => ({
      loc: `/blog/${post.slug}`,
      lastmod: new Date().toISOString(),
    }));
  },
};
