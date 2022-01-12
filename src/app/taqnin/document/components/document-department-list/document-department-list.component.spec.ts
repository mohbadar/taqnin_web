import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDepartmentListComponent } from './document-department-list.component';

describe('DocumentDepartmentListComponent', () => {
  let component: DocumentDepartmentListComponent;
  let fixture: ComponentFixture<DocumentDepartmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDepartmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
