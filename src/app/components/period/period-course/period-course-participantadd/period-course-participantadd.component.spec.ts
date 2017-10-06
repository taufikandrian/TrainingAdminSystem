import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCourseParticipantaddComponent } from './period-course-participantadd.component';

describe('PeriodCourseParticipantaddComponent', () => {
  let component: PeriodCourseParticipantaddComponent;
  let fixture: ComponentFixture<PeriodCourseParticipantaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodCourseParticipantaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodCourseParticipantaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
