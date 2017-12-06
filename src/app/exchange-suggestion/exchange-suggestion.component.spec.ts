import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeSuggestionComponent } from './exchange-suggestion.component';

describe('ExchangeSuggestionComponent', () => {
  let component: ExchangeSuggestionComponent;
  let fixture: ComponentFixture<ExchangeSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
