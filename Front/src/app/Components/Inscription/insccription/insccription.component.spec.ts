import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsccriptionComponent } from './insccription.component';

describe('InsccriptionComponent', () => {
  let component: InsccriptionComponent;
  let fixture: ComponentFixture<InsccriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsccriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsccriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
