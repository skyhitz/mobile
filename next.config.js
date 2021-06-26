// @generated: @expo/next-adapter@2.0.6
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withOffline = require('next-offline');
const withTM = require('next-transpile-modules')([
  'expo-next-react-navigation',
]);

module.exports = withExpo(
  withImages(
    withFonts(
      withTM(
        withOffline({
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
        })
      )
    )
  )
);
