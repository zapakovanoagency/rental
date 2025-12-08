// Скрипт для заповнення бази даних тестовими автомобілями
// Запустіть: node scripts/seed-cars.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  tags: [{ type: String }],
  deposit: { type: String, required: true },
  pricing: [{
    period: { type: String, required: true },
    price: { type: String, required: true }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);

const testCars = [
  {
    name: 'Mercedes-Benz E 220 d 4MATIC',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    tags: ['Преміум', 'Автомат', 'Дизель', 'Седан', '5 місць', 'Повний привід', 'Двигун 2,9 л'],
    deposit: '2 500 $',
    pricing: [
      { period: '1-3 дні', price: '200 $/доба' },
      { period: '4-9 днів', price: '180 $/доба' },
      { period: '10-29 днів', price: '170 $/доба' },
      { period: '30 та більше днів', price: '150 $/доба' }
    ]
  },
  {
    name: 'Porsche Cayenne',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    tags: ['Преміум', 'Автомат', 'Бензин', 'Позашляховик', '5 місць', 'Повний привід', 'Двигун 3,0 л'],
    deposit: '2 000 $',
    pricing: [
      { period: '1-3 дні', price: '220 $/доба' },
      { period: '4-9 днів', price: '200 $/доба' },
      { period: '10-29 днів', price: '170 $/доба' },
      { period: '30 та більше днів', price: '130 $/доба' }
    ]
  },
  {
    name: 'RAM 1500',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    tags: ['Преміум', 'Автомат', 'Бензин/Газ', 'Пікап', '5 місць', 'Повний привід', 'Двигун 5,7 л'],
    deposit: '3 000 $',
    pricing: [
      { period: '1-3 дні', price: '250 $/доба' },
      { period: '4-9 днів', price: '220 $/доба' },
      { period: '10-29 днів', price: '200 $/доба' },
      { period: '30 та більше днів', price: '160 $/доба' }
    ]
  },
  {
    name: 'Toyota Land Cruiser Prado 250',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    tags: ['Преміум', 'Автомат', 'Дизель', 'Позашляховик', '5 місць', 'Повний привід', 'Двигун 2,8 л'],
    deposit: '2 000 $',
    pricing: [
      { period: '1-3 дні', price: '250 $/доба' },
      { period: '4-9 днів', price: '200 $/доба' },
      { period: '10-29 днів', price: '170 $/доба' },
      { period: '30 та більше днів', price: '150 $/доба' }
    ]
  },
  {
    name: 'BMW X5',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    tags: ['Преміум', 'Автомат', 'Бензин', 'Позашляховик', '5 місць', 'Повний привід', 'Двигун 3,0 л'],
    deposit: '2 200 $',
    pricing: [
      { period: '1-3 дні', price: '210 $/доба' },
      { period: '4-9 днів', price: '190 $/доба' },
      { period: '10-29 днів', price: '175 $/доба' },
      { period: '30 та більше днів', price: '155 $/доба' }
    ]
  },
  {
    name: 'Audi Q7',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    tags: ['Преміум', 'Автомат', 'Дизель', 'Позашляховик', '7 місць', 'Повний привід', 'Двигун 3,0 л'],
    deposit: '2 300 $',
    pricing: [
      { period: '1-3 дні', price: '230 $/доба' },
      { period: '4-9 днів', price: '210 $/доба' },
      { period: '10-29 днів', price: '190 $/доба' },
      { period: '30 та більше днів', price: '160 $/доба' }
    ]
  },
  {
    name: 'Volkswagen Passat',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    tags: ['Бізнес', 'Автомат', 'Дизель', 'Седан', '5 місць', 'Двигун 2,0 л'],
    deposit: '1 500 $',
    pricing: [
      { period: '1-3 дні', price: '120 $/доба' },
      { period: '4-9 днів', price: '100 $/доба' },
      { period: '10-29 днів', price: '90 $/доба' },
      { period: '30 та більше днів', price: '80 $/доба' }
    ]
  },
  {
    name: 'Tesla Model 3',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    tags: ['Електро', 'Автомат', 'Седан', '5 місць', 'Автопілот'],
    deposit: '2 000 $',
    pricing: [
      { period: '1-3 дні', price: '180 $/доба' },
      { period: '4-9 днів', price: '160 $/доба' },
      { period: '10-29 днів', price: '140 $/доба' },
      { period: '30 та більше днів', price: '120 $/доба' }
    ]
  }
];

async function seedCars() {
  try {
    console.log('Підключення до MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Підключено до MongoDB\n');

    // Перевіряємо чи є вже автомобілі
    const existingCars = await Car.countDocuments();
    console.log(`Поточна кількість автомобілів: ${existingCars}`);

    if (existingCars > 0) {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise((resolve) => {
        rl.question('База вже містить автомобілі. Видалити всі і додати нові? (yes/no): ', resolve);
      });
      rl.close();

      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        console.log('\nВидалення існуючих автомобілів...');
        await Car.deleteMany({});
        console.log('✅ Видалено\n');
      } else {
        console.log('Операцію скасовано.');
        process.exit(0);
      }
    }

    console.log('Додавання тестових автомобілів...');
    const created = await Car.insertMany(testCars);
    
    console.log(`\n✅ Успішно додано ${created.length} автомобілів:`);
    created.forEach((car, index) => {
      console.log(`${index + 1}. ${car.name}`);
    });

    console.log('\nТепер відкрийте http://localhost:3000 щоб побачити автомобілі!');

  } catch (error) {
    console.error('❌ Помилка:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedCars();
