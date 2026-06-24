/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "i.ibb.co",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
    },
    {
      protocol: "https",
      hostname: "**",
    }
  ],
},
};

export default nextConfig;
