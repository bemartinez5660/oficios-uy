import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProfileFormComponent } from './profile-form.component';
import { User } from '../../../core/models/user.model';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  const mockUser: User = {
    id: '1',
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'User',
    isServiceProvider: false,
    createdAt: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with user data', () => {
    const form = component['profileForm'];
    expect(form.get('firstName')?.value).toBe(mockUser.firstName);
    expect(form.get('lastName')?.value).toBe(mockUser.lastName);
  });

  it('should validate required fields', () => {
    const form = component['profileForm'];
    form.patchValue({ firstName: '', lastName: '' });
    expect(form.valid).toBeFalsy();
  });
});
