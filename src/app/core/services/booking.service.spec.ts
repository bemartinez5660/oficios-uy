import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { BookingService } from './booking.service';
import { environment } from '../../../environments/environment';

describe('BookingService', () => {
  let service: BookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        BookingService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create booking', () => {
    const mockBooking = {
      serviceProviderId: '1',
      description: 'Test',
      scheduledDate: new Date(),
      estimatedHours: 2
    };

    service.createBooking(mockBooking).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/bookings`);
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBe(true);
  });
});
