import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { DataService } from './data.service';
import { RouterModule } from '@angular/router' // for routing
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CreateplanComponent } from './feature/createplan/createplan.component';
import { DeleteplanComponent } from './feature/deleteplan/deleteplan.component';
import { CoPlanningComponent } from './feature/co-planning/co-planning.component';
import { EditplanComponent } from './feature/editplan/editplan.component';
import { ReviewPostComponent } from './feature/review-post/review-post.component';
import { FavnotiComponent } from './feature/favnoti/favnoti.component';
import { RegisterComponent } from './feature/register/register.component';
import { LoginComponent } from './feature/login/login.component';
import { MenubarComponent } from './menubar/menubar.component';
import { ActivitiesComponent } from './feature/components/activities/activities.component';
import { GenerateplanComponent } from './feature/components/generateplan/generateplan.component';
import { HomeComponent } from './feature/home/home.component';
import { FindtripComponent } from './feature/findtrip/findtrip.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateplanComponent,
    DeleteplanComponent,
    CoPlanningComponent,
    EditplanComponent,
    ReviewPostComponent,
    FavnotiComponent,
    RegisterComponent,
    LoginComponent,
    MenubarComponent,
    ActivitiesComponent,
    GenerateplanComponent,
    HomeComponent,
    FindtripComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    //  routing to component
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'createplan',
        component: CreateplanComponent
      },
      {
        path: 'deleteplan',
        component: DeleteplanComponent
      },
      {
        path: 'co-planning',
        component: CoPlanningComponent
      },
      {

        path: 'editplan',
        component: EditplanComponent
      },
      {

        path: 'favnoti',
        component: FavnotiComponent
      },
      {

        path: 'review-post',
        component: ReviewPostComponent
      },
      {
        path: 'generateplan/:name/:depdate/:retdate',
        component: GenerateplanComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'findtrip',
        component: FindtripComponent
      },
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
