import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherOffresOptionCarrierComponent } from './afficher-offres-option-carrier.component';

describe('AfficherOffresOptionCarrierComponent', () => {
  let component: AfficherOffresOptionCarrierComponent;
  let fixture: ComponentFixture<AfficherOffresOptionCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherOffresOptionCarrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherOffresOptionCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
