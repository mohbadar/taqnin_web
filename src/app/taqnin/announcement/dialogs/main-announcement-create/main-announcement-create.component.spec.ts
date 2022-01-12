import { MainAnnouncementCreateComponent } from './main-announcement-create.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('MainAnnouncementCreateComponent', () => {
  let component: MainAnnouncementCreateComponent;
  let fixture: ComponentFixture<MainAnnouncementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAnnouncementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAnnouncementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
