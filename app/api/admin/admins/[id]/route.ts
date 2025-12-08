import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

// PUT - оновити адміна (змінити пароль)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { password, username, email } = await request.json();

    const updateData: any = {};
    
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    
    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          { success: false, error: 'Пароль має містити мінімум 6 символів' },
          { status: 400 }
        );
      }
      updateData.password = password;
    }

    const admin = await Admin.findById(params.id);
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Адміна не знайдено' },
        { status: 404 }
      );
    }

    // Оновлюємо дані
    Object.assign(admin, updateData);
    await admin.save(); // Це викличе pre-save hook для хешування пароля

    return NextResponse.json({
      success: true,
      data: {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Username або email вже використовується' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - видалити адміна
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Перевіряємо авторизацію
    const adminId = request.cookies.get('admin-session')?.value;
    if (!adminId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Перевіряємо чи не намагається видалити себе
    if (adminId === params.id) {
      return NextResponse.json(
        { success: false, error: 'Ви не можете видалити себе' },
        { status: 400 }
      );
    }

    await connectDB();

    const admin = await Admin.findByIdAndDelete(params.id);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Адміна не знайдено' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Адміна успішно видалено',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
