import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileFormComponent, TranslocoModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  protected authService = inject(AuthService);
  protected isEditing = signal(false);

  protected onSaved() {
    this.isEditing.set(false);
  }
}
