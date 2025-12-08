# 🚀 Швидкий старт адмін-панелі

## Крок 1: Створіть .env.local

```bash
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

## Крок 2: Створіть адміністратора

```bash
node scripts/create-admin.js
```

## Крок 3: Запустіть проект

```bash
npm run dev
```

## Крок 4: Увійдіть в адмін-панель

Відкрийте http://localhost:3000/admin

---

**Детальна інструкція:** Див. `ADMIN_SETUP.md`

## Облікові записи для реєстрації

### MongoDB Atlas
https://www.mongodb.com/cloud/atlas (безкоштовний)

### Cloudinary
https://cloudinary.com (безкоштовний)

---

## Основні URL

- Головна: http://localhost:3000
- Адмін вхід: http://localhost:3000/admin
- Дашборд: http://localhost:3000/admin/dashboard
