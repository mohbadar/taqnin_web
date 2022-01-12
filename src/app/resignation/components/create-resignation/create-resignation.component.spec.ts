import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResignationComponent } from './create-resignation.component';

describe('CreateResignationComponent', () => {
  let component: CreateResignationComponent;
  let fixture: ComponentFixture<CreateResignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
