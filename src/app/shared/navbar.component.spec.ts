import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../core/services/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
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

  it('should display login link when not authenticated', () => {
    authService.isAuthenticated.set(false);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const loginLink = compiled.querySelector('a[href*="login"]');
    expect(loginLink).toBeTruthy();
  });

  it('should display logout button when authenticated', () => {
    authService.isAuthenticated.set(true);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const logoutButton = compiled.querySelector('button');
    expect(logoutButton?.textContent).toContain('Cerrar Sesión');
  });
});