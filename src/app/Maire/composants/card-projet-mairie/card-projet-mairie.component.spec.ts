import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProjetMairieComponent } from './card-projet-mairie.component';

describe('CardProjetMairieComponent', () => {
  let component: CardProjetMairieComponent;
  let fixture: ComponentFixture<CardProjetMairieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProjetMairieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardProjetMairieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
