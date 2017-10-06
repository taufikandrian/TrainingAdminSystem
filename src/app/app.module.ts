import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { DatePipe } from '@angular/common';
enableProdMode();

import { AppRoutingModule } from './app.routing';

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { TopmenuComponent } from './components/dashboard/topmenu/topmenu.component';
import { PeriodComponent } from './components/period/period.component';
import { UserComponent } from './components/user/user.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { TrainingComponent } from './components/training/training.component';
import { RoleComponent } from './components/login/role/role.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

//SERVICES
import { AuthenticationService } from './services/authentication.service';
import { SidebarService } from './services/sidebar.service';
import { UserService } from './services/user.service';
import { AssetService } from './services/asset.service';
import { AlertService } from './services/alert.service';
import { MessageService } from './services/message.service';
import { JsonService } from './services/json.service';
import { DatatableService } from './services/datatable.service';
import { MenuService } from './services/menu.service';
import { PeriodService } from './services/period.service';
import { PeriodListComponent } from './components/period/period-list/period-list.component';
import { PeriodCreateComponent } from './components/period/period-create/period-create.component';
import { AlertComponent } from './modals/alert/alert.component';
import { BreadcrumbComponent } from './components/dashboard/breadcrumb/breadcrumb.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { MessageComponent } from './messages/message/message.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';
import { PeriodDetailComponent } from './components/period/period-detail/period-detail.component';
import { PeriodUpdateComponent } from './components/period/period-detail/period-update/period-update.component';
import { PeriodEligibleComponent } from './components/period/period-detail/period-eligible/period-eligible.component';
import { PeriodEligibleNotinComponent } from './components/period/period-detail/period-eligible-notin/period-eligible-notin.component';
import { PeriodCourseComponent } from './components/period/period-course/period-course.component';
import { PeriodCoursesComponent } from './components/period/period-detail/period-courses/period-courses.component';
import { PeriodCoursesAddComponent } from './components/period/period-detail/period-courses/period-courses-add/period-courses-add.component';
import { PeriodCourseEditComponent } from './components/period/period-course/period-course-edit/period-course-edit.component';
import { PeriodCourseParticipantComponent } from './components/period/period-course/period-course-participant/period-course-participant.component';
import { PeriodCourseParticipantaddComponent } from './components/period/period-course/period-course-participantadd/period-course-participantadd.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    TopmenuComponent,
    PeriodComponent,
    UserComponent,
    EnrollmentComponent,
    AchievementComponent,
    TrainingComponent,
    RoleComponent,
    UserListComponent,
    PeriodListComponent,
    UserCreateComponent,
    UserEditComponent,
    PeriodCreateComponent,
    AlertComponent,
    BreadcrumbComponent,
    NotfoundComponent,
    UserDetailComponent,
    MessageComponent,
    FooterComponent,
    PeriodDetailComponent,
    PeriodUpdateComponent,
    PeriodEligibleComponent,
    PeriodEligibleNotinComponent,
    PeriodCourseComponent,
    PeriodCoursesComponent,
    PeriodCoursesAddComponent,
    PeriodCourseEditComponent,
    PeriodCourseParticipantComponent,
    PeriodCourseParticipantaddComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DatePipe,
    AuthenticationService,
    SidebarService,
    AssetService,
    JsonService,
    MenuService,
    UserService,
    DatatableService,
    AlertService,
    MessageService,
    PeriodService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
