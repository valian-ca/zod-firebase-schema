import { base } from '@valian/eslint-config/base'
import { importSort } from '@valian/eslint-config/import-sort'
import { json } from '@valian/eslint-config/json'
import { typescript } from '@valian/eslint-config/typescript'
import { vitest } from '@valian/eslint-config/vitest'
import { zod } from '@valian/eslint-config/zod'

export default [
  ...base,
  ...typescript,
  ...importSort,
  ...json,
  ...vitest,
  ...zod,
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
