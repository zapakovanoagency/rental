import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPricing {
  period: string;
  price: string;
}

export interface ICar extends Document {
  name: string;
  image: string;
  tags: string[];
  deposit: string;
  pricing: IPricing[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PricingSchema = new Schema<IPricing>({
  period: { type: String, required: true },
  price: { type: String, required: true }
}, { _id: false });

const CarSchema = new Schema<ICar>({
  name: { 
    type: String, 
    required: [true, 'Назва автомобіля обов\'язкова'],
    trim: true
  },
  image: { 
    type: String, 
    required: [true, 'Зображення обов\'язкове']
  },
  tags: [{ 
    type: String,
    trim: true
  }],
  deposit: { 
    type: String, 
    required: [true, 'Застава обов\'язкова']
  },
  pricing: {
    type: [PricingSchema],
    required: [true, 'Ціноутворення обов\'язкове'],
    validate: {
      validator: function(v: IPricing[]) {
        return v && v.length > 0;
      },
      message: 'Має бути хоча б один період оренди'
    }
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

// Перевірка чи модель вже зареєстрована
const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);

export default Car;
