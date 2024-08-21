import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordHabitantComponent } from './dashbaord-habitant.component';

describe('DashbaordHabitantComponent', () => {
  let component: DashbaordHabitantComponent;
  let fixture: ComponentFixture<DashbaordHabitantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbaordHabitantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbaordHabitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
