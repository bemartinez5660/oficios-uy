import { Component, inject, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookingService } from '../../../core/services/booking-service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-booking-form',
  imports: [ReactiveFormsModule, TranslocoModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingForm {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  protected readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  protected readonly bookingForm = this.fb.group({
    serviceProviderId: ['', Validators.required],
    description: ['', Validators.required],
    scheduledDate: ['', Validators.required],
    estimatedHours: [1, [Validators.required, Validators.min(1)]]
  });

  private queryParams = toSignal(this.route.queryParams);

  constructor() {
    effect(() => {
      const params = this.queryParams();
      if (params?.['serviceId']) {
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
