import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCourseEditComponent } from './period-course-edit.component';

describe('PeriodCourseEditComponent', () => {
  let component: PeriodCourseEditComponent;
  let fixture: ComponentFixture<PeriodCourseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodCourseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodCourseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
