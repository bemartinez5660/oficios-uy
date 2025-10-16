import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ServiceProviderService } from '../../../core/services/service-provider-service';
import { ServiceCard } from '../service-card/service-card';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-service-list',
  imports: [ServiceCard, TranslocoModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceList {
  protected readonly serviceProviderService = inject(ServiceProviderService);
}