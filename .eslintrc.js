module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true
  },
  plugins: ['jest', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    quotes: [2, 'single', 'avoid-escape'],
    'no-extra-boolean-cast': 'off',
    'no-unused-vars': [
      1,
      {
        'ignoreSiblings': true,
        'argsIgnorePattern': 'res|next|^err'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: true,
        singleQuote: true,
        tabWidth: 2,
        printWidth: 100,
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
}
