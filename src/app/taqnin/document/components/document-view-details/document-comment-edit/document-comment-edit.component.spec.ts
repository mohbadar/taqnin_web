import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCommentEditComponent } from './document-comment-edit.component';

describe('DocumentCommentEditComponent', () => {
  let component: DocumentCommentEditComponent;
  let fixture: ComponentFixture<DocumentCommentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCommentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCommentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
