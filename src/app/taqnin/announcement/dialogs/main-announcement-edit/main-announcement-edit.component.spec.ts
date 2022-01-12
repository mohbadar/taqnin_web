import { MainAnnouncementEditComponent } from './main-announcement-edit.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('MainAnnouncementEditComponent', () => {
  let component: MainAnnouncementEditComponent;
  let fixture: ComponentFixture<MainAnnouncementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAnnouncementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAnnouncementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
