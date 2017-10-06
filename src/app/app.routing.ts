import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeriodComponent } from './components/period/period.component';
import { UserComponent } from './components/user/user.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { TrainingComponent } from './components/training/training.component';
import { RoleComponent } from './components/login/role/role.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { PeriodListComponent } from './components/period/period-list/period-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { PeriodCreateComponent } from './components/period/period-create/period-create.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PeriodDetailComponent } from './components/period/period-detail/period-detail.component';
import { PeriodUpdateComponent } from './components/period/period-detail/period-update/period-update.component';
import { PeriodEligibleComponent } from './components/period/period-detail/period-eligible/period-eligible.component';
import { PeriodEligibleNotinComponent } from './components/period/period-detail/period-eligible-notin/period-eligible-notin.component';
import { PeriodCourseComponent } from './components/period/period-course/period-course.component';
import { PeriodCoursesComponent } from './components/period/period-detail/period-courses/period-courses.component';
import { PeriodCoursesAddComponent } from './components/period/period-detail/period-courses/period-courses-add/period-courses-add.component';
import { PeriodCourseParticipantComponent } from './components/period/period-course/period-course-participant/period-course-participant.component';
import { PeriodCourseParticipantaddComponent } from './components/period/period-course/period-course-participantadd/period-course-participantadd.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'role', component: RoleComponent },
  { path: 'dashboard',  component: DashboardComponent, children: [] },
  { path: 'periods',  component: PeriodComponent, children: [
    { path: 'create', component: PeriodCreateComponent },
    { path: 'detail/:id', component: PeriodDetailComponent, children: [
      { path: 'eligible', component: PeriodEligibleComponent },
      { path: 'eligibleadd', component: PeriodEligibleNotinComponent },
      { path: 'courses', component: PeriodCoursesComponent},
      { path: 'courses/create', component: PeriodCoursesAddComponent },
    ] },
    { path: 'course/:id', component: PeriodCourseComponent, children: [
      { path: 'participant', component: PeriodCourseParticipantComponent },
      { path: 'participantadd', component: PeriodCourseParticipantaddComponent },
    ] },
  ] },
  { path: 'users',  component: UserComponent, children: [
    { path: 'create', component: UserCreateComponent },
    { path: 'detail/:id', component: UserDetailComponent },
    { path: 'edit/:id', component: UserEditComponent },
  ] },
  { path: 'enrollments',  component: EnrollmentComponent, children: [] },
  { path: 'achievements',  component: AchievementComponent, children: [] },
  { path: 'trainings',  component: TrainingComponent, children: [] },
  { path: 'trainings',  component: TrainingComponent, children: [] },
  {path: '**', component: NotfoundComponent, data : { displayMenu: false }},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
