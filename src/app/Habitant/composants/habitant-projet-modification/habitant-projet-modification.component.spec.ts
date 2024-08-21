import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitantProjetModificationComponent } from './habitant-projet-modification.component';

describe('HabitantProjetModificationComponent', () => {
  let component: HabitantProjetModificationComponent;
  let fixture: ComponentFixture<HabitantProjetModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitantProjetModificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitantProjetModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
