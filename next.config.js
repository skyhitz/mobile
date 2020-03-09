// @generated: @expo/next-adapter@2.0.6
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withOffline = require('next-offline');

module.exports = withExpo(
  withFonts(
    withOffline({
      projectRoot: __dirname,
      target: 'serverless',
      transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
      // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
      // turn on the SW in dev mode so that we can actually test it
      generateInDevMode: true,
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
);
