/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ 정적 export 모드로 지정
  output: 'export',

  // ✅ 이미지 최적화 기능 비활성화 (export 시 필수)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
