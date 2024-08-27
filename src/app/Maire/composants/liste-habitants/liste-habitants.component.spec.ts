import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHabitantsComponent } from './liste-habitants.component';

describe('ListeHabitantsComponent', () => {
  let component: ListeHabitantsComponent;
  let fixture: ComponentFixture<ListeHabitantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeHabitantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeHabitantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
