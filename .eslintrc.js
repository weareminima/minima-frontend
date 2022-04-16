module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-typescript', // Uses the recommended rules from @eslint-plugin-react
    'airbnb/hooks', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'arrow-body-style': 0,
    'implicit-arrow-linebreak': 0,
    'import/prefer-default-export': 0,
    'no-console': [1, { allow: ['info', 'error'] }],
    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    'react/react-in-jsx-scope': 'off',
    // NextJs specific fix: allow jsx syntax in js and ts files
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
        custom: 'ignore',
        exceptions: [''],
      },
    ],
    'import/no-named-as-default': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react**',
            group: 'builtin',
          },
          {
            pattern: '@react**',
            group: 'builtin',
          },
          {
            pattern: 'classnames',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'lodash/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'next/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'node_modules/**',
            group: 'builtin',
          },
          {
            pattern: 'hoc/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'store/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'hooks/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'containers/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'components/**',
            group: 'internal',
          },
          {
            pattern: 'services/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'images/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'svgs/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
