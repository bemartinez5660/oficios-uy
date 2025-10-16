import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../../core/services/auth.service';
import { getTranslocoModule } from '../../../test-helpers/transloco-testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, getTranslocoModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login and register links when not authenticated', () => {
    authService.isAuthenticated.set(false);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('a');
    const loginLink = Array.from(links).find((link: any) => link.getAttribute('routerLink') === '/auth/login');
    const registerLink = Array.from(links).find((link: any) => link.getAttribute('routerLink') === '/auth/register');
    
    expect(loginLink).toBeTruthy();
    expect(registerLink).toBeTruthy();
  });

  it('should display profile link and logout button when authenticated', () => {
    authService.isAuthenticated.set(true);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('a');
    const profileLink = Array.from(links).find((link: any) => link.getAttribute('routerLink') === '/profile');
    const logoutButton = compiled.querySelector('button');
    
    expect(profileLink).toBeTruthy();
    expect(logoutButton).toBeTruthy();
  });
});