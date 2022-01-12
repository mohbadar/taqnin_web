import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionDeleteComponent } from './decision-delete.component';

describe('DecisionDeleteComponent', () => {
  let component: DecisionDeleteComponent;
  let fixture: ComponentFixture<DecisionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
