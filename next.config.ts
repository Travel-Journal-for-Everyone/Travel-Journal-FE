module.exports = {
  // output: 'export',
  images: {
    remotePatterns: [
      // ✅ Google 로그인 프로필 이미지 (예: 소셜 로그인 시)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      // ✅ S3 저장소 - 사용자 프로필 이미지 및 정적 이미지
      {
        protocol: "https",
        hostname: "travel-journal-s3.s3.amazonaws.com",
        pathname: "/**",
      },
      // ✅ 네이버 검색 썸네일 이미지 (예: studio나 장소 데이터용)
      {
        protocol: "https",
        hostname: "search.pstatic.net",
        pathname: "/**",
      },
      // ✅ 네이버 블로그 이미지 (예: 플레이스 썸네일 대체 용도 등)
      {
        protocol: "https",
        hostname: "blogfiles.naver.net",
        pathname: "/**",
      },
      // ✅ Jejusori 뉴스 이미지 (mock 데이터 썸네일로 사용됨)
      {
        protocol: "https",
        hostname: "cdn.jejusori.net",
        pathname: "/**",
      },
      // ✅ 동아사이언스 썸네일 이미지 (mock 데이터 썸네일로 사용됨)
      {
        protocol: "https",
        hostname: "image.dongascience.com",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  webpack(config: { module: { rules: { test: RegExp; use: string[] }[] } }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  // 추가된 부분
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};
