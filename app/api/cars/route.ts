import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

// GET - отримати всі автомобілі
export async function GET() {
  try {
    await connectDB();
    const cars = await Car.find({ isActive: true }).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: cars 
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
    
    const car = await Car.create(body);
    
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
