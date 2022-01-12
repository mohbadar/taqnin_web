import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDeleteComponent } from './workflow-delete.component';

describe('WorkflowDeleteComponent', () => {
  let component: WorkflowDeleteComponent;
  let fixture: ComponentFixture<WorkflowDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
