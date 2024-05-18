import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherOffresComponent } from './afficher-offres.component';

describe('AfficherOffresComponent', () => {
  let component: AfficherOffresComponent;
  let fixture: ComponentFixture<AfficherOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherOffresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
