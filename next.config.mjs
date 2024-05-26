/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
     
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },

      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.cache = false;
        }
        return config;
      },
    logging:{
      fetches:{
        fullUrl:true
      }
    }
  }
  

export default nextConfig;
