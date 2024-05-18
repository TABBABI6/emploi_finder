import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaChartsBasicComponent } from './area-charts-basic.component';

describe('AreaChartsBasicComponent', () => {
  let component: AreaChartsBasicComponent;
  let fixture: ComponentFixture<AreaChartsBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaChartsBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaChartsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
