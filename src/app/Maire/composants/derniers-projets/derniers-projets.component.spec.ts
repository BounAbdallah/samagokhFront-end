import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerniersProjetsComponent } from './derniers-projets.component';

describe('DerniersProjetsComponent', () => {
  let component: DerniersProjetsComponent;
  let fixture: ComponentFixture<DerniersProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DerniersProjetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DerniersProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
