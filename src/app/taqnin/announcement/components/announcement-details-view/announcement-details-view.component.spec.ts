import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDetailsViewComponent } from './announcement-details-view.component';

describe('AnnouncementDetailsViewComponent', () => {
  let component: AnnouncementDetailsViewComponent;
  let fixture: ComponentFixture<AnnouncementDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
