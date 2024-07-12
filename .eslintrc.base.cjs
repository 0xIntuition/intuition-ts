module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: [
    '!**/.server',
    '!**/.client',
    'node_modules',
    'dist',
    'build',
  ],
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y', 'prettier'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        eqeqeq: 'error',
        yoda: 'error',
        'no-else-return': 'error',
        'react/prop-types': 'off',
        'prettier/prettier': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'object-shorthand': 'error',
        'no-undef-init': 'error',
        'no-lonely-if': 'error',
        'no-unneeded-ternary': 'error',
        'no-confusing-arrow': 'error',
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {
            project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
          },
        },
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import', '@nx', 'prettier'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-ignore': 'allow-with-description',
          },
        ],
      },
    },
    {
      files: ['{package,project}.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        '@nx/dependency-checks': 'off',
      },
    },
  ],
}
