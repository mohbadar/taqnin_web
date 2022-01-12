import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionDeleteComponent } from './transition-delete.component';

describe('TransitionDeleteComponent', () => {
  let component: TransitionDeleteComponent;
  let fixture: ComponentFixture<TransitionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
