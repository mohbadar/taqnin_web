import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilSummaryComponent } from './council-summary.component';

describe('CouncilSummaryComponent', () => {
  let component: CouncilSummaryComponent;
  let fixture: ComponentFixture<CouncilSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
