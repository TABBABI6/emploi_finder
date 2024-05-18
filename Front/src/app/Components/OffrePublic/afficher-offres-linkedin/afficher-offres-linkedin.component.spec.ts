import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherOffresLinkedinComponent } from './afficher-offres-linkedin.component';

describe('AfficherOffresLinkedinComponent', () => {
  let component: AfficherOffresLinkedinComponent;
  let fixture: ComponentFixture<AfficherOffresLinkedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherOffresLinkedinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherOffresLinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
