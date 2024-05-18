import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresRecommanderComponent } from './offres-recommander.component';

describe('OffresRecommanderComponent', () => {
  let component: OffresRecommanderComponent;
  let fixture: ComponentFixture<OffresRecommanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffresRecommanderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffresRecommanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
