// Скрипт для створення першого адміністратора
// Запустіть: node scripts/create-admin.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createAdmin() {
  try {
    // Підключення до MongoDB
    console.log('Підключення до MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Підключено до MongoDB\n');

    // Введення даних
    const username = await question('Введіть ім\'я користувача: ');
    const email = await question('Введіть email: ');
    const password = await question('Введіть пароль (мін. 6 символів): ');

    if (password.length < 6) {
      console.log('❌ Пароль має містити мінімум 6 символів');
      process.exit(1);
    }

    // Хешування пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Створення адміна
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log('\n✅ Адміністратор успішно створений!');
    console.log(`Username: ${admin.username}`);
    console.log(`Email: ${admin.email}`);
    console.log('\nТепер можете увійти на: http://localhost:3000/admin');

  } catch (error) {
    if (error.code === 11000) {
      console.log('❌ Користувач з таким ім\'ям або email вже існує');
    } else {
      console.error('❌ Помилка:', error.message);
    }
  } finally {
    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  }
}

createAdmin();
