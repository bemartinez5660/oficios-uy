export interface ServiceProvider {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  category: ServiceCategory;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  imageUrl?: string;
  isAvailable: boolean;
}

export enum ServiceCategory {
  ELECTRICIAN = 'electrician',
  PLUMBER = 'plumber',
  PAINTER = 'painter',
  CARPENTER = 'carpenter',
  CLEANER = 'cleaner',
  GARDENER = 'gardener',
  OTHER = 'other'
}