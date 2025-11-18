# 部署指南

本文档介绍如何将此项目部署到 GitHub Pages。

## 方式一：使用 npm 脚本（推荐）

### 前置条件

1. 已安装 Node.js (v18+)
2. 已安装 Git
3. 有 GitHub 账号和仓库

### 部署步骤

1. **克隆或初始化仓库**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/jingjian-demo.git
git push -u origin main
```

2. **配置项目**

确保 `vite.config.js` 中的 `base` 配置正确：

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/jingjian-demo/', // 改为你的仓库名
})
```

同时确保 `src/App.jsx` 中的 `basename` 正确：

```javascript
<Router basename="/jingjian-demo">
```

3. **安装依赖**

```bash
npm install
```

4. **部署到 GitHub Pages**

```bash
npm run deploy
```

此命令会：
- 构建生产版本
- 将构建文件推送到 `gh-pages` 分支

5. **在 GitHub 启用 Pages**

- 访问仓库的 Settings → Pages
- Source 选择 `gh-pages` 分支
- 保存设置

6. **访问网站**

部署完成后，访问：
```
https://你的用户名.github.io/jingjian-demo/
```

## 方式二：使用 GitHub Actions（自动化）

### 步骤

1. **推送代码到 main 分支**

```bash
git push origin main
```

2. **GitHub Actions 自动部署**

项目已配置 `.github/workflows/deploy.yml`，每次推送到 main 分支时会自动触发部署。

3. **查看部署状态**

在仓库的 Actions 标签页查看部署进度。

4. **配置 GitHub Pages**

- Settings → Pages
- Source 选择 `gh-pages` 分支
- 保存

## 本地测试

### 开发环境

```bash
npm run dev
```

访问 http://localhost:5173

### 预览生产构建

```bash
npm run build
npm run preview
```

## 常见问题

### Q1: 部署后页面空白或 404

**解决方案**:
- 检查 `vite.config.js` 中的 `base` 路径是否正确
- 确保 `src/App.jsx` 中的 `basename` 与仓库名一致
- 检查 GitHub Pages 设置是否选择了正确的分支

### Q2: 路由刷新后 404

**原因**: GitHub Pages 不支持客户端路由。

**解决方案**: 
- 使用 Hash 路由（可选）
- 或者添加 404.html 重定向到 index.html

### Q3: 样式或图标不显示

**原因**: 资源路径问题。

**解决方案**:
- 确保 `base` 配置正确
- 检查 CDN 资源链接（Bootstrap Icons）
- 重新构建并部署

### Q4: npm run deploy 失败

**可能原因**:
- 未安装 gh-pages 包
- Git 未配置用户信息
- 没有推送权限

**解决方案**:
```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 配置 Git 用户信息
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 检查远程仓库
git remote -v
```

## 更新部署

修改代码后重新部署：

```bash
git add .
git commit -m "Update: 描述修改内容"
git push origin main
npm run deploy
```

## 自定义域名（可选）

1. 在 `public` 文件夹创建 `CNAME` 文件：
```
your-domain.com
```

2. 修改 `vite.config.js`：
```javascript
base: '/', // 使用根路径
```

3. 在域名 DNS 设置中添加 CNAME 记录指向：
```
你的用户名.github.io
```

## 性能优化建议

1. **代码分割**: 使用 React.lazy() 实现路由级别代码分割
2. **图片优化**: 使用 WebP 格式
3. **CDN**: 考虑使用 CDN 加速静态资源
4. **缓存策略**: 配置合理的缓存策略

## 监控和分析

推荐集成：
- Google Analytics
- Vercel Analytics
- Sentry（错误监控）

---

祝部署顺利！如有问题，请查看 [GitHub Pages 官方文档](https://docs.github.com/en/pages)。

