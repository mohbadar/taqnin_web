import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryProfileComponent } from './history-profile.component';

describe('HistoryProfileComponent', () => {
  let component: HistoryProfileComponent;
  let fixture: ComponentFixture<HistoryProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
