/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "ssl.gstatic.com", 
      },
      {
        protocol: 'https',
        hostname: "flagpedia.net",
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      }
    ]
  },
}

module.exports = nextConfig
