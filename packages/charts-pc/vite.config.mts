import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  mode: 'production',
  plugins: [
    react(),
    dts({
      entryRoot: './', // 指定 TypeScript 入口目录
      outDir: './lib', // 声明文件输出路径
      tsconfigPath: './tsconfig.json', // 确保读取正确配置
    }),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: './react/index.ts',
      name: 'index',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
});
