import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleTwoComponent } from './modele-two.component';

describe('ModeleTwoComponent', () => {
  let component: ModeleTwoComponent;
  let fixture: ComponentFixture<ModeleTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
