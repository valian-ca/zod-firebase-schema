import { defineConfig } from 'tsdown'

export default defineConfig({
  outDir: 'lib',
  platform: 'node',
  format: ['esm', 'cjs'],
  fixedExtension: true,
})
