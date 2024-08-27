import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProjetSoumisComponent } from './liste-projet-soumis.component';

describe('ListeProjetSoumisComponent', () => {
  let component: ListeProjetSoumisComponent;
  let fixture: ComponentFixture<ListeProjetSoumisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeProjetSoumisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeProjetSoumisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
