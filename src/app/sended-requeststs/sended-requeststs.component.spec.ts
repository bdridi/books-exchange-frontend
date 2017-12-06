import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendedRequeststsComponent } from './sended-requeststs.component';

describe('SendedRequeststsComponent', () => {
  let component: SendedRequeststsComponent;
  let fixture: ComponentFixture<SendedRequeststsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendedRequeststsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendedRequeststsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
