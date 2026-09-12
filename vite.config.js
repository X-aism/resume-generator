import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 部署到 GitHub Pages 的子路径：https://x-aism.github.io/resume-generator/
  base: '/resume-generator/',
})
