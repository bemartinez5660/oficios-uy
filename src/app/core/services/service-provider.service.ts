import { Injectable, signal } from '@angular/core';
import { ServiceProvider, ServiceCategory } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  private servicesSignal = signal<ServiceProvider[]>([
    {
      id: '1',
      userId: '1',
      businessName: 'ElectroTech UY',
      description: 'Servicios eléctricos profesionales con más de 10 años de experiencia',
      category: ServiceCategory.ELECTRICIAN,
      rating: 4.8,
      reviewCount: 45,
      hourlyRate: 1200,
      location: 'Montevideo',
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300',
      isAvailable: true
    },
    {
      id: '2',
      userId: '2',
      businessName: 'Plomería Rápida',
      description: 'Soluciones de plomería 24/7. Emergencias y mantenimiento',
      category: ServiceCategory.PLUMBER,
      rating: 4.6,
      reviewCount: 32,
      hourlyRate: 1000,
      location: 'Canelones',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
      isAvailable: true
    },
    {
      id: '3',
      userId: '3',
      businessName: 'Pinturas del Sur',
      description: 'Pintura interior y exterior. Trabajos de calidad garantizada',
      category: ServiceCategory.PAINTER,
      rating: 4.9,
      reviewCount: 67,
      hourlyRate: 800,
      location: 'Maldonado',
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300',
      isAvailable: true
    }
  ]);

  readonly services = this.servicesSignal.asReadonly();

  getServices() {
    return this.services();
  }

  getServiceById(id: string) {
    return this.services().find(service => service.id === id);
  }

  searchServices(query: string) {
    const filtered = this.services().filter(service => 
      service.businessName.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase()) ||
      service.category.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  }
}