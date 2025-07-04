import fetch from "node-fetch";

module.exports = {
  siteUrl: "https://holoiptv.com/",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  async additionalPaths(config) {
    const res = await fetch("https://holoiptv.com/blogs");
    const posts = await res.json();

    return posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: new Date().toISOString(),
    }));
  },
};
