import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/service-list/service-list.component').then(m => m.ServiceListComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/user/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/booking-form/booking-form.component').then(m => m.BookingFormComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
]