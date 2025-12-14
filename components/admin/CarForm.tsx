'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Car {
  _id: string;
  name: string;
  nameEn?: string;
  image: string;
  tags: string[];
  tagsEn?: string[];
  deposit: string;
  pricing: { period: string; periodEn?: string; price: string }[];
  isActive: boolean;
  order?: number;
}

interface CarFormProps {
  car: Car | null;
  onClose: () => void;
  onSave: () => void;
}

export default function CarForm({ car, onClose, onSave }: CarFormProps) {
  const [formData, setFormData] = useState({
    name: car?.name || 'BMW X5',
    nameEn: car?.nameEn || 'BMW X5',
    image: car?.image || '',
    tags: car?.tags?.join(', ') || 'Автомат, Дизель, 7 місць, Повний привід',
    tagsEn: car?.tagsEn?.join(', ') || 'Automatic, Diesel, 7 seats, AWD',
    deposit: car?.deposit || '€500',
    pricing: car?.pricing || [
      { period: '1-3 дні', periodEn: '1-3 days', price: '€100' },
      { period: '4-7 днів', periodEn: '4-7 days', price: '€90' },
      { period: '8-14 днів', periodEn: '8-14 days', price: '€80' },
      { period: '15+ днів', periodEn: '15+ days', price: 'договірна' },
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
      nameEn: formData.nameEn,
      image: formData.image,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      tagsEn: formData.tagsEn.split(',').map(tag => tag.trim()).filter(Boolean),
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
      <div className="bg-white rounded-[10px] p-8 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
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
            <label className="block text-sm font-bold mb-2">Назва англійською (опціонально)</label>
            <input
              type="text"
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              placeholder="Car name in English"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
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
            <label className="block text-sm font-bold mb-2">Теги англійською (опціонально)</label>
            <input
              type="text"
              value={formData.tagsEn}
              onChange={(e) => setFormData({ ...formData, tagsEn: e.target.value })}
              placeholder="Premium, Automatic, Diesel"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Застава (в євро)</label>
            <input
              type="text"
              value={formData.deposit}
              onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
              placeholder="1 500 €"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Ціноутворення (в євро)</label>
            {formData.pricing.map((p, index) => (
              <div key={index} className="mb-4 p-3 border border-gray-200 rounded-[10px]">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={p.period}
                    onChange={(e) => {
                      const newPricing = [...formData.pricing];
                      newPricing[index].period = e.target.value;
                      setFormData({ ...formData, pricing: newPricing });
                    }}
                    placeholder="Період українською"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
                    required
                  />
                  <input
                    type="text"
                    value={p.periodEn || ''}
                    onChange={(e) => {
                      const newPricing = [...formData.pricing];
                      newPricing[index].periodEn = e.target.value;
                      setFormData({ ...formData, pricing: newPricing });
                    }}
                    placeholder="Period in English"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={p.price}
                  onChange={(e) => {
                    const newPricing = [...formData.pricing];
                    newPricing[index].price = e.target.value;
                    setFormData({ ...formData, pricing: newPricing });
                  }}
                  placeholder={index === formData.pricing.length - 1 ? "договірна" : "Ціна"}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
                />
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-2">Для останнього періоду залиште ціну пустою, щоб показати "договірна"</p>
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
