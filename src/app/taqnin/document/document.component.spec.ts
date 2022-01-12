import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaqninDocumentComponent } from './document.component';

describe('TaqninDocumentComponent', () => {
  let component: TaqninDocumentComponent;
  let fixture: ComponentFixture<TaqninDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaqninDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaqninDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
