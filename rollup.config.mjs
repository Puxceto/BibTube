import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/content/injectButton.ts',
    output: {
      file: 'dist/injectButton.js',
      format: 'iife',
      sourcemap: false
    },
    plugins: [typescript({ target: 'ES2022', rootDir: 'src', outDir: 'dist' })]
  },
  {
    input: 'src/options/popup.ts',
    output: {
      file: 'dist/options/popup.js',
      format: 'iife',
      sourcemap: false
    },
    plugins: [typescript({ target: 'ES2022', rootDir: 'src', outDir: 'dist' })]
  },
  {
    input: 'src/options/historyTab.ts',
    output: {
      file: 'dist/options/historyTab.js',
      format: 'iife',
      sourcemap: false
    },
    plugins: [typescript({ target: 'ES2022', rootDir: 'src', outDir: 'dist' })]
  },
  {
    input: 'src/options/download.ts',
    output: {
      file: 'dist/options/download.js',
      format: 'iife',
      sourcemap: false
    },
    plugins: [typescript({ target: 'ES2022', rootDir: 'src', outDir: 'dist' })]
  },
  {
    input: 'src/serviceWorker.ts',
    output: {
      file: 'dist/serviceWorker.js',
      format: 'iife',
      sourcemap: false
    },
    plugins: [typescript({ target: 'ES2022', rootDir: 'src', outDir: 'dist' })]
  }
];
