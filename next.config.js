// @generated: @expo/next-adapter@2.0.6
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withOffline = require('next-offline');
const withTM = require('next-transpile-modules')([
  'expo-next-react-navigation',
]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.EXPO_ANALYZE === 'true',
});

module.exports = withExpo(
  withBundleAnalyzer(
    withImages(
      withFonts(
        withTM(
          withOffline({
            webpack: (
              config,
              { buildId, dev, isServer, defaultLoaders, webpack }
            ) => {
              // Important: return the modified config
              // if (!isServer) {
              //   config.optimization.splitChunks = {
              //     cacheGroups: {
              //       reactNativeWebExports: {
              //         test: /[\\/]node_modules[\\/]react-native-web[\\/]dist[\\/]exports[\\/]/,
              //         name: 'react-native-web-exports',
              //         chunks: 'all',
              //       },
              //       reactNativeWebVendor: {
              //         test: /[\\/]node_modules[\\/](react-native-web)[\\/]dist[\\/]vendor[\\/]/,
              //         name: 'react-native-web-vendor',
              //         chunks: 'all',
              //       },
              //     },
              //   };
              // }

              return config;
            },
            webpack5: false,
            eslint: {
              ignoreDuringBuilds: true,
            },
            projectRoot: __dirname,
            target: 'serverless',
            workboxOpts: {
              swDest: 'static/service-worker.js',
              runtimeCaching: [
                {
                  urlPattern: /^https?.*/,
                  handler: 'NetworkFirst',
                  options: {
                    cacheName: 'https-calls',
                    networkTimeoutSeconds: 15,
                    expiration: {
                      maxEntries: 150,
                      maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
              ],
            },
            exportPathMap: async function (
              defaultPathMap,
              { dev, dir, outDir, distDir, buildId }
            ) {
              return {
                '/': { page: '/' },
                '/accounts': { page: '/' },
                '/accounts/sign-in': { page: '/' },
                '/accounts/sign-up': { page: '/' },
                '/accounts/privacy': { page: '/' },
                '/accounts/terms': { page: '/' },
                '/dashboard': { page: '/' },
                '/dashboard/search': { page: '/' },
                '/dashboard/search/beats': { page: '/' },
                '/dashboard/search/beatmakers': { page: '/' },
                '/dashboard/charts': { page: '/' },
                '/dashboard/profile': { page: '/' },
                '/dashboard/profile/settings': { page: '/' },
                '/dashboard/profile/likes': { page: '/' },
                '/dashboard/profile/my-music': { page: '/' },
                '/upload': { page: '/' },
                '/edit-profile': { page: '/' },
                '/payment': { page: '/' },
              };
            },
          })
        )
      )
    )
  )
);
