import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleOneComponent } from './modele-one.component';

describe('ModeleOneComponent', () => {
  let component: ModeleOneComponent;
  let fixture: ComponentFixture<ModeleOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
