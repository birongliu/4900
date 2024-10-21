/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "images.unsplash.com" }, { hostname: "media.istockphoto.com"}, { hostname: "img.clerk.com"}]
    }
};

export default nextConfig;
