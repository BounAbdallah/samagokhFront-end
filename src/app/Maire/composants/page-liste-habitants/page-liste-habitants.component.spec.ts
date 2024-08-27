import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListeHabitantsComponent } from './page-liste-habitants.component';

describe('PageListeHabitantsComponent', () => {
  let component: PageListeHabitantsComponent;
  let fixture: ComponentFixture<PageListeHabitantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListeHabitantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageListeHabitantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
