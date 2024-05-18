import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestOffreComponent } from './add-test-offre.component';

describe('AddTestOffreComponent', () => {
  let component: AddTestOffreComponent;
  let fixture: ComponentFixture<AddTestOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
