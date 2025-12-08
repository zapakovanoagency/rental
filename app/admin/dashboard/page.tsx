'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Car {
  _id: string;
  name: string;
  image: string;
  tags: string[];
  deposit: string;
  pricing: { period: string; price: string }[];
  isActive: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch('/api/cars');
      const data = await res.json();
      if (data.success) {
        setCars(data.data);
      }
    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ви впевнені, що хочете видалити цей автомобіль?')) return;

    try {
      const res = await fetch(`/api/cars/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (data.success) {
        fetchCars();
      }
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#DDDDDD]">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 
            className="text-3xl font-black uppercase"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Адмін-панель
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingCar(null);
                setShowForm(true);
              }}
              className="px-6 py-3 rounded-[10px] text-white font-bold uppercase transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'var(--font-unbounded)',
                background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
              }}
            >
              + Додати авто
            </button>
            <button
              onClick={() => router.push('/admin/admins')}
              className="px-6 py-3 bg-purple-500 text-white rounded-[10px] hover:bg-purple-600 transition-colors font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              👥 Адміни
            </button>
            <button
              onClick={() => router.push('/admin/logs')}
              className="px-6 py-3 bg-blue-500 text-white rounded-[10px] hover:bg-blue-600 transition-colors font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              📊 Логи
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Вийти
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {loading ? (
          <div className="text-center text-2xl">Завантаження...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car._id} className="bg-white rounded-[10px] overflow-hidden shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                  <p className="text-gray-600 mb-4">Застава: {car.deposit}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-[10px] hover:bg-blue-600 transition-colors font-bold"
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-[10px] hover:bg-red-600 transition-colors font-bold"
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cars.length === 0 && !loading && (
          <div className="text-center text-2xl text-gray-600">
            Немає автомобілів. Додайте перший!
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <CarForm
          car={editingCar}
          onClose={() => {
            setShowForm(false);
            setEditingCar(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditingCar(null);
            fetchCars();
          }}
        />
      )}
    </div>
  );
}

// Форма для додавання/редагування автомобіля
function CarForm({ car, onClose, onSave }: { car: Car | null; onClose: () => void; onSave: () => void }) {
  const [formData, setFormData] = useState({
    name: car?.name || '',
    image: car?.image || '',
    tags: car?.tags?.join(', ') || '',
    deposit: car?.deposit || '',
    pricing: car?.pricing || [
      { period: '1-3 дні', price: '' },
      { period: '4-9 днів', price: '' },
      { period: '10-29 днів', price: '' },
      { period: '30 та більше днів', price: '' },
    ],
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataObj,
      });
      const data = await res.json();
      
      if (data.success) {
        setFormData({ ...formData, image: data.url });
      }
    } catch (error) {
      console.error('Помилка завантаження:', error);
      alert('Помилка завантаження зображення');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const carData = {
      name: formData.name,
      image: formData.image,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      deposit: formData.deposit,
      pricing: formData.pricing,
    };

    try {
      const url = car ? `/api/cars/${car._id}` : '/api/cars';
      const method = car ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });

      const data = await res.json();
      
      if (data.success) {
        onSave();
      } else {
        alert(data.error || 'Помилка збереження');
      }
    } catch (error) {
      console.error('Помилка збереження:', error);
      alert('Помилка збереження автомобіля');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-[10px] p-8 max-w-2xl w-full my-8">
        <h2 
          className="text-3xl font-black mb-6 uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {car ? 'Редагувати авто' : 'Додати авто'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Назва автомобіля</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Зображення</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px]"
            />
            {uploading && <p className="text-sm text-gray-600 mt-2">Завантаження...</p>}
            {formData.image && (
              <div className="mt-4 relative h-48 rounded-[10px] overflow-hidden">
                <Image src={formData.image} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Теги (через кому)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Преміум, Автомат, Дизель"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Застава</label>
            <input
              type="text"
              value={formData.deposit}
              onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
              placeholder="2 000 $"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Ціноутворення</label>
            {formData.pricing.map((p, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  value={p.period}
                  onChange={(e) => {
                    const newPricing = [...formData.pricing];
                    newPricing[index].period = e.target.value;
                    setFormData({ ...formData, pricing: newPricing });
                  }}
                  placeholder="Період"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
                  required
                />
                <input
                  type="text"
                  value={p.price}
                  onChange={(e) => {
                    const newPricing = [...formData.pricing];
                    newPricing[index].price = e.target.value;
                    setFormData({ ...formData, pricing: newPricing });
                  }}
                  placeholder="Ціна"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 py-3 rounded-[10px] text-white font-bold uppercase transition-all duration-300 hover:scale-105 disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-unbounded)',
                background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
              }}
            >
              {saving ? 'Збереження...' : 'Зберегти'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
