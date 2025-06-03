import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    fs: {
      // 允许访问 src 目录下的文件
      allow: ['..'],
    },
    proxy: {
      '/wfs': {
        target: 'https://webgis.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wfs/, '/cgi-bin/mapserv?map=/owg/mfw1.map'),
      },
    },
  },
  build: {
    // 明确指定需要复制的公共文件
    copyPublicDir: true,
    rollupOptions: {
      // 指定入口点
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
      // 排除 codeHtml 目录下的 HTML 文件，避免被打包为模块
      external: (id) => {
        return id.includes('public/codeHtml') || (id.includes('/codeHtml/') && id.endsWith('.html'))
      },
      output: {
        // 确保 public 目录下的文件被正确复制
        assetFileNames: (assetInfo) => {
          // 保持 HTML 文件的原始路径结构
          if (assetInfo.name && assetInfo.name.endsWith('.html')) {
            return '[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  // 移除 assetsInclude，避免 HTML 被当作资源处理
  // assetsInclude: ['**/*.html'],
})
