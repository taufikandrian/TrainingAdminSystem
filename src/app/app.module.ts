import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { enableProdMode } from '@angular/core';
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
import { PeriodListComponent } from './components/period/period-list/period-list.component';

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
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
