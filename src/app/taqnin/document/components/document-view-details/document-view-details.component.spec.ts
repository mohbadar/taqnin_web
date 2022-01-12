import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentViewDetailsComponent } from './document-view-details.component';

describe('DocumentViewDetailsComponent', () => {
  let component: DocumentViewDetailsComponent;
  let fixture: ComponentFixture<DocumentViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
