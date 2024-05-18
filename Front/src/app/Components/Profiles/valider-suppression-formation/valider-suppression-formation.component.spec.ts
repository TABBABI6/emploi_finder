import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderSuppressionFormationComponent } from './valider-suppression-formation.component';

describe('ValiderSuppressionFormationComponent', () => {
  let component: ValiderSuppressionFormationComponent;
  let fixture: ComponentFixture<ValiderSuppressionFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderSuppressionFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderSuppressionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
