/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All food imagery ships as local, self-contained SVG illustrations
    // (no external image hosts), so optimization is unnecessary and this
    // avoids any dependency on a third-party image service being up.
    unoptimized: true,
  },
};
module.exports = nextConfig;
