import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserTestComponent } from './passer-test.component';

describe('PasserTestComponent', () => {
  let component: PasserTestComponent;
  let fixture: ComponentFixture<PasserTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasserTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasserTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
