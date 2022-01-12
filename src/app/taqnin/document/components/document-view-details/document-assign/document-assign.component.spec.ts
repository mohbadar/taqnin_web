import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAssignComponent } from './document-assign.component';

describe('DocumentAssignComponent', () => {
  let component: DocumentAssignComponent;
  let fixture: ComponentFixture<DocumentAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
