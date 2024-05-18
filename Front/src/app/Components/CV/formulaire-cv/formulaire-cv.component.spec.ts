import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCVComponent } from './formulaire-cv.component';

describe('FormulaireCVComponent', () => {
  let component: FormulaireCVComponent;
  let fixture: ComponentFixture<FormulaireCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireCVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
