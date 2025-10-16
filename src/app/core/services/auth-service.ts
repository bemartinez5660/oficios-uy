import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly currentUserSignal = signal<User | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = signal(false);

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}${environment.v1}/auth/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this.currentUserSignal.set(response.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}${environment.v1}/auth/register`, userData, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this.currentUserSignal.set(response.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${environment.v1}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.currentUserSignal.set(null);
        this.isAuthenticated.set(false);
        this.router.navigate(['/']);
      })
    );
  }

  checkAuthStatus(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${environment.v1}/auth/me`, {
      withCredentials: true
    }).pipe(
      tap(user => {
        this.currentUserSignal.set(user);
        this.isAuthenticated.set(true);
      })
    );
  }
}
