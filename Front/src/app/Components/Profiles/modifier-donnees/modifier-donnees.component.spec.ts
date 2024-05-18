import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDonneesComponent } from './modifier-donnees.component';

describe('ModifierDonneesComponent', () => {
  let component: ModifierDonneesComponent;
  let fixture: ComponentFixture<ModifierDonneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierDonneesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
