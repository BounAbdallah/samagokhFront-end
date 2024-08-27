import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListeProjetSoumisComponent } from './page-liste-projet-soumis.component';

describe('PageListeProjetSoumisComponent', () => {
  let component: PageListeProjetSoumisComponent;
  let fixture: ComponentFixture<PageListeProjetSoumisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListeProjetSoumisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageListeProjetSoumisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
