import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { RegisterComponent } from './register.component';
import { getTranslocoModule } from '../../../test-helpers/transloco-testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, getTranslocoModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component['registerForm'].valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component['registerForm'];
    expect(form.get('firstName')?.hasError('required')).toBeTruthy();
    expect(form.get('lastName')?.hasError('required')).toBeTruthy();
    expect(form.get('email')?.hasError('required')).toBeTruthy();
    expect(form.get('password')?.hasError('required')).toBeTruthy();
  });
});
