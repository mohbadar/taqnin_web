import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionCreateComponent } from './decision-create.component';

describe('DecisionCreateComponent', () => {
  let component: DecisionCreateComponent;
  let fixture: ComponentFixture<DecisionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
