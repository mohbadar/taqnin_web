import { DocumentCompletedComponent } from './document-completed.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('DocumentCompletedComponent', () => {
  let component: DocumentCompletedComponent;
  let fixture: ComponentFixture<DocumentCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
