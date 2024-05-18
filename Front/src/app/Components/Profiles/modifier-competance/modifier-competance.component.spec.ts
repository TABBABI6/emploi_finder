import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompetanceComponent } from './modifier-competance.component';

describe('ModifierCompetanceComponent', () => {
  let component: ModifierCompetanceComponent;
  let fixture: ComponentFixture<ModifierCompetanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCompetanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCompetanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
