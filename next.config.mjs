/** @type {import('next').NextConfig} */
/** @type {import('next-sitemap').IConfig} */

const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  images: {
    domains: [
      "existing-domain.com",
      "us-east-1-shared-usea1-02.graphassets.com",
      "ik.imagekit.io",
      "images.pexels.com",
      "utfs.io",
      "randomuser.me",
    ],
  },
};

export default nextConfig;
