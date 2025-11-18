# 快速开始指南

## 5 分钟上手

### 1. 克隆项目

```bash
git clone https://github.com/你的用户名/jingjian-demo.git
cd jingjian-demo
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

浏览器访问：http://localhost:5173

### 4. 浏览原型

- **首页**: http://localhost:5173/
- **C端小程序**: http://localhost:5173/customer
- **B端管理后台**: http://localhost:5173/admin

## 页面功能说明

### 首页 (/)
导航页面，包含两个主要入口：
- C端小程序入口
- B端管理后台入口

### C端小程序 (/customer)

**主要特性**：
- 橙色渐变主题
- 微信小程序风格设计
- 用户信息展示
- 票务统计（计次票、计时票、期限票）
- 会员等级卡片（橙色渐变）
- 20+ 功能入口网格
- 底部导航栏（首页、扫码、我的）

**功能网格包含**：
1. 会员信息
2. 密码重置
3. 储值明细
4. 我的订单
5. 优惠券
6. 抽奖券
7. 拼团记录
8. 限时市概况
9. 分享券
10. 秒杀记录
11. 二级分销
12. 实体卡
13. 出票设置
14. 发红包
15. 联盟商家
16. 团购核销
17. 关于我们
18. 拉新有奖
19. 砍价记录
20. 自营商城
21. 发票开具

### B端管理后台 (/admin)

**主要特性**：
- 蓝色系专业管理界面
- 顶部导航栏（Logo、店铺切换、搜索、通知、用户中心）
- 左侧多级导航菜单
- 标签页管理
- 数据统计卡片
- 可扩展的工作区域

**导航模块**：
- 日常看板
- 套餐管理
- 门票管理
- 分销商管理
- **会员管理**（可展开）
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
- 商品管理
- 营销管理
- 设备管理
- 系统设置
- 合球功能
- 线上功能
- 报表统计

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3.1 | UI 框架 |
| Vite | 5.3.1 | 构建工具 |
| Tailwind CSS | 3.4.4 | 样式框架 |
| React Router | 6.26.0 | 路由管理 |
| Bootstrap Icons | 1.11.3 | 图标库 |

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器（热更新）
npm run dev

# 构建生产版本
npm run build

# 本地预览生产构建
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

## 项目结构

```
jingjian-demo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── src/
│   ├── pages/
│   │   ├── Home.jsx           # 首页导航
│   │   ├── CustomerApp.jsx    # C端小程序（橙色主题）
│   │   └── AdminDashboard.jsx # B端管理后台（蓝色主题）
│   ├── App.jsx                # 路由配置
│   ├── main.jsx               # 应用入口
│   └── index.css              # Tailwind 样式入口
├── index.html                 # HTML 模板
├── package.json               # 项目配置
├── vite.config.js            # Vite 配置
├── tailwind.config.js        # Tailwind 配置
├── postcss.config.js         # PostCSS 配置
└── README.md                 # 项目文档
```

## 定制化修改

### 修改颜色主题

**C端主题色**（在 `src/pages/CustomerApp.jsx`）：
```javascript
// 当前：橙色系
from-orange-400 to-orange-600

// 可改为其他颜色
from-blue-400 to-blue-600    // 蓝色
from-purple-400 to-purple-600 // 紫色
from-green-400 to-green-600   // 绿色
```

**B端主题色**（在 `tailwind.config.js`）：
```javascript
colors: {
  primary: {
    // 修改这里的颜色配置
  }
}
```

### 修改店铺信息

在对应页面搜索并替换：
- `翠花科技3157号店`
- `翠殿门店控制中心`
- 用户名称、头像等

### 添加新功能

1. 在 `src/pages/` 创建新页面组件
2. 在 `src/App.jsx` 添加路由
3. 在导航中添加入口链接

## 响应式测试

### C端（移动端）

推荐测试尺寸：
- iPhone SE: 375x667
- iPhone 12: 390x844
- 微信小程序: 375x667

### B端（桌面端）

推荐测试尺寸：
- 笔记本: 1440x900
- 桌面: 1920x1080
- 宽屏: 2560x1440

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 下一步

1. ✅ 本地运行成功
2. 📝 根据需求修改页面内容
3. 🎨 调整颜色和样式
4. 🚀 部署到 GitHub Pages（参考 DEPLOYMENT.md）
5. 📊 收集反馈并迭代

## 需要帮助？

- 📖 查看完整文档：[README.md](./README.md)
- 🚀 部署指南：[DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 报告问题：提交 GitHub Issue
- 💡 功能建议：提交 GitHub Discussion

---

开始你的原型开发之旅吧！🎉

