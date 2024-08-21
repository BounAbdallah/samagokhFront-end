import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMaireComponent } from './dashboard-maire.component';

describe('DashboardMaireComponent', () => {
  let component: DashboardMaireComponent;
  let fixture: ComponentFixture<DashboardMaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
