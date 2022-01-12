import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentImportExportComponent } from './document-import-export.component';

describe('DocumentImportExportComponent', () => {
  let component: DocumentImportExportComponent;
  let fixture: ComponentFixture<DocumentImportExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentImportExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
