import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ServiceProviderService } from './service-provider.service';

describe('ServiceProviderService', () => {
  let service: ServiceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), ServiceProviderService]
    });
    service = TestBed.inject(ServiceProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all services', () => {
    const services = service.getServices();
    expect(services.length).toBeGreaterThan(0);
  });

  it('should find service by id', () => {
    const service1 = service.getServiceById('1');
    expect(service1).toBeTruthy();
    expect(service1?.id).toBe('1');
  });

  it('should search services by query', () => {
    const results = service.searchServices('plomería');
    expect(results.length).toBeGreaterThan(0);
  });
});
