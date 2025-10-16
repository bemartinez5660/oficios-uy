import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        UserService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user profile', () => {
    service.getProfile().subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/users/profile`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);
  });

  it('should update user profile', () => {
    const userData = { firstName: 'Test', lastName: 'User' };

    service.updateProfile(userData).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/users/profile`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.withCredentials).toBe(true);
  });
});
