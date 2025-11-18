# 部署指南

本文档介绍如何将此项目部署到 GitHub Pages。

## 方式一：GitHub Actions 自动部署（推荐）

### 工作原理

- `.github/workflows/deploy.yml` 使用官方 `actions/upload-pages-artifact` + `actions/deploy-pages` 流程。
- 构建产物不会推送到 `gh-pages` 分支，而是作为 Pages Artifact 上传，由 GitHub Pages 直接发布（“无分支”模式）。
- 只要 `Settings → Pages → Build and deployment → Source` 选中 **GitHub Actions**，即可自动发布。

### 步骤

1. **推送代码到 main 分支**

```bash
git push origin main
```

2. **等待 Actions 完成**

- GitHub 会自动触发 “Deploy to GitHub Pages” workflow。
- 你也可以在 Actions 页面点击 **Run workflow** 手动触发。

3. **查看结果**

- 在 Actions 里确认 workflow 通过。
- 回到 `Settings → Pages` 查看最新的发布状态和可访问链接。
- 默认访问地址为：
  ```
  https://你的用户名.github.io/jingjian-customer-service/
  ```

4. **注意事项**

- 确保 `Settings → Actions → General → Workflow permissions` 允许默认 token 写 `pages`（官方模板会自动申请所需权限）。
- `vite.config.js` 的 `base` 必须与仓库同名（见下方“配置项目”）。

## 方式二：使用 npm 脚本（可选）

需要场景：本地直接推送静态文件到 `gh-pages` 分支（例如不想启用 Actions）。

### 前置条件

1. 已安装 Node.js (v18+)
2. 已安装 Git
3. 有 GitHub 账号和仓库

### 部署步骤

1. **安装依赖**

```bash
npm install
```

2. **运行脚本**

```bash
npm run deploy
```

此命令会构建项目并将 `dist` 推送到 `gh-pages` 分支。完成后需要在 Settings → Pages 中将 Source 改为 `Deploy from a branch / gh-pages` 才能生效。

## 基础配置

- `vite.config.js` 中的 `repoName` 默认设置为项目仓库名 `jingjian-customer-service`。如果你 fork 后改了仓库名，请同步修改该常量（Actions 和本地部署都会读取它）。
- `src/App.jsx` 会根据 `import.meta.env.BASE_URL` 自动推导 `basename`，无需额外修改。
- `src/pages/Home.jsx` 中 iframe 预览使用 `import.meta.env.BASE_URL` 构建链接，确保在 GitHub Pages 下仍可访问。
- `public/404.html` 已实现 SPA 路由兜底；保持文件存在即可在刷新子路由时避免 404。

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
- 检查 `vite.config.js` 中的 `repoName` 是否与你的仓库一致（决定 `base` 和 `BASE_URL`）
- 如果使用 Actions，确认 Pages Source 仍为 **GitHub Actions**；如使用手动脚本，则需改成 `gh-pages` 分支
- 重新运行 `npm run build` 确认构建成功

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

