import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProjetsHabitantComponent } from './liste-projets-habitant.component';

describe('ListeProjetsHabitantComponent', () => {
  let component: ListeProjetsHabitantComponent;
  let fixture: ComponentFixture<ListeProjetsHabitantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeProjetsHabitantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeProjetsHabitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
