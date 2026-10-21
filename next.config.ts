import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];

const nextConfig: NextConfig = {
  distDir: process.env.ZELORA_BUILD_DIR || '.next',
  poweredByHeader: false,
  experimental: { workerThreads: true, cpus: 1, useTypeScriptCli: false },
  images: { remotePatterns: [], qualities: [75, 85] },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
