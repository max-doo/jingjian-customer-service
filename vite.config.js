import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const repoName = 'jingjian-customer-service'

export default defineConfig(({ command }) => {
  // 开发环境使用根路径，生产环境使用仓库路径
  const base = command === 'build' ? `/${repoName}/` : '/'
  
  return {
    plugins: [react()],
    base,
    server: {
      host: '0.0.0.0',  // 监听所有网络接口，允许局域网访问
      port: 3000,  // 自定义端口号，可以改为任意未被占用的端口
      open: true,  // 启动时自动打开浏览器
      // strictPort: false,  // 如果端口被占用，自动尝试下一个可用端口
    },
  }
})

