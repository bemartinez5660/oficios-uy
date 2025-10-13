import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ServiceProviderService } from '../../../core/services/service-provider.service';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-service-list',
  imports: [ServiceCardComponent, TranslocoModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceListComponent {
  protected serviceProviderService = inject(ServiceProviderService);
}