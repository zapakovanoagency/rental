// Тестові приклади запитів до API
// Використовуйте в браузерній консолі або Postman

// ==================== AUTH ====================

// Вхід адміна
async function loginAdmin() {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'admin',
      password: 'password123'
    })
  });
  const data = await response.json();
  console.log('Login:', data);
  return data;
}

// Вихід адміна
async function logoutAdmin() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST'
  });
  const data = await response.json();
  console.log('Logout:', data);
  return data;
}

// ==================== CARS ====================

// Отримати всі автомобілі
async function getAllCars() {
  const response = await fetch('/api/cars');
  const data = await response.json();
  console.log('All cars:', data);
  return data;
}

// Створити новий автомобіль
async function createCar() {
  const carData = {
    name: 'BMW X5',
    image: 'https://example.com/bmw-x5.jpg',
    tags: ['Преміум', 'Автомат', 'Бензин', 'Позашляховик'],
    deposit: '2 000 $',
    pricing: [
      { period: '1-3 дні', price: '200 $/доба' },
      { period: '4-9 днів', price: '180 $/доба' },
      { period: '10-29 днів', price: '160 $/доба' },
      { period: '30 та більше днів', price: '140 $/доба' }
    ]
  };

  const response = await fetch('/api/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  });
  const data = await response.json();
  console.log('Created car:', data);
  return data;
}

// Оновити автомобіль
async function updateCar(carId) {
  const updates = {
    name: 'BMW X5 (Оновлено)',
    deposit: '2 200 $'
  };

  const response = await fetch(`/api/cars/${carId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  const data = await response.json();
  console.log('Updated car:', data);
  return data;
}

// Видалити автомобіль
async function deleteCar(carId) {
  const response = await fetch(`/api/cars/${carId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log('Deleted car:', data);
  return data;
}

// ==================== UPLOAD ====================

// Завантажити фото (використовуйте input file)
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  console.log('Uploaded image:', data);
  return data;
}

// Видалити фото з Cloudinary
async function deleteImage(publicId) {
  const response = await fetch('/api/upload', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId })
  });
  const data = await response.json();
  console.log('Deleted image:', data);
  return data;
}

// ==================== ВИКОРИСТАННЯ ====================

// Приклад використання:
// 1. Увійдіть як адмін
// await loginAdmin();

// 2. Отримайте всі автомобілі
// await getAllCars();

// 3. Створіть новий автомобіль
// const newCar = await createCar();

// 4. Оновіть автомобіль (замініть ID)
// await updateCar('674d5e8f9a1b2c3d4e5f6a7b');

// 5. Видаліть автомобіль (замініть ID)
// await deleteCar('674d5e8f9a1b2c3d4e5f6a7b');

// 6. Вийдіть
// await logoutAdmin();

console.log('API Test Functions loaded! Use loginAdmin(), getAllCars(), etc.');
