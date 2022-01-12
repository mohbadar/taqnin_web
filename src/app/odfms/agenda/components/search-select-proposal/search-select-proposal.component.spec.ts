import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSelectProposalComponent } from './search-select-proposal.component';

describe('SearchSelectProposalComponent', () => {
  let component: SearchSelectProposalComponent;
  let fixture: ComponentFixture<SearchSelectProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSelectProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSelectProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
