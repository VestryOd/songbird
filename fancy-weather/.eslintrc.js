module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    "react", "@typescript-eslint", "prettier"
  ],
  rules: {
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "no-unused-vars": "warn",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "prettier/prettier": [
      "error",
      {},
      {
        "usePrettierrc": true
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".jsx", ".ts", ".tsx"]
      }
    ],
    "no-restricted-globals": "off",
    "react/state-in-constructor": ["error", "never"],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-newline": "off",
    "react/no-danger": "off",
    "import/order": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/interface-name-prefix": [
      "error",
      {
        "prefixWithI": "always"
      }
    ],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        "allowSingleExtends": true
      }
    ],
    "no-unused-expressions": [
      "error",
      {
        "allowTernary": true,
        "allowShortCircuit": true
      }
    ],
    "no-param-reassign": "off",
    "class-methods-use-this": "off",
    // 'class-methods-use-this': ['error', {
    //   exceptMethods: [
    //     'render',
    //     'getInitialState',
    //     'getDefaultProps',
    //     'componentWillMount',
    //     'componentDidMount',
    //     'componentWillReceiveProps',
    //     'shouldComponentUpdate',
    //     'componentWillUpdate',
    //     'componentDidUpdate',
    //     'componentWillUnmount',
    //   ],
    // }],
  },
};