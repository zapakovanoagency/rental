'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Admin {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

export default function AdminsManagement() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/admin/admins');
      const data = await res.json();

      if (data.success) {
        setAdmins(data.data);
      } else if (res.status === 401) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, username: string) => {
    if (!confirm(`Ви впевнені, що хочете видалити адміна "${username}"?`)) return;

    try {
      const res = await fetch(`/api/admin/admins/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        fetchAdmins();
      } else {
        alert(data.error || 'Помилка видалення');
      }
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setShowForm(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            Управління адмінами
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingAdmin(null);
                setShowForm(true);
              }}
              className="px-6 py-3 rounded-[10px] text-white font-bold uppercase transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'var(--font-unbounded)',
                background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
              }}
            >
              + Додати адміна
            </button>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              ← Назад
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {loading ? (
          <div className="text-center text-2xl">Завантаження...</div>
        ) : (
          <div className="bg-white rounded-[10px] shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#070707] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Username</th>
                  <th className="px-6 py-4 text-left font-bold">Email</th>
                  <th className="px-6 py-4 text-left font-bold">Створено</th>
                  <th className="px-6 py-4 text-right font-bold">Дії</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{admin.username}</td>
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(admin.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(admin)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-[10px] hover:bg-blue-600 transition-colors font-bold text-sm"
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => handleDelete(admin._id, admin.username)}
                          className="px-4 py-2 bg-red-500 text-white rounded-[10px] hover:bg-red-600 transition-colors font-bold text-sm"
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {admins.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                Немає адміністраторів
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <AdminForm
          admin={editingAdmin}
          onClose={() => {
            setShowForm(false);
            setEditingAdmin(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditingAdmin(null);
            fetchAdmins();
          }}
        />
      )}
    </div>
  );
}

// Форма для додавання/редагування адміна
function AdminForm({ 
  admin, 
  onClose, 
  onSave 
}: { 
  admin: Admin | null; 
  onClose: () => void; 
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    username: admin?.username || '',
    email: admin?.email || '',
    password: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Валідація
    if (!admin && !formData.password) {
      setError('Пароль обов\'язковий для нового адміна');
      setSaving(false);
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError('Пароль має містити мінімум 6 символів');
      setSaving(false);
      return;
    }

    try {
      const url = admin ? `/api/admin/admins/${admin._id}` : '/api/admin/admins';
      const method = admin ? 'PUT' : 'POST';

      const body: any = {
        username: formData.username,
        email: formData.email,
      };

      if (formData.password) {
        body.password = formData.password;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        onSave();
      } else {
        setError(data.error || 'Помилка збереження');
      }
    } catch (err) {
      setError('Щось пішло не так');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[10px] p-8 max-w-md w-full">
        <h2 
          className="text-3xl font-black mb-6 uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {admin ? 'Редагувати адміна' : 'Додати адміна'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Пароль {admin && '(залиште порожнім, щоб не міняти)'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FF4400] outline-none pr-12"
                placeholder={admin ? 'Новий пароль' : 'Мінімум 6 символів'}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#FF4400]"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
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
