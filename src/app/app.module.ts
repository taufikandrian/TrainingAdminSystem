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

//SERVICES
import { AuthenticationService } from './services/authentication.service';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { TopmenuComponent } from './components/partials/topmenu/topmenu.component';
import { PeriodComponent } from './components/period/period.component';
import { UserComponent } from './components/user/user.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { TrainingComponent } from './components/training/training.component';

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
    TrainingComponent
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
