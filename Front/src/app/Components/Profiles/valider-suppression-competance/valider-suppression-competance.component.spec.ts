import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderSuppressionCompetanceComponent } from './valider-suppression-competance.component';

describe('ValiderSuppressionCompetanceComponent', () => {
  let component: ValiderSuppressionCompetanceComponent;
  let fixture: ComponentFixture<ValiderSuppressionCompetanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderSuppressionCompetanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderSuppressionCompetanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
