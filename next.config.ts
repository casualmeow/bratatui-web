import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    const oneOfContainer = (config.module.rules as any[]).find(
      (r: any) => Array.isArray(r?.oneOf)
    );
    if (oneOfContainer) {
      for (const r of oneOfContainer.oneOf) {
        if (r?.test?.test?.(".svg")) {
          r.exclude = /\.svg$/i;
        }
      }
    } else {
      const fileRule = (config.module.rules as any[]).find(
        (r: any) => r?.test?.test?.(".svg")
      );
      if (fileRule) fileRule.exclude = /\.svg$/i;
    }
    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: { svgo: true, titleProp: true, ref: true },
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        resourceQuery: /url/,
      }
    );

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
      "*.svg?url": {
        loaders: [],
        as: "*.asset",
      },
    },
  },
};

export default nextConfig;
