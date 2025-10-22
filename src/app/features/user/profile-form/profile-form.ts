import {
  Component,
  inject,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
  effect,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileForm {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);

  readonly user = input.required<User>();
  readonly cancel = output<void>();
  readonly saved = output<void>();

  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
  });

  constructor() {
    effect(() => {
      const userData = this.user();
      if (userData) {
        this.profileForm.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone || '',
        });
      }
    });
  }

  protected onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      this._userService.updateProfile(userData).subscribe({
        next: () => {
          this.saved.emit();
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Error al actualizar perfil');
          this.isLoading.set(false);
        },
      });
    }
  }
}
