import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUPComponent } from './follow-up.component';

describe('FollowUPComponent', () => {
  let component: FollowUPComponent;
  let fixture: ComponentFixture<FollowUPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
