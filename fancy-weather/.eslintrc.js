module.exports = {
  env: {
    browser: true,
    es6: true,
    jest : true 
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {  
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "no-unused-vars": "warn",
    "import/extensions": "off",
    "react/prop-types": 0,
    "arrow-body-style": 0,  
  },
};
