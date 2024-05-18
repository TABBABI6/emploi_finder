import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationCandidatComponent } from './postulation-candidat.component';

describe('PostulationCandidatComponent', () => {
  let component: PostulationCandidatComponent;
  let fixture: ComponentFixture<PostulationCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulationCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
