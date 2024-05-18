import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderSuppressionUserComponent } from './valider-suppression-user.component';

describe('ValiderSuppressionUserComponent', () => {
  let component: ValiderSuppressionUserComponent;
  let fixture: ComponentFixture<ValiderSuppressionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderSuppressionUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderSuppressionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
