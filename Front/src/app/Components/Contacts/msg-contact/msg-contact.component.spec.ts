import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgContactComponent } from './msg-contact.component';

describe('MsgContactComponent', () => {
  let component: MsgContactComponent;
  let fixture: ComponentFixture<MsgContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
