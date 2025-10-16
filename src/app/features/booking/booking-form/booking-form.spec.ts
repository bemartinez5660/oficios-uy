import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { BookingFormComponent } from './booking-form.component';
import { getTranslocoModule } from '../../../test-helpers/transloco-testing';

describe('BookingFormComponent', () => {
  let component: BookingFormComponent;
  let fixture: ComponentFixture<BookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFormComponent, getTranslocoModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component['bookingForm'].valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component['bookingForm'];
    expect(form.get('serviceProviderId')?.hasError('required')).toBeTruthy();
    expect(form.get('description')?.hasError('required')).toBeTruthy();
    expect(form.get('scheduledDate')?.hasError('required')).toBeTruthy();
  });

  it('should validate minimum hours', () => {
    const hoursControl = component['bookingForm'].get('estimatedHours');
    hoursControl?.setValue(0);
    expect(hoursControl?.hasError('min')).toBeTruthy();
  });
});
