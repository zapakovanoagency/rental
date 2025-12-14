import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

// POST - оновити порядок автомобілів
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { carIds } = await request.json();
    
    if (!Array.isArray(carIds)) {
      return NextResponse.json({ 
        success: false, 
        error: 'carIds має бути масивом' 
      }, { status: 400 });
    }

    // Оновлюємо order для кожного автомобіля
    await Promise.all(
      carIds.map((id, index) => 
        Car.updateOne({ _id: id }, { $set: { order: index } })
      )
    );
    
    // Отримуємо оновлені дані для логування
    const updatedCars = await Car.find({ _id: { $in: carIds } })
      .select('name order')
      .sort({ order: 1 });
    
    console.log('✅ Оновлено порядок для', updatedCars.length, 'автомобілів:');
    updatedCars.forEach((car) => {
      console.log(`  ${car.name} - order: ${car.order}`);
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Порядок оновлено',
      updated: updatedCars.length
    });
  } catch (error: any) {
    console.error('❌ Помилка оновлення порядку:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
