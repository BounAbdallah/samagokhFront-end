import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetHabitantCommuneComponent } from './projet-habitant-commune.component';

describe('ProjetHabitantCommuneComponent', () => {
  let component: ProjetHabitantCommuneComponent;
  let fixture: ComponentFixture<ProjetHabitantCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetHabitantCommuneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetHabitantCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
