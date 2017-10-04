import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodEligibleNotinComponent } from './period-eligible-notin.component';

describe('PeriodEligibleNotinComponent', () => {
  let component: PeriodEligibleNotinComponent;
  let fixture: ComponentFixture<PeriodEligibleNotinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodEligibleNotinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodEligibleNotinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
