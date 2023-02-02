/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          // {
          //   key: "Content-Type",
          //   value: "application/json",
          // },
        ],
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3000/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
