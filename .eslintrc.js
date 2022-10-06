module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['node_modules', 'dist', 'shim.js'],
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    'prettier',
    'eslint-comments',
    '@typescript-eslint',
    'jest',
    'import',
    'detox'
  ],
  rules: {
    radix: 'off', // parseInt should not have radix when parsing a value that can be number or hex
    'react-hooks/exhaustive-deps': 1,
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 1,
    '@typescript-eslint/ban-ts-comment': 'off',
    eqeqeq: 2,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['*.e2e.ts'],
      env: {
        'detox/detox': true,
        jest: true,
        'jest/globals': true
      }
    }
  ]
}
