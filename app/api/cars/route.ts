import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

// GET - отримати всі автомобілі
export async function GET() {
  try {
    await connectDB();
    const cars = await Car.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    
    console.log('GET /api/cars - повертаємо', cars.length, 'автомобілів');
    cars.slice(0, 5).forEach(car => {
      console.log(`  ${car.name} - order: ${car.order}`);
    });
    
    return NextResponse.json({ 
      success: true, 
      data: cars 
    }, { 
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// POST - створити новий автомобіль
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Знаходимо максимальне значення order
    const maxOrderCar = await Car.findOne().sort({ order: -1 }).select('order');
    const nextOrder = maxOrderCar ? (maxOrderCar.order || 0) + 1 : 0;
    
    // Створюємо автомобіль з правильним order
    const car = await Car.create({
      ...body,
      order: nextOrder
    });
    
    return NextResponse.json({ 
      success: true, 
      data: car 
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}
