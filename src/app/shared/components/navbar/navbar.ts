import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslocoModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {
  protected readonly authService = inject(AuthService);

  protected logout() {
    this.authService.logout().subscribe();
  }
}