import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderSuppressionProfilComponent } from './valider-suppression-profil.component';

describe('ValiderSuppressionProfilComponent', () => {
  let component: ValiderSuppressionProfilComponent;
  let fixture: ComponentFixture<ValiderSuppressionProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderSuppressionProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderSuppressionProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
