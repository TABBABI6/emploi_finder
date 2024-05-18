import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderSuppressionComponent } from './valider-suppression.component';

describe('ValiderSuppressionComponent', () => {
  let component: ValiderSuppressionComponent;
  let fixture: ComponentFixture<ValiderSuppressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderSuppressionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderSuppressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
