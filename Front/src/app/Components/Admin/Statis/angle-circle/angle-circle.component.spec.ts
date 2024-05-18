import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngleCircleComponent } from './angle-circle.component';

describe('AngleCircleComponent', () => {
  let component: AngleCircleComponent;
  let fixture: ComponentFixture<AngleCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngleCircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngleCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
