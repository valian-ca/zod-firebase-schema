import { config } from '@valian/eslint-config'

export default [
  ...config.base,
  ...config.typescript,
  ...config.importSort,
  ...config.vitest,
  ...config.zod,
  {
    ignores: ['**/dist/', '**/lib', '**/coverage/'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
  },
  {
    settings: {
      'import-x/resolver': {
        typescript: {
          project: ['packages/*/tsconfig.json', 'tsconfig.json'],
          noWarnOnMultipleProjects: true,
        },
      },
    },
  },
]
