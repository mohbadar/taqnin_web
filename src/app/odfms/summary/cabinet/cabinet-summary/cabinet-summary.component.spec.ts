import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetSummaryComponent } from './cabinet-summary.component';

describe('CabinetSummaryComponent', () => {
  let component: CabinetSummaryComponent;
  let fixture: ComponentFixture<CabinetSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinetSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
