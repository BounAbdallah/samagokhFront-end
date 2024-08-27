import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunesCrudComponent } from './communes-crud.component';

describe('CommunesCrudComponent', () => {
  let component: CommunesCrudComponent;
  let fixture: ComponentFixture<CommunesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunesCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
