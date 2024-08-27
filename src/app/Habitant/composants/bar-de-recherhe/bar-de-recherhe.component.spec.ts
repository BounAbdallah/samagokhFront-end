import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDeRecherheComponent } from './bar-de-recherhe.component';

describe('BarDeRecherheComponent', () => {
  let component: BarDeRecherheComponent;
  let fixture: ComponentFixture<BarDeRecherheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarDeRecherheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarDeRecherheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
