module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    next: {
      rootDir: 'apps/template-next',
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    eqeqeq: 'error',
    yoda: 'error',
    curly: 'error',
    semi: ['error', 'never'],
    'no-else-return': 'error',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',
    'no-undef-init': 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^React$',
          },
        ],
      },
    },
    {
      files: ['*.json'],
      parser: 'jsonc-eslint-parser',
      rules: {},
    },
    {
      // Allow require in config files
      files: [
        '*.config.js',
        '*.config.cjs',
        '*.config.mjs',
        'next.config.js',
        'next.config.mjs',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
