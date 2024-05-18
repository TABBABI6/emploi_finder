import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherOffresPublicComponent } from './afficher-offres-public.component';

describe('AfficherOffresPublicComponent', () => {
  let component: AfficherOffresPublicComponent;
  let fixture: ComponentFixture<AfficherOffresPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherOffresPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherOffresPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
