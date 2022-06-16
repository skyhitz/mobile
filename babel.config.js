// @generated: @expo/next-adapter@3.1.6
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
  presets: ['@expo/next-adapter/babel'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-syntax-top-level-await'],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          app: './',
          'twin.macro': ['./twin.macro'],
        },
      },
    ],
  ],
};
