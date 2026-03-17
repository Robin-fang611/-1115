# 🚀 Vercel 部署指南

## 📋 部署前准备

### 1. 推送到 GitHub
```bash
# 在网络恢复后执行
git push origin main
```

### 2. 环境变量配置

#### 本地开发环境
已创建 `.env.local` 文件，包含以下配置：
- `ADMIN_PASSWORD=61157252bB@` - 后台管理密码
- `NEXTAUTH_SECRET` - NextAuth 密钥（已生成）
- `NEXTAUTH_URL=http://localhost:3000` - 本地开发地址

#### Vercel 生产环境

在 Vercel 项目设置中添加以下环境变量：

1. **访问 Vercel Dashboard**
   - 进入项目 → Settings → Environment Variables

2. **添加环境变量**

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `ADMIN_PASSWORD` | `61157252bB@` | 后台管理登录密码 |
| `NEXTAUTH_SECRET` | `[生成随机密钥]` | 用于会话加密（见下方生成方法） |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | 部署后的实际域名 |

3. **生成 NEXTAUTH_SECRET**

在终端运行以下命令生成随机密钥：
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes(32))
```

将生成的字符串复制到 `NEXTAUTH_SECRET` 变量中。

## 🎯 部署步骤

### 方法一：Vercel 自动部署（推荐）

1. **访问 [vercel.com](https://vercel.com)**
2. **登录并点击 "Add New Project"**
3. **导入 GitHub 仓库**
   - Git Provider: GitHub
   - Repository: `Robin-fang611/-1115`
   - Root Directory: `web`（重要！）
4. **配置 Framework**
   - Framework Preset: Next.js（会自动检测）
5. **配置环境变量**
   - 点击 "Environment Variables"
   - 添加上述三个环境变量
6. **点击 "Deploy"**

### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 进入项目目录
cd web

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

## ⚙️ 项目配置

### vercel.json 已配置
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

## 🔍 验证部署

部署完成后：

1. **访问网站**
   - 打开 Vercel 提供的域名（如 `https://xxx.vercel.app`）

2. **测试后台登录**
   - 访问：`https://xxx.vercel.app/admin/login`
   - 使用密码：`61157252bB@`

3. **测试功能**
   - ✅ 首页显示
   - ✅ 后台管理
   - ✅ Blog 文章管理
   - ✅ 富文本编辑器
   - ✅ 图片上传
   - ✅ 视频嵌入

## 📝 注意事项

### 文件存储
- 当前使用本地文件系统存储上传的图片
- 生产环境建议使用云存储（如 Vercel Blob、AWS S3 等）

### 数据持久化
- 网站数据存储在 `src/data/siteData.json`
- 所有修改会保存到 Git 仓库
- 多人使用建议集成数据库

### 性能优化
- 首次访问会进行 SSR 渲染
- 后续访问使用静态缓存
- 可在 Vercel 配置缓存策略

## 🔧 故障排查

### 构建失败
```bash
# 本地测试构建
npm run build
```

### 环境变量问题
- 检查变量名是否正确
- 确认在 Vercel 中设置了所有必需变量
- 重新部署项目

### 后台无法登录
- 检查 `ADMIN_PASSWORD` 是否正确
- 检查 `NEXTAUTH_SECRET` 是否有效
- 清除浏览器缓存

## 📞 获取帮助

如遇到问题：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台错误
3. 查看 Next.js 文档

---

**祝部署顺利！🎉**
