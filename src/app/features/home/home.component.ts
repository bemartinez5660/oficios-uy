import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceProviderService } from '../../core/services/service-provider.service';
import { ServiceProvider } from '../../core/models/service.model';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, TranslocoModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private serviceProviderService = inject(ServiceProviderService);
  
  protected searchQuery = signal('');
  protected displayedServices = signal<ServiceProvider[]>([]);

  constructor() {
    this.displayedServices.set(this.serviceProviderService.getServices().slice(0, 3));
  }

  protected search() {
    const query = this.searchQuery();
    if (query.trim()) {
      const results = this.serviceProviderService.searchServices(query);
      this.displayedServices.set(results.slice(0, 6));
    } else {
      this.displayedServices.set(this.serviceProviderService.getServices().slice(0, 3));
    }
  }
}