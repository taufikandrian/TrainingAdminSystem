import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCoursesComponent } from './period-courses.component';

describe('PeriodCoursesComponent', () => {
  let component: PeriodCoursesComponent;
  let fixture: ComponentFixture<PeriodCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
