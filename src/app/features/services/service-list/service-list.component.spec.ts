import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ServiceListComponent } from './service-list.component';
import { getTranslocoModule } from '../../../test-helpers/transloco-testing';

describe('ServiceListComponent', () => {
  let component: ServiceListComponent;
  let fixture: ComponentFixture<ServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceListComponent, getTranslocoModule()],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
