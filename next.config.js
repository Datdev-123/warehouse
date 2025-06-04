/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to enable server-side features
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['images.pexels.com', 'i.pravatar.cc'],
  },
};

module.exports = nextConfig;