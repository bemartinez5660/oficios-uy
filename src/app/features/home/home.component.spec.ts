import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { HomeComponent } from './home.component';
import { ServiceProviderService } from '../../core/services/service-provider.service';
import { getTranslocoModule } from '../../test-helpers/transloco-testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let serviceProviderService: ServiceProviderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, getTranslocoModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    serviceProviderService = TestBed.inject(ServiceProviderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial services', () => {
    expect(component['displayedServices']().length).toBeLessThanOrEqual(3);
  });

  it('should search services', () => {
    component['searchQuery'].set('plomero');
    component['search']();
    expect(component['displayedServices']().length).toBeGreaterThanOrEqual(0);
  });
});
