module.exports = {
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "travel-journal-s3.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "search.pstatic.net",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "blogfiles.naver.net",
        pathname: "/**", // 필요 시 추가
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
