<h1>Green Huang's Demo for Kingdom Technology - Front End Developer intern role </h1>

# Project URL
domain: https://webhook-demo-one.vercel.app/  
dashboard: https://vercel.com/greens-projects-3e30f4e0/webhook-demo  
supabase: https://supabase.com/dashboard/project/pdjqoyqsgaijfclkaiux/editor  
GitHub Repo: https://github.com/GreenH47/webhook-demo  

# objectives
Build a Next.js application with a landing page and dashboard that:
构建一个带有登录页面和仪表板的 Next.js 应用程序， 该应用程序：

✅ Accepts form inputs from multiple users
✅ 接受来自多个用户的表单输入
🔗 Sends data to a webhook
🔗 将数据发送到 webhook

🖥️ Displays data received from the webhook in real-time or near real-time
🖥️ 实时或近实时显示从 webhook 接收的数据

👥 Supports concurrent users — data must be user-specific and not clash across sessions
👥 支持并发用户 - 数据必须是特定于用户的，并且不能在会话之间发生冲突

## 📌 Tasks and Requirements
📌 任务和要求

✅ 1. Setup  ✅ 1. 设置
Create a Next.js App Router project
创建 Next.js App Router 项目

Push it to a public GitHub repository
将其推送到公共 GitHub 存储库

Use TypeScript, Tailwind CSS, and modern Next.js conventions
使用 TypeScript 、 Tailwind CSS 和现代 Next.js 约定



✅ 2. Routing & Structure
✅ 2. 路由和结构
Create two main routes using the App Router:
使用 App Router 创建两个主要路由：

/ → Landing Page (brief intro + link to dashboard)
/ → 登陆页面（简介 + 仪表板链接）
![1.png](docs%2F1.png)

/dashboard → Form Input + Data Display
/dashboard → 表单输入 + 数据显示
![2.png](docs%2F2.png)

✅ 3. Form Input  ✅ 3. 表单输入
On the /dashboard:
在 /dashboard 上：

Create a simple form with the following fields:
创建一个包含以下字段的简单表单：

🧑 Name (string)  🧑 名称（字符串）

💬 Message (string)  💬 消息（字符串）

🆔 Unique User ID (string, auto-generated or typed manually)
🆔 唯一用户 ID（字符串，自动生成或手动输入）

On submit, send the payload to a webhook endpoint (mock or real)
提交时，将有效负载发送到 webhook 端点（模拟或真实）
🖥️ Displays data received from the webhook in real-time or near real-time
🖥️ 实时或近实时显示从 webhook 接收的数据
![3.png](docs%2F3.png)

👥 Supports concurrent users — data must be user-specific and not clash across sessions  
👥 支持并发用户 - 数据必须是特定于用户的，并且不能在会话之间发生冲突  
![4.png](docs%2F4.png)

✅ 4. Webhook Setup  ✅ 4. Webhook 设置
Will be provided  将提供

✨ 5. Bonus (Optional but impressive)
✨ 5. 奖金（可选但令人印象深刻）

Persist data via Supabase, Firebase, or a simple Express.js API if going full-stack
如果采用全栈方式，则通过 Supabase 、 Firebase 或简单的 Express.js API 来持久化数据
![5.png](docs%2F5.png)


## 📦 Sample Deliverables  📦 交付样品

GitHub Repo: https://github.com/GreenH47/webhook-demo



Live Demo: Deploy via Vercel

现场演示：通过 Vercel 部署

# run it locally
develop base on the template vercel/next.js - Supabase Starter
https://vercel.com/templates/next.js/supabase 

Clone the repository
```bash
git clone https://github.com/GreenH47/webhook-demo.git

cd webhook-demo
```

Get the credentials
```bash 
npx vercel link 
npx vercel env pull .env.local
```  

Install dependencies and run the app
```bash
npm install
npm run dev
```