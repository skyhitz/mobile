// @generated: @expo/next-adapter@2.0.6
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withImages = require('next-images');
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
        withTM({
          webpack: (
            config,
            { buildId, dev, isServer, defaultLoaders, webpack }
          ) => {
            return config;
          },
          eslint: {
            ignoreDuringBuilds: true,
          },
          projectRoot: __dirname,
          images: {
            disableStaticImages: true,
          },
        })
      )
    )
  )
);
