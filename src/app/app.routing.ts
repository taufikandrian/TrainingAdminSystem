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
import { PeriodListComponent } from './components/period/period-list/period-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent, children: [] },
  { path: 'periods',  component: PeriodComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: PeriodListComponent },
  ] },
  { path: 'users',  component: UserComponent, children: [] },
  { path: 'enrollments',  component: EnrollmentComponent, children: [] },
  { path: 'achievements',  component: AchievementComponent, children: [] },
  { path: 'trainings',  component: TrainingComponent, children: [] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
