import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? '/blog' : '',
  assetPrefix: isGitHubPages ? '/blog/' : '',
};

export default nextConfig;
