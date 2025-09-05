import { defineConfig } from 'tsdown'

export default defineConfig({
  outDir: 'lib',
  platform: 'browser',
  format: ['esm', 'cjs'],
  target: 'es2020',
  fixedExtension: true,
})
