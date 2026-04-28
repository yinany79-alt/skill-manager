# Skill Hub

> 一个本地 Web UI，用于扫描、管理和可视化编辑所有 Claude Agent Skills。

## 功能特性

- **一键扫描** — 自动发现全局、项目级和插件中的所有 Skills
- **可视化管理** — 集中展示、搜索、过滤和批量操作
- **实时编辑** — 直接在浏览器中编辑 SKILL.md 文件
- **版本控制** — 自动快照，支持版本对比和回滚
- **GitHub 同步** — 备份到 GitHub 仓库，多设备同步
- **健康检查** — 检测冲突、相似 Skill 和潜在问题

## 快速开始

```bash
npm install -g https://github.com/yinany79-alt/skill-manager/raw/main/release/claude-skill-hub.tgz && skill-hub
```

首次运行会自动启动服务并打开浏览器到 `http://localhost:3456`。

**之后每次启动只要敲 `skill-hub` 就行。**

要求：Node.js >= 20

## 扫描范围

- `~/.claude/skills/` — 全局 Skills
- `~/.claude/plugins/**/skills/` — 插件 Skills
- `~/.claude/projects/*/.claude/skills/` — 已注册项目
- 常见开发目录（Desktop、Documents、Projects 等，递归 3 层）
- 当前工作目录及向上 3 级
- `SKILL_HUB_EXTRA_PATHS` 环境变量指定的额外路径

## 本地开发

```bash
git clone https://github.com/yinany79-alt/skill-manager.git
cd skill-manager

npm install
npm run dev       # 开发模式：前端 5173 + 后端 3456
```

生产模式：

```bash
npm run build
npm start
```

## 环境变量

- `PORT` — 自定义端口（默认 3456，占用时自动 +1）
- `SKILL_HUB_NO_OPEN=1` — 启动时不自动打开浏览器
- `SKILL_HUB_EXTRA_PATHS` — 额外扫描路径

## 技术栈

- **前端**: React + TypeScript + Tailwind CSS
- **后端**: Fastify + WebSocket + 文件监听

## 许可

MIT
