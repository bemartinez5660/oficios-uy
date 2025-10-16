import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceProviderService } from '../../core/services/service-provider-service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslocoModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private readonly serviceProviderService = inject(ServiceProviderService);
  
  protected readonly searchQuery = signal('');
  
  protected readonly displayedServices = computed(() => {
    const query = this.searchQuery().trim();
    if (query) {
      return this.serviceProviderService.searchServices(query).slice(0, 6);
    }
    return this.serviceProviderService.getServices().slice(0, 3);
  });

  protected updateSearch(value: string) {
    this.searchQuery.set(value);
  }
}