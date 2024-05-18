import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetancesComponent } from './competances.component';

describe('CompetancesComponent', () => {
  let component: CompetancesComponent;
  let fixture: ComponentFixture<CompetancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
