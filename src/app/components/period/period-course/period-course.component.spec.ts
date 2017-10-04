import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCourseComponent } from './period-course.component';

describe('PeriodCourseComponent', () => {
  let component: PeriodCourseComponent;
  let fixture: ComponentFixture<PeriodCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
