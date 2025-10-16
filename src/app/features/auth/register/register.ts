import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { TranslocoModule } from '@jsverse/transloco';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, TranslocoModule, MatCardModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    isServiceProvider: [false]
  });

  protected onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      this.authService.register(this.registerForm.value as any).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage.set('Error al registrar. Intenta nuevamente.');
          this.isLoading.set(false);
        }
      });
    }
  }
}
