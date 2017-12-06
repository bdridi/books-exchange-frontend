import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAbookComponent } from './request-abook.component';

describe('RequestAbookComponent', () => {
  let component: RequestAbookComponent;
  let fixture: ComponentFixture<RequestAbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
