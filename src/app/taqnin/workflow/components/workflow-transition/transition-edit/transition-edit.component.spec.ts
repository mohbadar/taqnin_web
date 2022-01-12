import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionEditComponent } from './transition-edit.component';

describe('TransitionEditComponent', () => {
  let component: TransitionEditComponent;
  let fixture: ComponentFixture<TransitionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
