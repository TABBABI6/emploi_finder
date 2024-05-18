import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherTestComponent } from './afficher-test.component';

describe('AfficherTestComponent', () => {
  let component: AfficherTestComponent;
  let fixture: ComponentFixture<AfficherTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
