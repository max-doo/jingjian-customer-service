# 🚀 从这里开始

欢迎使用游乐行业 SaaS 原型系统！

## ⚡ 三步启动项目

### 第 1 步：安装依赖

打开终端，在项目根目录执行：

```bash
npm install
```

> 💡 首次安装需要 2-5 分钟，请耐心等待

### 第 2 步：启动开发服务器

```bash
npm run dev
```

看到以下信息表示启动成功：

```
VITE v5.3.1  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 第 3 步：在浏览器中查看

打开浏览器访问：**http://localhost:5173/**

你将看到项目首页，可以选择查看：
- 🎨 **C端小程序**（橙色主题，移动端风格）
- 💼 **B端管理后台**（蓝色主题，PC端风格）

## 📱 查看效果

### C 端小程序

1. 点击首页的"C端小程序"卡片
2. 或直接访问：http://localhost:5173/customer
3. 建议用浏览器开发者工具切换到移动端视图（F12 → 切换设备工具栏）
4. 推荐尺寸：iPhone 12 (390x844) 或 iPhone SE (375x667)

### B 端管理后台

1. 点击首页的"B端管理后台"卡片
2. 或直接访问：http://localhost:5173/admin
3. 使用桌面端浏览器全屏查看效果最佳
4. 推荐分辨率：1440x900 或更高

## 🎯 功能预览

### C 端小程序包含：

✅ 用户信息卡（头像、昵称、手机号）  
✅ 票务统计（计次票、计时票、期限票）  
✅ 会员等级卡（橙色渐变，成长进度）  
✅ 21个功能入口（4列网格布局）  
✅ 底部导航（首页、扫码、我的）  

### B 端管理后台包含：

✅ 顶部导航栏（Logo、店铺切换、搜索、通知）  
✅ 左侧多级菜单（12个主模块）  
✅ 会员管理子菜单（11个子功能）  
✅ 数据统计卡片（4个指标）  
✅ 可扩展的工作区域  

## 📚 更多文档

| 文档 | 说明 |
|------|------|
| [README.md](./README.md) | 完整项目文档 |
| [QUICKSTART.md](./QUICKSTART.md) | 快速开始指南 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | GitHub Pages 部署教程 |
| [PROJECT_INFO.md](./PROJECT_INFO.md) | 详细项目信息 |

## 🔧 常用命令

```bash
# 启动开发服务器（热更新）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

## ❓ 遇到问题？

### 安装依赖失败

尝试清除缓存重新安装：

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

Windows 用户使用：

```powershell
rmdir /s /q node_modules
del package-lock.json
npm install
```

### 端口被占用

修改端口号，编辑 `vite.config.js`：

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/jingjian-demo/',
  server: {
    port: 3000  // 改为其他端口
  }
})
```

### 页面空白

1. 检查浏览器控制台是否有错误
2. 确认是否访问了正确的 URL
3. 尝试清除浏览器缓存
4. 重启开发服务器

### Bootstrap Icons 不显示

检查网络连接，确保可以访问 CDN：
```
https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css
```

## 🎨 快速定制

### 修改 C 端主题色

编辑 `src/pages/CustomerApp.jsx`，搜索 `orange` 替换为：
- `blue`（蓝色）
- `purple`（紫色）
- `green`（绿色）
- `pink`（粉色）

### 修改店铺名称

在以下文件中搜索并替换 `翠花科技3157号店`：
- `src/pages/CustomerApp.jsx`
- `src/pages/AdminDashboard.jsx`

### 修改用户信息

在 `src/pages/CustomerApp.jsx` 中搜索：
- `哈哈哈`（用户昵称）
- `181 **** 8716`（手机号）

## 🚀 下一步

1. ✅ 项目运行成功
2. 📝 熟悉代码结构
3. 🎨 根据需求定制界面
4. 🔧 添加新功能或页面
5. 📦 部署到 GitHub Pages
6. 📊 收集用户反馈

## 💡 提示

- 开发时修改代码会自动热更新
- 使用 VS Code + Tailwind CSS IntelliSense 插件体验更佳
- 建议安装 React Developer Tools 浏览器插件
- 使用浏览器开发者工具查看响应式效果

## 🎉 开始你的创作

现在一切就绪，开始定制你的游乐行业 SaaS 原型吧！

如有任何问题，请查看详细文档或提交 Issue。

---

**祝开发愉快！** 🎊

