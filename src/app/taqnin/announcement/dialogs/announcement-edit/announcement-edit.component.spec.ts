import { AnnouncementEditComponent } from './announcement-edit.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('AnnouncementEditComponent', () => {
  let component: AnnouncementEditComponent;
  let fixture: ComponentFixture<AnnouncementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
