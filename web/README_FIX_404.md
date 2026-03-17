# 🚨 404 错误解决方案

## 问题原因
Vercel 在仓库根目录找不到 `package.json` 和 Next.js 项目文件，因为项目在 `web` 子目录中。

## 解决方案（二选一）

### 方案一：配置 Vercel Root Directory（推荐）

1. **访问 Vercel Dashboard**
   - 点击 "Continue to Dashboard"
   - 选择您的项目

2. **进入设置**
   - Settings → General

3. **配置 Root Directory**
   - 找到 "Root Directory" 部分
   - 点击 "Edit"
   - 选择 "Monorepo"
   - 输入目录名：`web`
   - 点击 "Save"

4. **重新部署**
   - 进入 Deployments 标签
   - 找到最近的部署
   - 点击右侧的 ⋮ (三个点)
   - 选择 "Redeploy"

### 方案二：移动文件到根目录

如果您不想配置 Root Directory，可以将所有文件从 `web` 文件夹移到仓库根目录：

```bash
# 在本地执行
cd web
move * ..
cd ..
rmdir web
git add -A
git commit -m "chore: 移动项目文件到根目录"
git push
```

然后重新部署。

---

## 推荐
**使用方案一**，保持当前项目结构，只需在 Vercel 后台配置即可。
