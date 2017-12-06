import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedRequeststsComponent } from './recieved-requeststs.component';

describe('RecievedRequeststsComponent', () => {
  let component: RecievedRequeststsComponent;
  let fixture: ComponentFixture<RecievedRequeststsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedRequeststsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedRequeststsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
