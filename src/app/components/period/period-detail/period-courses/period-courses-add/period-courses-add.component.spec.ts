import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCoursesAddComponent } from './period-courses-add.component';

describe('PeriodCoursesAddComponent', () => {
  let component: PeriodCoursesAddComponent;
  let fixture: ComponentFixture<PeriodCoursesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodCoursesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodCoursesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
