/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        port: "",
        pathname: "/digikala-products/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
    ],
  },
  output: "export",
};

export default nextConfig;
