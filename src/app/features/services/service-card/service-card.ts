import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceProvider } from '../../../core/models/service.model';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink, TranslocoModule],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCard {
  readonly service = input.required<ServiceProvider>();
}