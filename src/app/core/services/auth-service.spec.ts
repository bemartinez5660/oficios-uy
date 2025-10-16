import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user and set authentication state', () => {
    const mockResponse = {
      user: {
        id: '1',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        isServiceProvider: false,
        createdAt: new Date()
      },
      token: 'mock-token'
    };

    service.login({ email: 'test@test.com', password: 'password' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(service.isAuthenticated()).toBe(true);
      expect(service.currentUser()).toEqual(mockResponse.user);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${environment.v1}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBe(true);
    req.flush(mockResponse);
  });

  it('should register user and set authentication state', () => {
    const mockResponse = {
      user: {
        id: '1',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        isServiceProvider: false,
        createdAt: new Date()
      },
      token: 'mock-token'
    };

    service.register({
      email: 'test@test.com',
      password: 'password',
      firstName: 'Test',
      lastName: 'User',
      isServiceProvider: false
    }).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(service.isAuthenticated()).toBe(true);
      expect(service.currentUser()).toEqual(mockResponse.user);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${environment.v1}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBe(true);
    req.flush(mockResponse);
  });

  it('should logout user and clear authentication state', () => {
    service.logout().subscribe(() => {
      expect(service.isAuthenticated()).toBe(false);
      expect(service.currentUser()).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${environment.v1}/auth/logout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBe(true);
    req.flush({});
  });

  it('should check auth status and set user', () => {
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      isServiceProvider: false,
      createdAt: new Date()
    };

    service.checkAuthStatus().subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(service.isAuthenticated()).toBe(true);
      expect(service.currentUser()).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${environment.v1}/auth/me`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);
    req.flush(mockUser);
  });
});