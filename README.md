# dsh-sidebar-rail

Codex 风格侧栏：把全局面板入口收进左侧图标列，工作区会话列表占用内容列。

## 效果

- 展开状态下，侧栏左侧固定一条 **44px 图标列**：插件、插件市场、论文伴读、远程控制、「更多」等全局面板入口竖排为 36px 方形图标按钮。
- **悬停 / 键盘聚焦** 时，图标右侧弹出气泡显示名称（直接读取按钮的 `aria-label`，配色与字号复用 DSH 自带 Tooltip 令牌，深浅主题一致）。
- 品牌行、新会话栏、底部区域左缩进 44px，与内容列左边缘对齐。
- 底部区域（余额面板、论文伴读开关、远程控制等）**布局完全交还宿主与对应插件**——本插件不接管页脚，避免与 `dsh-cost-meter` 之类自带布局的组件打架。
- 折叠成窄图标条时行为不变（该形态本来就是图标列）。

## 实现

纯 CSS 注入（仅 Client 半边）：不联网、不写文件、无 Host 逻辑。规则按侧栏的 CSS module 类名前缀生成，当前覆盖 `csseja_`（rc.1）、`wtg9ga_`（rc.2）、`OgAdAW_`（rc.5）。DSH 升级后若前缀变化，把新前缀追加到 `client.js` 的 `SIDEBAR_PREFIXES` 即可。

## 安装

工作区里的这个目录本身就是插件包。在 DSH 中安装：

```powershell
npx -p @deepseek-ai/dsh dsh plugin --profile desktop add <本目录绝对路径>
```

或在 **设置 → 插件 → 添加插件** 选择本目录。

## 与 dsh-sidebar-compact 的关系

**互斥**。`dsh-sidebar-compact` 是把面板行排成每行两个、页脚排成每行两个的旧方案；面板入口多了之后会与页脚组件（余额面板）重叠。启用本插件前请先停用 `dsh-sidebar-compact`，避免两份 `!important` CSS 同时生效。

## 可调参数

`client.js` 顶部：

- `ICON_COLUMN_WIDTH`（默认 44）：图标列宽度。注意这是从侧栏现有宽度里切出来的——侧栏宽度由 AppFrame 内联计算（264–420），插件无法设置，只能手动拖宽侧栏补偿。
- 悬停气泡样式在 `panelRow::after` 段：`left` 调整水平偏移，`font-size` 调整字号。

## 许可

MIT
