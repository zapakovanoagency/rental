import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdminLog extends Document {
  adminId: mongoose.Types.ObjectId;
  adminUsername: string;
  action: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'success' | 'failed';
  createdAt: Date;
}

const AdminLogSchema = new Schema<IAdminLog>({
  adminId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Admin',
    required: true 
  },
  adminUsername: { 
    type: String, 
    required: true 
  },
  action: { 
    type: String, 
    required: true,
    enum: [
      'login', 
      'logout', 
      'car_create', 
      'car_update', 
      'car_delete',
      'image_upload',
      'image_delete'
    ]
  },
  details: { 
    type: String 
  },
  ipAddress: { 
    type: String 
  },
  userAgent: { 
    type: String 
  },
  status: { 
    type: String,
    enum: ['success', 'failed'],
    default: 'success'
  }
}, {
  timestamps: true
});

// Індекси для швидкого пошуку
AdminLogSchema.index({ adminId: 1, createdAt: -1 });
AdminLogSchema.index({ action: 1, createdAt: -1 });
AdminLogSchema.index({ createdAt: -1 });

const AdminLog: Model<IAdminLog> = mongoose.models.AdminLog || mongoose.model<IAdminLog>('AdminLog', AdminLogSchema);

export default AdminLog;
