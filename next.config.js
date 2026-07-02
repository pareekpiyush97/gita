// Set by the GitHub Actions deploy workflow only — keeps local dev and any
// other host (e.g. Vercel) working at the root path with no prefix.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "gita";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — required for GitHub Pages, which only serves static files.
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

module.exports = nextConfig;
