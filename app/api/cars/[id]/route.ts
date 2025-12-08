import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

// GET - отримати один автомобіль
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const car = await Car.findById(params.id);
    
    if (!car) {
      return NextResponse.json({ 
        success: false, 
        error: 'Автомобіль не знайдено' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: car 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// PUT - оновити автомобіль
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const car = await Car.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!car) {
      return NextResponse.json({ 
        success: false, 
        error: 'Автомобіль не знайдено' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: car 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}

// DELETE - видалити автомобіль
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const car = await Car.findByIdAndDelete(params.id);
    
    if (!car) {
      return NextResponse.json({ 
        success: false, 
        error: 'Автомобіль не знайдено' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Автомобіль успішно видалено' 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
