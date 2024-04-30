// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "fr", "nl"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;