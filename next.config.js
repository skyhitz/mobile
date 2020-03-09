// @generated: @expo/next-adapter@2.0.6
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withOffline = require('next-offline');

module.exports = withExpo(
  withFonts(
    withOffline({
      projectRoot: __dirname,
    })
  )
);
