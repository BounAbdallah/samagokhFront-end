import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetPublierComponent } from './projet-publier.component';

describe('ProjetPublierComponent', () => {
  let component: ProjetPublierComponent;
  let fixture: ComponentFixture<ProjetPublierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetPublierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetPublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
