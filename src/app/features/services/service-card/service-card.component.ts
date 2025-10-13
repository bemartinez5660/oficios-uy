import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceProvider } from '../../../core/models/service.model';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink, TranslocoModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCardComponent {
  readonly service = input.required<ServiceProvider>();
}