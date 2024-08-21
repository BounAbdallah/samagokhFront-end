import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProjetsMaireComponent } from './liste-projets-maire.component';

describe('ListeProjetsMaireComponent', () => {
  let component: ListeProjetsMaireComponent;
  let fixture: ComponentFixture<ListeProjetsMaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeProjetsMaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeProjetsMaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
