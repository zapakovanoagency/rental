import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdminLog from '@/models/AdminLog';

interface LogData {
  adminId: string;
  adminUsername: string;
  action: 'login' | 'logout' | 'car_create' | 'car_update' | 'car_delete' | 'image_upload' | 'image_delete';
  details?: string;
  status?: 'success' | 'failed';
}

export async function createLog(
  request: NextRequest,
  data: LogData
) {
  try {
    await connectDB();

    // Отримуємо IP адресу
    const ipAddress = 
      request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown';

    // Отримуємо User Agent
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await AdminLog.create({
      adminId: data.adminId,
      adminUsername: data.adminUsername,
      action: data.action,
      details: data.details || '',
      ipAddress,
      userAgent,
      status: data.status || 'success',
    });
  } catch (error) {
    console.error('Error creating admin log:', error);
    // Не кидаємо помилку, щоб не блокувати основну операцію
  }
}

// Хелпер для логування невдалих спроб входу
export async function logFailedLogin(
  request: NextRequest,
  username: string,
  reason: string
) {
  try {
    await connectDB();

    const ipAddress = 
      request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown';

    const userAgent = request.headers.get('user-agent') || 'unknown';

    await AdminLog.create({
      adminId: '000000000000000000000000', // Dummy ID для невдалих спроб
      adminUsername: username,
      action: 'login',
      details: reason,
      ipAddress,
      userAgent,
      status: 'failed',
    });
  } catch (error) {
    console.error('Error logging failed login:', error);
  }
}
