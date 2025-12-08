import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

// GET - отримати всіх адмінів
export async function GET(request: NextRequest) {
  try {
    // Перевіряємо авторизацію
    const adminId = request.cookies.get('admin-session')?.value;
    if (!adminId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Перевіряємо чи існує адмін
    const currentAdmin = await Admin.findById(adminId);
    if (!currentAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Отримуємо всіх адмінів (без паролів)
    const admins = await Admin.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: admins,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - створити нового адміна
export async function POST(request: NextRequest) {
  try {
    // Перевіряємо авторизацію
    const adminId = request.cookies.get('admin-session')?.value;
    if (!adminId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Всі поля обов\'язкові' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Пароль має містити мінімум 6 символів' },
        { status: 400 }
      );
    }

    // Створюємо нового адміна
    const newAdmin = await Admin.create({
      username,
      email,
      password, // Автоматично хешується в моделі
    });

    return NextResponse.json({
      success: true,
      data: {
        _id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        createdAt: newAdmin.createdAt,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Користувач з таким username або email вже існує' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
