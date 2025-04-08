module.exports = {
  // output: 'export',
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "travel-journal-s3.s3.amazonaws.com",
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
