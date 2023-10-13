module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:svelte/prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['*.cjs'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
  },

  rules: {
    // we include non-breaking space in HTML from typopo
    'no-irregular-whitespace': [
      // the exceptions don't seem to solve this in the svelte case, so we just
      // turn off the rule entirely ☹️
      'off', // 'error',
      {
        skipStrings: true,
        skipTemplates: true,
        skipJSXText: true,
      },
    ],
  },

  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],

  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};
