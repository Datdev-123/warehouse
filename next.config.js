/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use WASM SWC binary instead of native
  swcMinify: true,
  experimental: {
    swcLoader: true,
    swcMinifyDebugOptions: {
      compress: {
        defaults: false
      }
    }
  }
}

module.exports = nextConfig