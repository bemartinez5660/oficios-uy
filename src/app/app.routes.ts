import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/service-list/service-list').then(m => m.ServiceList)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/user/profile/profile').then(m => m.Profile),
    canActivate: [authGuard]
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/booking-form/booking-form').then(m => m.BookingForm),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
]