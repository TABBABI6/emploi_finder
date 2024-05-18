import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionRecruteurComponent } from './inscription-recruteur.component';

describe('InscriptionRecruteurComponent', () => {
  let component: InscriptionRecruteurComponent;
  let fixture: ComponentFixture<InscriptionRecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionRecruteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
