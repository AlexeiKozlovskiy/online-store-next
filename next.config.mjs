/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/variables.scss";`,
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
