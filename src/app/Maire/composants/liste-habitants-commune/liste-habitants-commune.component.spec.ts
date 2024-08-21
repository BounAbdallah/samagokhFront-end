import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHabitantsCommuneComponent } from './liste-habitants-commune.component';

describe('ListeHabitantsCommuneComponent', () => {
  let component: ListeHabitantsCommuneComponent;
  let fixture: ComponentFixture<ListeHabitantsCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeHabitantsCommuneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeHabitantsCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
