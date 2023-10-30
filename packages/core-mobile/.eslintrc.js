// workaround for https://github.com/eslint/eslint/issues/3458 and https://github.com/yarnpkg/berry/issues/8
// this allows our shared eslint config to bring along its own plugins
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname
  },
  extends: ['@avalabs/eslint-config-mobile'],
  ignorePatterns: [
    'shim.js',
    'glacierApi.client.ts', // generated by openapi-zod-client (https://openapi-zod-client.vercel.app/)
    'metro.monorepo.config.js'
  ],
  overrides: [
    {
      files: [
        '*.test.ts',
        '*.e2e.smoke.ts',
        '*.e2e.ts',
        '*.page.ts',
        '*.spec.ts',
        '*.loc.ts'
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['off']
      }
    }
  ]
}
