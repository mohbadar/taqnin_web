import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDepartmentComponent } from './document-department.component';

describe('DocumentDepartmentComponent', () => {
  let component: DocumentDepartmentComponent;
  let fixture: ComponentFixture<DocumentDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
