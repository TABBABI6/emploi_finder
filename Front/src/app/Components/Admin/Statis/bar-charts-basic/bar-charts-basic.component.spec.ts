import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartsBasicComponent } from './bar-charts-basic.component';

describe('BarChartsBasicComponent', () => {
  let component: BarChartsBasicComponent;
  let fixture: ComponentFixture<BarChartsBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartsBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
