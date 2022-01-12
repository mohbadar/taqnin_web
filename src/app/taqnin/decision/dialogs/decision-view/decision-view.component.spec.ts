import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionViewComponent } from './decision-view.component';

describe('DecisionViewComponent', () => {
  let component: DecisionViewComponent;
  let fixture: ComponentFixture<DecisionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
