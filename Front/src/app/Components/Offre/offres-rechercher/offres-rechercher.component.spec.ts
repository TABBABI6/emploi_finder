import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresRechercherComponent } from './offres-rechercher.component';

describe('OffresRechercherComponent', () => {
  let component: OffresRechercherComponent;
  let fixture: ComponentFixture<OffresRechercherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffresRechercherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffresRechercherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
