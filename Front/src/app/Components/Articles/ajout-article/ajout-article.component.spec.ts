import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutArticleComponent } from './ajout-article.component';

describe('AjoutArticleComponent', () => {
  let component: AjoutArticleComponent;
  let fixture: ComponentFixture<AjoutArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
