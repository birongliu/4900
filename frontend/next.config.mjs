/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "cdn2.thedogapi.com"},{ hostname: "cdn2.thecatapi.com"},{ hostname: "images.unsplash.com" }, { hostname: "media.istockphoto.com"}, { hostname: "img.clerk.com"}]
    }
};

export default nextConfig;
