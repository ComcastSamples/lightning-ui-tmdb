module.exports = {
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
      ]
    }
  }
};
