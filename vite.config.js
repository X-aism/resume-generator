import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 相对路径：同时兼容 GitHub Pages 子路径和 EdgeOne 根域名部署
  base: './',
})
