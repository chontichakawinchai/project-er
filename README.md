# ER Project — Deploy บน Vercel

## โครงสร้างไฟล์
```
project-er-vercel/
├── index.html          ← หน้าเว็บหลัก (ต้องใส่เอง)
├── vercel.json          ← config Vercel
└── api/
    └── webhook.js       ← proxy LINE webhook → GAS
```

## ขั้นตอน Deploy

### 1. สมัคร / Login ที่ vercel.com
- ใช้ GitHub, GitLab หรือ Email ก็ได้

### 2. สร้าง Project ใหม่
- กด **"Add New… → Project"**
- เลือก **"Import Git Repository"** หรือ ลาก folder อัพขึ้นตรงๆ

### 3. ตั้ง Environment Variable
- ไปที่ **Settings → Environment Variables**
- เพิ่ม:
  ```
  GAS_URL = https://script.google.com/macros/s/XXXXXX/exec
  ```
  *(URL จาก GAS Deploy as Web App)*

### 4. Deploy!
- กด Deploy → รอ 30 วิ → ได้ URL เช่น `project-er.vercel.app`

### 5. ตั้ง Custom Domain (ถ้าต้องการ)
- Settings → Domains → เพิ่ม domain ที่ต้องการ

### 6. แก้ LINE Webhook URL
- ไปที่ **LINE Developers Console → Messaging API**
- เปลี่ยน Webhook URL เป็น:
  ```
  https://project-er.vercel.app/api/webhook
  ```

### 7. แก้ index.html — เปลี่ยน API URL
เปลี่ยนจาก:
```javascript
const API = 'https://script.google.com/macros/s/XXXXXX/exec';
```
เป็น:
```javascript
const API = '/api/webhook';
```

## ทำไมต้อง Proxy?
```
เดิม:   LINE → GAS (302 redirect → LINE ไม่ follow → ❌)
ใหม่:   LINE → Vercel Function → GAS (follow redirect → ✅) → 200 กลับ LINE
```

## Vercel Free Tier
- 100 GB bandwidth / เดือน
- Serverless Functions 100K invocations / เดือน
- เหลือเฟือสำหรับ project นี้
