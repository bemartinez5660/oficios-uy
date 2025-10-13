export interface Booking {
  id: string;
  userId: string;
  serviceProviderId: string;
  description: string;
  scheduledDate: Date;
  status: BookingStatus;
  estimatedHours: number;
  totalAmount?: number;
  createdAt: Date;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface BookingRequest {
  serviceProviderId: string;
  description: string;
  scheduledDate: Date;
  estimatedHours: number;
}