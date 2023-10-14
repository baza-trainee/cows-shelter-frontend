module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'commitlint.config.cjs',
    'vite.config.js',
    'vitest.setup.js'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'tailwindcss', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'tailwindcss/classnames-order': 'warn'
  }
};
