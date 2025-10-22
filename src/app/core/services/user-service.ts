import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${environment.v1}/users/profile`, {
      withCredentials: true
    });
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}${environment.v1}/users/profile`, userData, {
      withCredentials: true
    });
  }
}
