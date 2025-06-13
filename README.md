# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

# 个人介绍网站

这是一个基于Vue 3 + TypeScript + Element Plus构建的个人介绍网站，展示10年从业经历的各类型项目。

## 功能特性

### 🎨 现代化设计

- 响应式设计，适配PC、平板、手机
- 渐变背景和毛玻璃效果
- 流畅的动画和交互效果
- 暗色主题设计

### 📱 完整模块

- **导航栏** - 固定导航，支持平滑滚动
- **英雄区域** - 个人介绍、头像展示、统计数据
- **项目展示** - 8个不同类型项目的卡片展示
- **技能栈** - 可视化技能进度条和标签云
- **工作经历** - 时间线展示职业发展历程
- **联系方式** - 联系信息和消息发送表单
- **页脚** - 快速链接和社交媒体

### 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **UI组件库**: Element Plus
- **图标**: Element Plus Icons
- **构建工具**: Vite
- **包管理器**: pnpm
- **代码规范**: ESLint + Prettier

## 项目结构

```
src/
├── components/
│   └── portfolio/          # 作品集组件
│       ├── PortfolioHeader.vue    # 导航栏
│       ├── HeroSection.vue        # 英雄区域
│       ├── ProjectsSection.vue    # 项目展示
│       ├── SkillsSection.vue      # 技能栈
│       ├── ExperienceSection.vue  # 工作经历
│       ├── ContactSection.vue     # 联系方式
│       └── PortfolioFooter.vue    # 页脚
├── views/
│   └── Portfolio.vue       # 主页面
├── router/
│   └── index.ts           # 路由配置
└── main.ts                # 应用入口
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm format
```

## 项目展示

网站包含以下8个项目类型的展示：

1. **电商平台** - Vue3 + Node.js
2. **企业管理系统** - React + Java
3. **移动应用** - Flutter
4. **数据分析平台** - Python + ML
5. **区块链项目** - Solidity
6. **AI智能助手** - TensorFlow
7. **物联网平台** - C++ / 嵌入式
8. **游戏开发** - Unity / C#

## 技能展示

### 前端技术

- Vue.js (95%)
- React (90%)
- TypeScript (88%)
- JavaScript (95%)
- HTML5/CSS3 (92%)

### 后端技术

- Node.js (90%)
- Java (85%)
- Python (88%)
- C# (80%)
- Go (75%)

### 数据库

- MySQL (85%)
- MongoDB (82%)
- Redis (80%)
- PostgreSQL (78%)

### 云服务与工具

- AWS (80%)
- Docker (85%)
- Kubernetes (75%)
- Nginx (82%)

## 自定义配置

### 修改个人信息

在各个组件中修改以下内容：

- `HeroSection.vue` - 姓名、职位、描述
- `ContactSection.vue` - 联系方式
- `PortfolioFooter.vue` - 版权信息

### 修改项目数据

在 `ProjectsSection.vue` 中的 `projects` 数组中修改项目信息。

### 修改技能数据

在 `SkillsSection.vue` 中修改各个技能数组的数据。

### 修改工作经历

在 `ExperienceSection.vue` 中的 `experiences` 数组中修改工作经历信息。

## 部署

### 构建

```bash
pnpm build
```

### 部署到静态服务器

将 `dist` 文件夹的内容部署到任何静态文件服务器即可。

### 推荐部署平台

- Vercel
- Netlify
- GitHub Pages
- 阿里云OSS
- 腾讯云COS

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT License

## 作者

张三 - 高级软件工程师

- 邮箱: your.email@example.com
- GitHub: github.com/yourusername
