import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // OpenNext (Cloudflare Workers) 需要 standalone 输出以生成 .next/standalone
  output: 'standalone',
  // 解决多lockfile警告
  outputFileTracingRoot: process.cwd(),
};

export default withNextIntl(nextConfig);
