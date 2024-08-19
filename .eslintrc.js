module.exports = {
  extends: ['next/core-web-vitals', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/display-name': 'off',
    indent: 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn', // Warn about unused variables
    '@typescript-eslint/no-explicit-any': 0,
  },
  env: {
    browser: true,
    es6: true,
  },
};
