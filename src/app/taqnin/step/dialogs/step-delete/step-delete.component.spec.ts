import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDeleteComponent } from './step-delete.component';

describe('StepDeleteComponent', () => {
  let component: StepDeleteComponent;
  let fixture: ComponentFixture<StepDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
