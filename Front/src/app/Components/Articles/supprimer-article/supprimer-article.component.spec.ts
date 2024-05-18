import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerArticleComponent } from './supprimer-article.component';

describe('SupprimerArticleComponent', () => {
  let component: SupprimerArticleComponent;
  let fixture: ComponentFixture<SupprimerArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
