import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderSuppressionPostulationComponent } from './valider-suppression-postulation.component';

describe('ValiderSuppressionPostulationComponent', () => {
  let component: ValiderSuppressionPostulationComponent;
  let fixture: ComponentFixture<ValiderSuppressionPostulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderSuppressionPostulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderSuppressionPostulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
