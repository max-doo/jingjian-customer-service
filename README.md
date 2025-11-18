# 游乐行业 SaaS 原型

基于 React + Tailwind CSS + Bootstrap Icons 构建的游乐行业 SaaS 高保真原型系统，包含 C 端小程序和 B 端管理后台界面。

## 📸 项目预览

### C 端小程序（顾客端）
- 橙色主题会员中心
- 用户信息展示
- 票务统计管理
- 会员等级系统
- 20+ 功能入口
- 微信小程序风格设计

### B 端管理后台（商家端）
- 蓝色系管理界面
- 完整的导航系统
- 会员管理模块
- 数据统计卡片
- 响应式桌面端布局

## 🚀 技术栈

- **框架**: React 18
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **图标**: Bootstrap Icons
- **路由**: React Router v6
- **部署**: GitHub Pages

## 📦 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:5173 查看项目

### 构建生产版本

```bash
npm run build
```

### 本地预览生产版本

```bash
npm run preview
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

## 📁 项目结构

```
jingjian-demo/
├── src/
│   ├── pages/
│   │   ├── Home.jsx           # 首页导航
│   │   ├── CustomerApp.jsx    # C端小程序
│   │   └── AdminDashboard.jsx # B端管理后台
│   ├── App.jsx                # 路由配置
│   ├── main.jsx               # 应用入口
│   └── index.css              # 全局样式
├── index.html
├── package.json
├── vite.config.js             # Vite配置
├── tailwind.config.js         # Tailwind配置
└── README.md
```

## 🎨 功能特性

### C 端小程序功能
- ✅ 会员信息展示
- ✅ 密码重置
- ✅ 储值明细
- ✅ 我的订单
- ✅ 优惠券管理
- ✅ 抽奖券
- ✅ 拼团记录
- ✅ 限时市概况
- ✅ 分享券
- ✅ 秒杀记录
- ✅ 二级分销
- ✅ 实体卡
- ✅ 出票设置
- ✅ 发红包
- ✅ 联盟商家
- ✅ 团购核销
- ✅ 关于我们
- ✅ 拉新有奖
- ✅ 砍价记录
- ✅ 自营商城
- ✅ 发票开具

### B 端管理后台模块
- ✅ 日常看板
- ✅ 套餐管理
- ✅ 门票管理
- ✅ 分销商管理
- ✅ 会员管理
  - 会员概况
  - 会员鱼缸
  - 会员查询
  - 游客查询
  - 会员排行
  - 会员标签
  - 会员管理
  - 会员记账
  - 卡片管理
  - 等级设置
  - 活动设置
- ✅ 商品管理
- ✅ 营销管理
- ✅ 设备管理
- ✅ 系统设置
- ✅ 合球功能
- ✅ 线上功能
- ✅ 报表统计

## 🔧 配置说明

### GitHub Pages 部署配置

1. 修改 `vite.config.js` 中的 `base` 路径为你的仓库名：
```javascript
export default defineConfig({
  base: '/your-repo-name/',
})
```

2. 修改 `src/App.jsx` 中的 `basename`：
```javascript
<Router basename="/your-repo-name">
```

3. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支

4. 运行部署命令：
```bash
npm run deploy
```

## 🎯 使用场景

- **产品演示**: 向客户展示新功能设计
- **内部评审**: 团队内部功能评审和讨论
- **开发参考**: 前端开发团队的 UI 参考原型
- **用户测试**: 可交互的高保真原型测试

## 📱 响应式设计

- **C 端**: 移动端优先，375px 基准宽度
- **B 端**: 桌面端布局，1440px+ 最佳体验

## 🎨 设计特色

- 采用现代化渐变色设计
- Bootstrap Icons 图标库
- 流畅的交互动画
- 符合微信小程序设计规范（C端）
- 专业的后台管理界面风格（B端）

## 📄 License

MIT

## 👨‍💻 开发者

产品经理 @ 游乐行业 SaaS 公司

---

如有问题或建议，欢迎提 Issue！

