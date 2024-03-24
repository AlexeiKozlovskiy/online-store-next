/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/variables.scss";`,
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};

export default nextConfig;
