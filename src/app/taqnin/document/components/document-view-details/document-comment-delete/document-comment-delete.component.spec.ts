import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCommentDeleteComponent } from './document-comment-delete.component';

describe('DocumentCommentDeleteComponent', () => {
  let component: DocumentCommentDeleteComponent;
  let fixture: ComponentFixture<DocumentCommentDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCommentDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCommentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
