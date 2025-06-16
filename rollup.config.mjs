import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/content/injectButton.ts',
  output: {
    file: 'dist/injectButton.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    typescript({ target: 'ES2022', rootDir: 'src', outDir: 'dist' })
  ]
};
