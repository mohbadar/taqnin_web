import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttachmentFileComponent } from './view-attachment-file.component';

describe('ViewAttachmentFileComponent', () => {
  let component: ViewAttachmentFileComponent;
  let fixture: ComponentFixture<ViewAttachmentFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAttachmentFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAttachmentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
