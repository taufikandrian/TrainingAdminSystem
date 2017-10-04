import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodEligibleComponent } from './period-eligible.component';

describe('PeriodEligibleComponent', () => {
  let component: PeriodEligibleComponent;
  let fixture: ComponentFixture<PeriodEligibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodEligibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodEligibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
