import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-booking-form',
  imports: [ReactiveFormsModule, TranslocoModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);

  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  protected readonly bookingForm = this.fb.group({
    serviceProviderId: ['', Validators.required],
    description: ['', Validators.required],
    scheduledDate: ['', Validators.required],
    estimatedHours: [1, [Validators.required, Validators.min(1)]]
  });

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['serviceId']) {
        this.bookingForm.patchValue({ serviceProviderId: params['serviceId'] });
      }
    });
  }

  protected onSubmit() {
    if (this.bookingForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const formValue = this.bookingForm.value;
      const bookingData = {
        ...formValue,
        scheduledDate: new Date(formValue.scheduledDate!)
      };

      this.bookingService.createBooking(bookingData as any).subscribe({
        next: () => {
          this.successMessage.set('Solicitud enviada exitosamente');
          this.bookingForm.reset();
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Error al enviar solicitud. Intenta nuevamente.');
          this.isLoading.set(false);
        }
      });
    }
  }
}
