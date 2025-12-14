/**
 * Скрипт для встановлення поля order для існуючих автомобілів
 * Запускати: node scripts/fix-car-order.js
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Підключення до MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI не знайдено в .env.local');
  process.exit(1);
}

const CarSchema = new mongoose.Schema({
  name: String,
  nameEn: String,
  image: String,
  tags: [String],
  tagsEn: [String],
  deposit: String,
  pricing: [{
    period: String,
    periodEn: String,
    price: String
  }],
  isActive: Boolean,
  order: Number,
}, { timestamps: true });

const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);

async function fixCarOrder() {
  try {
    console.log('Підключення до MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Підключено до MongoDB');

    // Отримуємо всі автомобілі без order або з order = 0
    const cars = await Car.find().sort({ createdAt: 1 });
    console.log(`Знайдено ${cars.length} автомобілів`);

    // Оновлюємо order для кожного автомобіля
    let updatedCount = 0;
    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      if (car.order === undefined || car.order === null || car.order === 0) {
        car.order = i;
        await car.save();
        updatedCount++;
        console.log(`✅ Оновлено: ${car.name} -> order: ${i}`);
      } else {
        console.log(`⏭️  Пропущено: ${car.name} (order вже встановлено: ${car.order})`);
      }
    }

    console.log(`\n✅ Готово! Оновлено ${updatedCount} з ${cars.length} автомобілів`);
    
    await mongoose.connection.close();
    console.log('З\'єднання закрито');
    process.exit(0);
  } catch (error) {
    console.error('❌ Помилка:', error);
    process.exit(1);
  }
}

fixCarOrder();
