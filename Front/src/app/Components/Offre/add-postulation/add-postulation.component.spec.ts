import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostulationComponent } from './add-postulation.component';

describe('AddPostulationComponent', () => {
  let component: AddPostulationComponent;
  let fixture: ComponentFixture<AddPostulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
