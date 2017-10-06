import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCourseParticipantComponent } from './period-course-participant.component';

describe('PeriodCourseParticipantComponent', () => {
  let component: PeriodCourseParticipantComponent;
  let fixture: ComponentFixture<PeriodCourseParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodCourseParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodCourseParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
