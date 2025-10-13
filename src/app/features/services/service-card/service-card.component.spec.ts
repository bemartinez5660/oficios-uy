import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { ServiceCardComponent } from './service-card.component';
import { ServiceProvider, ServiceCategory } from '../../../core/models/service.model';
import { getTranslocoModule } from '../../../test-helpers/transloco-testing';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;

  const mockService: ServiceProvider = {
    id: '1',
    userId: '1',
    businessName: 'Test Service',
    description: 'Test Description',
    category: ServiceCategory.PLUMBER,
    rating: 4.5,
    reviewCount: 10,
    hourlyRate: 1000,
    location: 'Montevideo',
    imageUrl: 'test.jpg',
    isAvailable: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardComponent, getTranslocoModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('service', mockService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display service information', () => {
    expect(component.service()).toEqual(mockService);
  });
});
