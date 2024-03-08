/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/variables.scss";`,
  },
};

export default nextConfig;
