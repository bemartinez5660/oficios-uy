import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, BookingRequest } from '../models/booking.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly http = inject(HttpClient);

  createBooking(bookingData: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(`${environment.apiUrl}/bookings`, bookingData, {
      withCredentials: true
    });
  }

  getUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${environment.apiUrl}/bookings/user`, {
      withCredentials: true
    });
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${environment.apiUrl}/bookings/${id}`, {
      withCredentials: true
    });
  }
}