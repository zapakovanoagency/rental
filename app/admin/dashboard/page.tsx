'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CarForm from '@/components/admin/CarForm';

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

export default function AdminDashboard() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch('/api/cars', { 
        cache: 'no-store',
        next: { revalidate: 0 }
      });
      const data = await res.json();
      if (data.success) {
        setCars(data.data);
        console.log('Завантажено автомобілі:', data.data.map((c: Car) => ({ name: c.name, order: c.order })));
      }
    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = cars.findIndex((car) => car._id === active.id);
    const newIndex = cars.findIndex((car) => car._id === over.id);

    const newCars = arrayMove(cars, oldIndex, newIndex);
    setCars(newCars);

    // Зберігаємо новий порядок на сервері
    try {
      const carIds = newCars.map((car) => car._id);
      const response = await fetch('/api/cars/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carIds }),
      });
      
      const result = await response.json();
      console.log('Порядок збережено:', result);
      
      if (!result.success) {
        console.error('Помилка збереження:', result.error);
        fetchCars();
      }
    } catch (error) {
      console.error('Помилка збереження порядку:', error);
      // Повертаємо старий порядок у разі помилки
      fetchCars();
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
        <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-[10px]">
          <p className="text-blue-800 font-bold">💡 Перетягуйте картки для зміни порядку відображення на сайті</p>
        </div>

        {loading ? (
          <div className="text-center text-2xl">Завантаження...</div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={cars.map((car) => car._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car) => (
                  <SortableCarCard
                    key={car._id}
                    car={car}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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

// Sortable Car Card Component
function SortableCarCard({ 
  car, 
  onEdit, 
  onDelete 
}: { 
  car: Car; 
  onEdit: (car: Car) => void; 
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: car._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white rounded-[10px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48" {...listeners} style={{ cursor: 'grab' }}>
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-bold">🔄 Перетягніть</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{car.name}</h3>
        <p className="text-gray-600 mb-4">Застава: {car.deposit}</p>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(car);
            }}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-[10px] hover:bg-blue-600 transition-colors font-bold"
          >
            Редагувати
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(car._id);
            }}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-[10px] hover:bg-red-600 transition-colors font-bold"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}
