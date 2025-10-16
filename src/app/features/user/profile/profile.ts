import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ProfileForm } from '../profile-form/profile-form';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-profile',
  imports: [ProfileForm, TranslocoModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile {
  protected readonly authService = inject(AuthService);
  protected readonly isEditing = signal(false);

  protected onSaved() {
    this.isEditing.set(false);
  }
}
