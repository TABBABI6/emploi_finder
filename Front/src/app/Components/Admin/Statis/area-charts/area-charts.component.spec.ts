import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaChartsComponent } from './area-charts.component';

describe('AreaChartsComponent', () => {
  let component: AreaChartsComponent;
  let fixture: ComponentFixture<AreaChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
