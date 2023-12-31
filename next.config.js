/** @type {import('next').NextConfig} */
const nextConfig = {
experimental:{serverActions:true},
    images:{
        unoptimized:true,
        formats:["image/avif","image/webp"],
        domains:["swiperjs.com","utfs.io","s3.amazonaws.com","*"],

    
    }, 
    //  webpack: (
    //     config,
    //     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    //   ) => {
    //     config.module.rules.push({
    //       test: /\.mjs$/,
    //       include: /node_modules/,
    //       type: "javascript/auto",
    //     });
    //     return config;
    //   },


}

module.exports = nextConfig
 