# 🚗 Car Rental - Next.js Project

Веб-сайт для оренди автомобілів з адмін-панеллю для управління автопарком.

## ✨ Основні можливості

- 🎨 Сучасний дизайн з анімаціями
- 📱 Повністю адаптивний (responsive)
- 🔐 Адмін-панель для управління автомобілями
- 🖼️ Завантаження фото на Cloudinary
- 💾 MongoDB Atlas для зберігання даних
- ⚡ Server-side rendering з Next.js 15
- 🎭 TypeScript для типізації

## 🚀 Швидкий старт

### 1. Встановіть залежності

```bash
npm install
```

### 2. Налаштуйте змінні оточення

Створіть `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

**Детальна інструкція:** [`ADMIN_SETUP.md`](./ADMIN_SETUP.md)

### 3. Створіть адміністратора

```bash
node scripts/create-admin.js
```

### 4. Запустіть проект

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000)

## 📋 Документація

- 📘 **[Повна інструкція налаштування](./ADMIN_SETUP.md)** - Детальний гайд
- 🚀 **[Швидкий старт](./QUICK_START.md)** - Короткі кроки
- ✅ **[Чеклист](./CHECKLIST.md)** - Список завдань

## 🔗 Важливі URL

- **Головна сторінка:** http://localhost:3000
- **Адмін вхід:** http://localhost:3000/admin
- **Дашборд адміна:** http://localhost:3000/admin/dashboard

## 🛠️ Технології

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas
- **File Storage:** Cloudinary
- **Auth:** Cookie-based sessions
- **ODM:** Mongoose

## 📁 Структура проекту

```
/app
  /admin              # Адмін-панель
  /api                # API endpoints
  page.tsx            # Головна сторінка
  layout.tsx          # Layout
/components           # React компоненти
/lib                  # Утиліти (MongoDB)
/models               # Mongoose моделі
/scripts              # Допоміжні скрипти
/public               # Статичні файли
```

## 🔐 Безпека

- Cookie-based аутентифікація
- Password hashing з bcrypt
- Protected routes з middleware
- Input validation
- HttpOnly cookies

## 🚀 Деплой

### Vercel (рекомендовано)

1. Push код на GitHub
2. Імпортуйте проект в Vercel
3. Додайте змінні оточення
4. Deploy!

### Важливо для продакшену

- Додайте всі змінні оточення
- В MongoDB Atlas додайте `0.0.0.0/0` в Network Access
- Змініть `NODE_ENV=production`

## 📞 Підтримка

Є питання? Створіть issue або звертайтесь до документації!

---

Made with ❤️ using Next.js
