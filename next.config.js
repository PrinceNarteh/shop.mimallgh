/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placeimg.com", "res.cloudinary.com", "loremflickr.com"],
  },
};

module.exports = nextConfig;
